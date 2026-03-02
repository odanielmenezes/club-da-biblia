import { motion } from 'framer-motion'
import tshirt1 from '../../assets/tshirt-1.svg'
import tshirt2 from '../../assets/tshirt-2.svg'
import tshirt3 from '../../assets/tshirt-3.svg'
import Button from '../../components/Button/component'
import Carousel from '../../components/Carousel/component'
import Container from '../../components/Container/component'
import SectionWrapper from '../../components/SectionWrapper/component'
import { Actions, Grid, Text, Title } from './style'

const shirts = [
  {
    id: 1,
    title: 'Coleção Fé Viva',
    description: 'Design que abre portas para falar de Cristo em cada conversa.',
    bg: `linear-gradient(rgba(255,250,243,0.72), rgba(255,236,212,0.78)), url(${tshirt1}) center/cover no-repeat`,
  },
  {
    id: 2,
    title: 'Coleção Constância',
    description: 'Uma lembrança diária de permanecer firme na Palavra.',
    bg: `linear-gradient(rgba(255,250,243,0.72), rgba(255,236,212,0.78)), url(${tshirt2}) center/cover no-repeat`,
  },
  {
    id: 3,
    title: 'Coleção Luz ao Mundo',
    description: 'Peças que inspiram testemunho e comunhão no dia a dia.',
    bg: `linear-gradient(rgba(255,250,243,0.72), rgba(255,236,212,0.78)), url(${tshirt3}) center/cover no-repeat`,
  },
]

function MerchSection() {
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
            <Actions>
              <Button variant="secondary">Falar no WhatsApp</Button>
            </Actions>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <Carousel items={shirts} />
          </motion.div>
        </Grid>
      </Container>
    </SectionWrapper>
  )
}

export default MerchSection
