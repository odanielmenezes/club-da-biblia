import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import AdminCollections from '../sections/Admin/AdminCollections'
import AdminLeads from '../sections/Admin/AdminLeads'

const PageWrap = styled.div`
  min-height: 100vh;
    background: linear-gradient(135deg, #f5f1e8 0%, #fef9f3 100%);
  padding: 2rem 1rem;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.blueDeep};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textMuted)};
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  cursor: pointer;
  font-size: 1rem;
  border-bottom: 3px solid ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.blueDeep};
  }
`

const TabContent = styled(motion.div)`
  min-height: 400px;
`

function AdminPage() {
  const [sessionToken, setSessionToken] = useState(null)
  const [activeTab, setActiveTab] = useState('collections')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = async () => {
      const params = new URLSearchParams(window.location.search)
      const key = params.get('key')
      if (!key) {
        alert('Chave de acesso não foiinformada. Acesso negado.')
        window.location.href = '/'
        return
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/access`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key }),
        })

        if (!response.ok) {
          throw new Error('Falha na autenticação')
        }

        const { sessionToken: token } = await response.json()
        sessionStorage.setItem('adminToken', token)
        setSessionToken(token)
      } catch (error) {
        console.error('Erro:', error)
        alert('Acesso negado. Chave inválida.')
        window.location.href = '/'
      } finally {
        setLoading(false)
      }
    }

    auth()
  }, [])

  if (loading) {
    return (
      <PageWrap>
        <Container>
          <Header>
            <h1>Carregando...</h1>
          </Header>
        </Container>
      </PageWrap>
    )
  }

  if (!sessionToken) {
    return (
      <PageWrap>
        <Container>
          <Header>
            <h1>Acesso Negado</h1>
          </Header>
        </Container>
      </PageWrap>
    )
  }

  return (
    <PageWrap>
      <Container>
        <Header>
          <h1>Painel de Administração</h1>
          <p>Gerenciar coleções de camisetas e irmãos cadastrados</p>
        </Header>

        <Tabs>
          <TabButton
            $active={activeTab === 'collections'}
            onClick={() => setActiveTab('collections')}
          >
            Coleções
          </TabButton>
          <TabButton
            $active={activeTab === 'leads'}
            onClick={() => setActiveTab('leads')}
          >
            Irmãos Cadastrados
          </TabButton>
        </Tabs>

        <TabContent
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'collections' && <AdminCollections token={sessionToken} />}
          {activeTab === 'leads' && <AdminLeads token={sessionToken} />}
        </TabContent>
      </Container>
    </PageWrap>
  )
}

export default AdminPage
