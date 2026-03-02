import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  CarouselWrap,
  ControlButton,
  Controls,
  Dot,
  DotWrap,
  Slide,
  SlideDescription,
  SlideTitle,
} from './style'

type CarouselItem = {
  id: number
  title: string
  description: string
  bg: string
}

type CarouselProps = Readonly<{
  items?: CarouselItem[]
}>

function Carousel({ items = [] }: CarouselProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!items.length) return undefined
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 4200)

    return () => clearInterval(timer)
  }, [items.length])

  if (!items.length) return null

  const current = items[index]

  return (
    <CarouselWrap>
      <AnimatePresence mode="wait">
        <Slide
          as={motion.div}
          key={current.id}
          style={{ background: current.bg }}
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -26 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div>
            <SlideTitle>{current.title}</SlideTitle>
            <SlideDescription>{current.description}</SlideDescription>
          </div>
        </Slide>
      </AnimatePresence>

      <DotWrap>
        {items.map((item, dotIndex) => (
          <Dot
            key={item.id}
            type="button"
            data-active={dotIndex === index}
            onClick={() => setIndex(dotIndex)}
            aria-label={`Ir para item ${dotIndex + 1}`}
          />
        ))}
      </DotWrap>

      <Controls>
        <ControlButton type="button" onClick={() => setIndex((prev) => (prev - 1 + items.length) % items.length)}>
          ‹
        </ControlButton>
        <ControlButton type="button" onClick={() => setIndex((prev) => (prev + 1) % items.length)}>
          ›
        </ControlButton>
      </Controls>
    </CarouselWrap>
  )
}

export default Carousel
