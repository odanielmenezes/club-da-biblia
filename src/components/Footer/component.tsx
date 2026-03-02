import { motion } from 'framer-motion'
import Container from '../Container/component'
import {
  BottomBar,
  FooterGrid,
  FooterWrap,
  Link,
  List,
  SocialIcon,
  SocialLink,
  SocialList,
  Text,
  Title,
} from './style'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="currentColor" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 4V13.3C14.5 15.1 13 16.5 11.2 16.5C9.5 16.5 8 15.1 8 13.4C8 11.7 9.4 10.3 11.1 10.3C11.5 10.3 11.9 10.4 12.2 10.5V8C11.9 7.9 11.5 7.9 11.1 7.9C8.1 7.9 5.7 10.3 5.7 13.3C5.7 16.3 8.1 18.7 11.1 18.7C14.1 18.7 16.5 16.3 16.5 13.3V9C17.4 9.7 18.5 10.1 19.6 10.1V7.7C17.4 7.7 15.6 6 15.5 3.8V4H14.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

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

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.24 }}
          >
            <Title>Redes sociais</Title>
            <Text>@guigalino</Text>
            <SocialList>
              <li>
                <SocialLink
                  href="https://www.instagram.com/guigalino/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @guigalino"
                >
                  <SocialIcon>
                    <InstagramIcon />
                  </SocialIcon>
                </SocialLink>
              </li>
              <li>
                <SocialLink
                  href="https://www.youtube.com/@guigalino"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube @guigalino"
                >
                  <SocialIcon>
                    <YouTubeIcon />
                  </SocialIcon>
                </SocialLink>
              </li>
              <li>
                <SocialLink
                  href="https://www.tiktok.com/@guigalino"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok @guigalino"
                >
                  <SocialIcon>
                    <TikTokIcon />
                  </SocialIcon>
                </SocialLink>
              </li>
            </SocialList>
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
