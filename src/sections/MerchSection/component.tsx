import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Button from '../../components/Button/component'
import Carousel from '../../components/Carousel/component'
import Container from '../../components/Container/component'
import SectionWrapper from '../../components/SectionWrapper/component'
import { normalizeCollectionBackground } from '../../utils/collectionBackground'
import { Grid, LoadingCard, LoadingSpinner, Text, Title } from './style'

const neutralImageBg = 'linear-gradient(135deg, #f5f1e8 0%, #fef9f3 100%)'

function MerchSection() {
  const [shirts, setShirts] = useState([])
  const [loadingCollections, setLoadingCollections] = useState(true)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/collections`)
        if (!response.ok) return

        const data = await response.json()
        if (!Array.isArray(data?.collections) || data.collections.length === 0) return

        const normalizedCollections = data.collections.map((
          collection: { bg?: string } & Record<string, unknown>,
        ) => ({
          ...collection,
          bg: normalizeCollectionBackground(collection.bg, neutralImageBg),
        }))

        setShirts(normalizedCollections)
      } catch (error) {
        console.error('Erro ao carregar coleções públicas:', error)
      } finally {
        setLoadingCollections(false)
      }
    }

    fetchCollections()
  }, [])

  const handleWhatsAppClick = () => {
    const message = 'Olá! Quero saber mais sobre as camisetas do Club da Bíblia!'
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <SectionWrapper id="camisetas">
      <Container>
        <Grid>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <Title>Vista-se de Propósito, Semeie Esperança</Title>
            <Text>
              Nossas camisetas são ferramentas de conversa. Cada peça vendida ajuda a financiar
              nossas missões e a manter o Club da Bíblia ativo, alcançando mais vidas todos os dias.
            </Text>
            <Button
              variant="secondary"
              onClick={handleWhatsAppClick}
              style={{ marginTop: '1.5rem' }}
            >
              Falar no WhatsApp
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {loadingCollections ? (
              <LoadingCard>
                <LoadingSpinner aria-hidden="true" />
              </LoadingCard>
            ) : (
              <Carousel items={shirts} />
            )}
          </motion.div>
        </Grid>
      </Container>
    </SectionWrapper>
  )
}

export default MerchSection
