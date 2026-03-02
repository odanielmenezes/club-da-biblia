import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button/component'

const Container = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
`

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}15 0%, ${({ theme }) =>
    theme.colors.primary}08 100%);
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};

  h3 {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    font-weight: 600;
  }

  p {
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th {
    background: ${({ theme }) => theme.colors.backgroundLight};
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blueDeep};
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
    font-size: 0.9rem;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 0.95rem;
  }

  tr:hover {
    background: ${({ theme }) => theme.colors.backgroundLight};
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${({ theme }) => theme.colors.textMuted};

  p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: flex-end;
`

const LoadingWrap = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

function AdminLeads({ token }) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/leads`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!response.ok) throw new Error('Falha ao carregar leads')

        const { leads: data } = await response.json()
        setLeads(data || [])
      } catch (error) {
        console.error('Erro:', error)
        alert('Erro ao carregar leads')
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [token])

  const handleDownloadCSV = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/export`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) throw new Error('Falha ao exportar')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao exportar CSV')
    }
  }

  if (loading) {
    return <LoadingWrap>Carregando leads...</LoadingWrap>
  }

  return (
    <Container>
      <Stats>
        <StatCard>
          <h3>Total de Leads</h3>
          <p>{leads.length}</p>
        </StatCard>
      </Stats>

      {leads.length === 0 ? (
        <EmptyState>
          <p>Nenhum lead cadastrado ainda</p>
        </EmptyState>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>WhatsApp</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.whatsapp}</td>
                  <td>{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <ButtonGroup>
            <Button variant="secondary" onClick={handleDownloadCSV}>
              📥 Exportar CSV
            </Button>
          </ButtonGroup>
        </>
      )}
    </Container>
  )
}

export default AdminLeads
