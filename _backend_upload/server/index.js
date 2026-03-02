import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT || 8787)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataDir = (process.env.LEADS_DATA_DIR || '').trim() || path.join(__dirname, 'data')
const leadsFile = path.join(dataDir, 'leads.json')
const authFile = path.join(dataDir, 'auth.json')
const collectionsFile = path.join(dataDir, 'collections.json')
const exportKeyTtlMinutes = Number(process.env.EXPORT_KEY_TTL_MINUTES || 30)
const exportRotateOnDownload = (process.env.EXPORT_ROTATE_ON_DOWNLOAD || 'false').toLowerCase() === 'true'
const csvDelimiter = (process.env.EXPORT_CSV_DELIMITER || ';').trim() || ';'
const csvIncludeSepHint = (process.env.EXPORT_CSV_INCLUDE_SEP_HINT || 'true').toLowerCase() === 'true'
const sessionCookieName = 'club_admin_session'
const sessionTtlMs = Number(process.env.ADMIN_SESSION_TTL_MINUTES || 60) * 60 * 1000
const sessionSecret =
  (process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_MASTER_KEY || 'club-da-biblia-admin').trim()

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
)
app.use(express.json({ limit: '10mb' }))

function hashKey(value) {
  return createHash('sha256').update(value).digest('hex')
}

function makeExportKey() {
  return randomBytes(24).toString('hex')
}

function makeSessionToken() {
  const payload = {
    iat: Date.now(),
    exp: Date.now() + sessionTtlMs,
    nonce: randomBytes(12).toString('hex'),
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url')
  const signature = createHmac('sha256', sessionSecret).update(encodedPayload).digest('base64url')
  return `${encodedPayload}.${signature}`
}

async function ensureDataFiles() {
  await fs.mkdir(dataDir, { recursive: true })

  try {
    await fs.access(leadsFile)
  } catch {
    await fs.writeFile(leadsFile, '[]', 'utf8')
  }

  try {
    await fs.access(authFile)
  } catch {
    await fs.writeFile(authFile, JSON.stringify({ exportKeyHash: '', expiresAt: 0 }, null, 2), 'utf8')
  }

  try {
    await fs.access(collectionsFile)
  } catch {
    const defaultCollections = [
      {
        id: 1,
        title: 'Coleção Fé Viva',
        description: 'Design que abre portas para falar de Cristo em cada conversa.',
        bg: 'linear-gradient(rgba(255,250,243,0.72), rgba(255,236,212,0.78)), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjkwIiBmaWxsPSIjRkY1NTAwIi8+PC9zdmc+) center/cover no-repeat',
      },
      {
        id: 2,
        title: 'Coleção Constância',
        description: 'Uma lembrança diária de permanecer firme na Palavra.',
        bg: 'linear-gradient(rgba(255,250,243,0.72), rgba(255,236,212,0.78)), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzhCNEUyNyIvPjwvc3ZnPg==) center/cover no-repeat',
      },
      {
        id: 3,
        title: 'Coleção Luz ao Mundo',
        description: 'Peças que inspiram testemunho e comunhão no dia a dia.',
        bg: 'linear-gradient(rgba(255,250,243,0.72), rgba(255,236,212,0.78)), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjgwIiBmaWxsPSIjRjk5NzAwIi8+PHJlY3QgeD0iODAiIHk9IjgwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkYiLz48L3N2Zz4=) center/cover no-repeat',
      },
    ]
    await fs.writeFile(collectionsFile, JSON.stringify(defaultCollections, null, 2), 'utf8')
  }
}

async function readJson(filePath, fallback) {
  try {
    const content = await fs.readFile(filePath, 'utf8')
    return JSON.parse(content)
  } catch {
    return fallback
  }
}

async function writeJson(filePath, value) {
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), 'utf8')
}

async function rotateExportKey() {
  const nextKey = makeExportKey()
  const authState = {
    exportKeyHash: hashKey(nextKey),
    expiresAt: Date.now() + exportKeyTtlMinutes * 60 * 1000,
  }

  await writeJson(authFile, authState)

  const notifyUrl = (process.env.EXPORT_KEY_NOTIFY_WEBHOOK_URL || '').trim()
  if (notifyUrl) {
    try {
      await fetch(notifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: nextKey,
          expiresAt: authState.expiresAt,
          hint: 'Nova chave de exportacao gerada',
        }),
      })
    } catch (error) {
      console.error('Falha ao notificar nova chave:', error)
    }
  }

  return { key: nextKey, expiresAt: authState.expiresAt }
}

