import { promises as fs } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const outDir = path.join(rootDir, '_backend_upload')
const serverDir = path.join(rootDir, 'server')
const rootPkgPath = path.join(rootDir, 'package.json')
const envPath = path.join(rootDir, '.env')

async function pathExists(target) {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}

function pickBackendEnv(content) {
  const keys = [
    'PORT',
    'LEADS_DATA_DIR',
    'ADMIN_MASTER_KEY',
    'ADMIN_SESSION_SECRET',
    'ADMIN_SESSION_TTL_MINUTES',
    'EXPORT_KEY_TTL_MINUTES',
    'BOOTSTRAP_EXPORT_KEY',
    'EXPORT_ROTATE_ON_DOWNLOAD',
    'EXPORT_CSV_DELIMITER',
    'EXPORT_CSV_INCLUDE_SEP_HINT',
    'EXPORT_KEY_NOTIFY_WEBHOOK_URL',
  ]

  const lines = content.split(/\r?\n/)
  const selected = []

  for (const key of keys) {
    const line = lines.find((item) => item.startsWith(`${key}=`))
    if (line) {
      if (key === 'ADMIN_MASTER_KEY') {
        selected.push('ADMIN_MASTER_KEY=troque-por-uma-chave-forte')
      } else {
        selected.push(line)
      }
    }
  }

  return selected.join('\n') + '\n'
}

async function main() {
  const pkgRaw = await fs.readFile(rootPkgPath, 'utf8')
  const pkg = JSON.parse(pkgRaw)

  const outPkg = {
    name: `${pkg.name}-backend`,
    private: true,
    version: pkg.version,
    type: 'module',
    scripts: {
      start: 'node server/hostinger-start.cjs',
    },
    dependencies: {
      cors: pkg.dependencies?.cors || '^2.8.5',
      dotenv: pkg.dependencies?.dotenv || '^17.0.0',
      express: pkg.dependencies?.express || '^5.0.0',
    },
  }

  await fs.rm(outDir, { recursive: true, force: true })
  await fs.mkdir(outDir, { recursive: true })
  await fs.cp(serverDir, path.join(outDir, 'server'), { recursive: true })
  await fs.writeFile(path.join(outDir, 'package.json'), JSON.stringify(outPkg, null, 2) + '\n', 'utf8')

  const envExists = await pathExists(envPath)
  if (envExists) {
    const envRaw = await fs.readFile(envPath, 'utf8')
    await fs.writeFile(path.join(outDir, '.env.example'), pickBackendEnv(envRaw), 'utf8')
  }

  const deployReadme = [
    '# Backend Upload (Hostinger)',
    '',
    '1. Envie esta pasta para o servidor.',
    '2. Configure o startup file: `server/hostinger-start.cjs`.',
    '3. Configure as variaveis de ambiente usando `.env.example` como referencia.',
    '4. Rode `npm install` no ambiente da Hostinger.',
    '',
    'A API inicia na porta definida em `PORT`.',
  ].join('\n')

  await fs.writeFile(path.join(outDir, 'README_BACKEND_UPLOAD.md'), `${deployReadme}\n`, 'utf8')

  console.log('Pasta de upload pronta em: _backend_upload')
}

try {
  await main()
} catch (error) {
  console.error('Falha ao preparar backend para Hostinger:', error)
  process.exit(1)
}
