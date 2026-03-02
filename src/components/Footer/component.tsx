import { motion } from 'framer-motion'
import Container from '../Container/component'
import { BottomBar, FooterGrid, FooterWrap, Link, List, Text, Title } from './style'

function Footer() {
  return (
    <FooterWrap>
      <Container>
        <FooterGrid>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45 }}
          >
            <Title>Club da Bíblia</Title>
            <Text>
              Uma comunidade viva de leitura bíblica diária para quem deseja caminhar com constância,
              fé e transformação no ordinário de cada manhã.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <Title>Navegação</Title>
            <List>
              <li>
                <Link href="#inicio">Início</Link>
              </li>
              <li>
                <Link href="#comunidade">Comunidade</Link>
              </li>
              <li>
                <Link href="#camisetas">Camisetas</Link>
              </li>
            </List>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            <Title>Agenda</Title>
            <List>
              <li>
                <Text>Live diária entre as 07:10 e 07:20</Text>
              </li>
              <li>
                <Text>1.500 irmãos lendo juntos</Text>
              </li>
              <li>
                <Link href="#comunidade">Entrar na comunidade</Link>
              </li>
            </List>
          </motion.div>
        </FooterGrid>

        <BottomBar
          as={motion.div}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          © {new Date().getFullYear()} Club da Bíblia • Todos os direitos reservados
        </BottomBar>
      </Container>
    </FooterWrap>
  )
}

export default Footer