function parseCookies(cookieHeader = '') {
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const idx = part.indexOf('=')
        if (idx < 0) return [part, '']
        return [part.slice(0, idx), decodeURIComponent(part.slice(idx + 1))]
      }),
  )
}

function parseSessionToken(token) {
  const [encodedPayload, signature] = String(token || '').split('.')
  if (!encodedPayload || !signature) {
    return null
  }

  const expectedSignature = createHmac('sha256', sessionSecret).update(encodedPayload).digest('base64url')
  const left = Buffer.from(signature)
  const right = Buffer.from(expectedSignature)
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'))
    if (!payload || Number(payload.exp || 0) <= Date.now()) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

function requireAdminSession(req, res, next) {
  const authHeader = String(req.header('authorization') || '').trim()
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : ''
  const cookies = parseCookies(req.headers.cookie || '')
  const token = bearerToken || cookies[sessionCookieName]
  if (!token) {
    return res.status(401).json({ ok: false, message: 'Nao autorizado.' })
  }

  const session = parseSessionToken(token)
  if (!session) {
    return res.status(401).json({ ok: false, message: 'Sessao expirada.' })
  }

  req.adminSession = session
  return next()
}

function csvEscape(value) {
  const safe = String(value ?? '')
  if (/[",\n\r]/.test(safe)) {
    return `"${safe.replaceAll('"', '""')}"`
  }

  return safe
}

function formatDateForCsv(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return String(value ?? '')
  }

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear())
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} ${hour}:${minute}`
}

function toCsv(rows) {
  const header = ['id', 'name', 'whatsapp', 'email', 'source', 'createdAt']
  const lines = []

  if (csvIncludeSepHint) {
    lines.push(`sep=${csvDelimiter}`)
  }

  lines.push(header.join(csvDelimiter))

  for (const row of rows) {
    lines.push(
      [
        row.id,
        row.name,
        row.whatsapp,
        row.email,
        row.source,
        formatDateForCsv(row.createdAt),
      ]
        .map(csvEscape)
        .join(csvDelimiter),
    )
  }

  return lines.join('\n')
}

app.get('/api/health', (_, res) => {
  res.json({ ok: true, service: 'club-da-biblia-api' })
})

app.post('/api/leads', async (req, res) => {
  const body = req.body || {}
  const name = String(body.name || '').trim()
  const whatsapp = String(body.whatsapp || '').trim()
  const email = String(body.email || '').trim()
  const source = String(body.source || 'landing-page').trim()
  const createdAt = String(body.createdAt || new Date().toISOString()).trim()

  if (name.length < 3) {
    return res.status(400).json({ ok: false, message: 'Nome invalido.' })
  }

  if (!/^\d{10,13}$/.test(whatsapp.replaceAll(/\D/g, ''))) {
    return res.status(400).json({ ok: false, message: 'WhatsApp invalido.' })
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ ok: false, message: 'Email invalido.' })
  }

  const leads = await readJson(leadsFile, [])
  leads.push({
    id: randomBytes(8).toString('hex'),
    name,
    whatsapp,
    email,
    source,
    createdAt,
  })

  await writeJson(leadsFile, leads)
  return res.status(201).json({ ok: true })
})

app.post('/api/admin/rotate-key', async (req, res) => {
  const adminKey = req.header('x-admin-key')
  const expected = (process.env.ADMIN_MASTER_KEY || '').trim()

  if (!expected) {
    return res.status(500).json({ ok: false, message: 'ADMIN_MASTER_KEY nao configurada.' })
  }

  if (!adminKey || adminKey !== expected) {
    return res.status(401).json({ ok: false, message: 'Nao autorizado.' })
  }

  const payload = await rotateExportKey()
  return res.json({ ok: true, key: payload.key, expiresAt: payload.expiresAt })
})

app.post('/api/admin/access', async (req, res) => {
  const key = String(req.body?.key || '').trim()
  const authState = await readJson(authFile, { exportKeyHash: '', expiresAt: 0 })

  if (!key || !authState.exportKeyHash || hashKey(key) !== authState.exportKeyHash) {
    return res.status(401).json({ ok: false, message: 'Chave invalida.' })
  }

  if (Date.now() > Number(authState.expiresAt || 0)) {
    return res.status(401).json({ ok: false, message: 'Chave expirada.' })
  }

  const token = makeSessionToken()
  const session = parseSessionToken(token)
  const expiresAt = Number(session?.exp || Date.now() + sessionTtlMs)

  res.setHeader(
    'Set-Cookie',
    `${sessionCookieName}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(
      sessionTtlMs / 1000,
    )}`,
  )
  res.setHeader('x-admin-session-token', token)

  return res.json({ ok: true, expiresAt, sessionToken: token })
})

app.get('/api/admin/leads', requireAdminSession, async (_, res) => {
  const leads = await readJson(leadsFile, [])
  const normalized = leads
    .map((lead) => ({
      id: lead.id,
      name: lead.name,
      whatsapp: lead.whatsapp,
      email: lead.email,
      source: lead.source,
      createdAt: formatDateForCsv(lead.createdAt),
    }))
    .reverse()

  return res.json({ ok: true, total: normalized.length, leads: normalized })
})

app.get('/api/admin/export', requireAdminSession, async (_, res) => {
  const leads = await readJson(leadsFile, [])
  const csv = toCsv(leads)

  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`)
  return res.status(200).send(csv)
})

