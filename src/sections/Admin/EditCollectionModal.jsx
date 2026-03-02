import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  buildCollectionBackground,
  extractCollectionImageUrl,
  normalizeCollectionBackground,
} from '../../utils/collectionBackground'

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`

const Modal = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.blueDeep};
  font-size: 1.5rem;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blueDeep};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(247, 148, 29, 0.1);
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(247, 148, 29, 0.1);
  }
`

const PreviewBox = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 8px;
  text-align: center;
`

const PreviewTitle = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-weight: 600;
`

const PreviewImage = styled.div`
  width: 100%;
  height: 150px;
  background-color: #f5f1e8;
  background-image: ${({ $image }) => ($image ? `url(${$image})` : 'none')};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;

  &.primary {
    background: ${({ theme }) => theme.colors.primary};
    color: white;

    &:hover {
      filter: brightness(1.05);
    }
  }

  &.secondary {
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      background: ${({ theme }) => theme.colors.backgroundLight};
    }
  }
`

function EditCollectionModal({ collection, onSave, onClose }) {
  const MAX_IMAGE_SIZE_BYTES = 4 * 1024 * 1024
  const [title, setTitle] = useState(collection.title)
  const [description, setDescription] = useState(collection.description)
  const [imageUrl, setImageUrl] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      let newBg = collection.bg

      if (imageUrl) {
        newBg = buildCollectionBackground(imageUrl)
      }

      await onSave({
        title: title || collection.title,
        description: description || collection.description,
        bg: newBg,
      })
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        alert('A imagem deve ter no maximo 4MB para salvar corretamente.')
        e.target.value = ''
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        setImageUrl(event.target?.result || '')
      }
      reader.readAsDataURL(file)
    }
  }

  const currentImage = imageUrl
    ? imageUrl
    : extractCollectionImageUrl(normalizeCollectionBackground(collection.bg))

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Modal
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Title>Editar Coleção</Title>

          <PreviewBox>
            <PreviewTitle>Prévia</PreviewTitle>
            <PreviewImage $image={currentImage} />
          </PreviewBox>

          <FormGroup>
            <Label>Título</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome da coleção"
            />
          </FormGroup>

          <FormGroup>
            <Label>Descrição</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição breve da coleção"
            />
          </FormGroup>

          <FormGroup>
            <Label>Imagem da Camiseta</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <p style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.5rem' }}>
              Envie uma imagem SVG ou PNG
            </p>
          </FormGroup>

          <Actions>
            <Button className="secondary" onClick={onClose} disabled={saving}>
              Cancelar
            </Button>
            <Button className="primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
          </Actions>
        </Modal>
      </Overlay>
    </AnimatePresence>
  )
}

export default EditCollectionModal
