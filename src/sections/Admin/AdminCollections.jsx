import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import EditCollectionModal from './EditCollectionModal'
import {
  extractCollectionImageUrl,
  normalizeCollectionBackground,
} from '../../utils/collectionBackground'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const Card = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`

const CardPreview = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f5f1e8;
  background-image: ${({ $image }) => ($image ? `url(${$image})` : 'none')};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const CardContent = styled.div`
  padding: 1.5rem;
`

const CardTitle = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.blueDeep};
  margin-bottom: 0.5rem;
`

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
  margin-bottom: 1rem;
`

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const EditButton = styled.button`
  flex: 1;
  padding: 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`

const LoadingWrap = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

function AdminCollections({ token }) {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editingData, setEditingData] = useState(null)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/collections`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!response.ok) throw new Error('Falha ao carregar coleções')

        const { collections: data } = await response.json()
        setCollections(data)
      } catch (error) {
        console.error('Erro:', error)
        alert('Erro ao carregar coleções')
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [token])

  const handleEdit = (collection) => {
    setEditingId(collection.id)
    setEditingData(collection)
  }

  const handleSave = async (updatedData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/collections/${editingId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        },
      )

      if (!response.ok) throw new Error('Falha ao salvar')

      setCollections(
        collections.map((c) =>
          c.id === editingId
            ? {
                ...c,
                ...updatedData,
                bg: normalizeCollectionBackground(updatedData.bg, c.bg),
              }
            : c,
        ),
      )
      setEditingId(null)
      setEditingData(null)
      alert('Coleção atualizada com sucesso!')
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao salvar coleção')
    }
  }

  if (loading) {
    return <LoadingWrap>Carregando coleções...</LoadingWrap>
  }

  return (
    <>
      <Grid>
        {collections.map((collection, idx) => (
          <Card
            key={collection.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <CardPreview
              $image={extractCollectionImageUrl(normalizeCollectionBackground(collection.bg))}
            />
            <CardContent>
              <CardTitle>{collection.title}</CardTitle>
              <CardDescription>{collection.description}</CardDescription>
              <CardActions>
                <EditButton onClick={() => handleEdit(collection)}>Editar</EditButton>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </Grid>

      {editingId && editingData && (
        <EditCollectionModal
          collection={editingData}
          onSave={handleSave}
          onClose={() => {
            setEditingId(null)
            setEditingData(null)
          }}
        />
      )}
    </>
  )
}

export default AdminCollections