app.get('/api/export', async (req, res) => {
  const key = String(req.query.key || '').trim()
  const authState = await readJson(authFile, { exportKeyHash: '', expiresAt: 0 })

  if (!key || !authState.exportKeyHash || hashKey(key) !== authState.exportKeyHash) {
    return res.status(401).json({ ok: false, message: 'Chave invalida.' })
  }

  if (Date.now() > Number(authState.expiresAt || 0)) {
    return res.status(401).json({ ok: false, message: 'Chave expirada.' })
  }

  const leads = await readJson(leadsFile, [])
  const csv = toCsv(leads)

  let nextKey = null
  if (exportRotateOnDownload) {
    nextKey = await rotateExportKey()
  }

  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`)
  if (nextKey) {
    res.setHeader('x-next-export-key', nextKey.key)
  }
  return res.status(200).send(csv)
})

app.get('/api/collections', async (_, res) => {
  try {
    const collections = await readJson(collectionsFile, [])
    return res.status(200).json({ ok: true, collections })
  } catch (error) {
    console.error('Erro ao listar coleções públicas:', error)
    return res.status(500).json({ ok: false, message: 'Falha ao listar coleções.' })
  }
})

app.get('/api/admin/collections', requireAdminSession, async (_, res) => {
  try {
    const data = await fs.readFile(collectionsFile, 'utf8')
    const collections = JSON.parse(data || '[]')
    return res.status(200).json({ collections })
  } catch (error) {
    console.error('Erro ao listar coleções:', error)
    return res.status(500).json({ error: 'Falha ao listar coleções' })
  }
})

app.put('/api/admin/collections/:id', requireAdminSession, async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, bg } = req.body

    const data = await fs.readFile(collectionsFile, 'utf8')
    const collections = JSON.parse(data || '[]')
    const index = collections.findIndex((c) => String(c.id) === String(id))

    if (index < 0) {
      return res.status(404).json({ error: 'Coleção não encontrada' })
    }

    if (title !== undefined) collections[index].title = title
    if (description !== undefined) collections[index].description = description
    if (bg !== undefined) collections[index].bg = bg

    await fs.writeFile(collectionsFile, JSON.stringify(collections, null, 2), 'utf8')
    return res.status(200).json({ collection: collections[index] })
  } catch (error) {
    console.error('Erro ao atualizar coleção:', error)
    return res.status(500).json({ error: 'Falha ao atualizar coleção' })
  }
})

try {
  await ensureDataFiles()

  if ((process.env.BOOTSTRAP_EXPORT_KEY || 'false').toLowerCase() === 'true') {
    const generated = await rotateExportKey()
    console.log('Chave inicial de exportacao gerada:', generated.key)
  }

  app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`)
  })
} catch (error) {
  console.error('Falha ao iniciar API:', error)
  process.exit(1)
}
