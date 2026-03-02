import { motion } from 'framer-motion'
import bibleHeroImage from '../../assets/bible-hero.png'
import logo from '../../assets/club-da-biblia-logo.png'
import Button from '../../components/Button/component'
import Container from '../../components/Container/component'
import CountdownCard from '../../components/CountdownCard/component'
import InfoBadge from '../../components/InfoBadge/component'
import SectionWrapper from '../../components/SectionWrapper/component'
import {
  BibleArt,
  CounterLabel,
  CounterGrid,
  CtaWrap,
  Eyebrow,
  HeroGrid,
  IllustrationWrap,
  Logo,
  MetaInfo,
  Subtitle,
  Title,
} from './style'
import { useEffect, useMemo, useState } from 'react'

const initialSeconds = 1191 * 24 * 60 * 60 + 11 * 60 * 60 + 53 * 60 + 52

function parseDuration(totalSeconds: number) {
  const safe = Math.max(totalSeconds, 0)
  const days = Math.floor(safe / (24 * 60 * 60))
  const hours = Math.floor((safe % (24 * 60 * 60)) / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const seconds = safe % 60

  return { days, hours, minutes, seconds }
}

function HeroSection() {
  const startedAt = useMemo(() => Date.now(), [])
  const [elapsed, setElapsed] = useState(() => initialSeconds)

  useEffect(() => {
    const timer = setInterval(() => {
      const secondsSinceStart = Math.floor((Date.now() - startedAt) / 1000)
      setElapsed(initialSeconds + Math.max(secondsSinceStart, 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [startedAt])

  const { days, hours, minutes, seconds } = parseDuration(elapsed)

  return (
    <SectionWrapper id="inicio">
      <Container>
        <HeroGrid>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            {/* <Logo src={logo} alt="Logo Club da Bíblia" /> */}
            <Eyebrow>Leitura bíblica diária ao vivo</Eyebrow>
            <Title>Lendo a Bíblia juntos diariamente</Title>
            <Subtitle>
              Todos os dias, entre 07:10 e 07:20 da manhã, uma mesa está posta para quem escolhe
              constância espiritual. A constância que transforma a alma começa com um capítulo por vez.
            </Subtitle>

            <CounterLabel>Lendo a Bíblia diariamente há:</CounterLabel>
            <CounterGrid>
              <CountdownCard value={days} label="dias" />
              <CountdownCard value={hours} label="horas" />
              <CountdownCard value={minutes} label="minutos" />
              <CountdownCard value={seconds} label="segundos" />
            </CounterGrid>

            <MetaInfo>
              <InfoBadge>1.500 irmãos lendo juntos</InfoBadge>
              <InfoBadge>Live: 07:20h</InfoBadge>
            </MetaInfo>

            <CtaWrap>
              <Button size="lg">Participar gratuitamente</Button>
            </CtaWrap>
          </motion.div>

          <IllustrationWrap
            as={motion.div}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <BibleArt src={bibleHeroImage} alt="Imagem da Bíblia" />
          </IllustrationWrap>
        </HeroGrid>
      </Container>
    </SectionWrapper>
  )
}

export default HeroSection
