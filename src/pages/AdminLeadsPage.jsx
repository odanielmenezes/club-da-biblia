import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

const Wrap = styled.main`
  width: min(1120px, calc(100% - 2rem));
  margin: 2rem auto;
  padding: 1.2rem;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
`

const Heading = styled.h1`
  font-size: clamp(1.4rem, 3vw, 2.1rem);
`

const Sub = styled.p`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const ErrorText = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.danger};
`

const Actions = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
`

const Btn = styled.button`
  border: none;
  border-radius: 999px;
  padding: 0.65rem 1.1rem;
  font-weight: 700;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.backgroundPrimary};
`

const TableWrap = styled.div`
  margin-top: 1rem;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  min-width: 760px;

  th,
  td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: 0.72rem;
    text-align: left;
    vertical-align: top;
    font-size: 0.93rem;
  }

  th {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`

function parseFilenameFromDisposition(disposition) {
  const match = /filename="?([^";]+)"?/i.exec(disposition || '')
  return match?.[1] || 'leads.csv'
}

function AdminLeadsPage() {
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim()
  const accessEndpoint = `${apiBaseUrl}/api/admin/access`
  const leadsEndpoint = `${apiBaseUrl}/api/admin/leads`
  const exportEndpoint = `${apiBaseUrl}/api/admin/export`

  const initialKey = useMemo(() => new URLSearchParams(globalThis.location.search).get('key') || '', [])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState('')
  const [rows, setRows] = useState([])
  const [sessionToken, setSessionToken] = useState('')

  useEffect(() => {
    const bootstrap = async () => {
      if (!initialKey) {
        setError('Chave ausente na URL. Use /admin?key=SUA_CHAVE no mesmo endereco atual.')
        setLoading(false)
        return
      }

      try {
        const access = await fetch(accessEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ key: initialKey }),
        })

        if (!access.ok) {
          throw new Error('Chave invalida ou expirada.')
        }

        const accessData = await access.json()
        const nextToken =
          String(accessData?.sessionToken || '').trim() ||
          String(access.headers.get('x-admin-session-token') || '').trim()

        if (!nextToken) {
          throw new Error('Falha ao iniciar sessao de admin.')
        }

        setSessionToken(nextToken)

        // Remove a chave da barra de endereco apos autenticar
        globalThis.history.replaceState({}, '', globalThis.location.pathname)

        const leadsRes = await fetch(leadsEndpoint, {
          credentials: 'include',
          headers: { Authorization: `Bearer ${nextToken}` },
        })
        if (!leadsRes.ok) {
          throw new Error('Nao foi possivel carregar os cadastros.')
        }

        const data = await leadsRes.json()
        setRows(Array.isArray(data.leads) ? data.leads : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha de acesso.')
      } finally {
        setLoading(false)
      }
    }

    bootstrap()
  }, [accessEndpoint, initialKey, leadsEndpoint])

  const handleDownload = async () => {
    setDownloading(true)
    setError('')

    try {
      if (!sessionToken) {
        throw new Error('Sessao ausente. Reabra /admin?key=...')
      }

      const response = await fetch(exportEndpoint, {
        credentials: 'include',
        headers: { Authorization: `Bearer ${sessionToken}` },
      })
      if (!response.ok) {
        throw new Error('Sessao invalida para download. Reabra /admin?key=...')
      }

      const blob = await response.blob()
      const filename = parseFilenameFromDisposition(response.headers.get('content-disposition'))
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao baixar CSV.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <Wrap>
      <Heading>Painel de Cadastros</Heading>
      <Sub>Use esta tela para visualizar os usuarios cadastrados e exportar a planilha CSV.</Sub>

      {loading && <Sub>Validando acesso...</Sub>}
      {error && <ErrorText>{error}</ErrorText>}

      {!loading && !error && (
        <>
          <Actions>
            <Btn type="button" onClick={handleDownload} disabled={downloading}>
              {downloading ? 'Baixando...' : 'Baixar CSV'}
            </Btn>
          </Actions>

          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>WhatsApp</th>
                  <th>Email</th>
                  <th>Origem</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.whatsapp}</td>
                    <td>{row.email}</td>
                    <td>{row.source}</td>
                    <td>{row.createdAt}</td>
                  </tr>
                ))}
                {!rows.length && (
                  <tr>
                    <td colSpan={6}>Nenhum cadastro ainda.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </TableWrap>
        </>
      )}
    </Wrap>
  )
}

export default AdminLeadsPage
