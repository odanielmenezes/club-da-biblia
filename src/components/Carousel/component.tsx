import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  CarouselWrap,
  ControlGroup,
  ControlButton,
  Counter,
  Controls,
  ProgressBar,
  ProgressTrack,
  Slide,
  SlideContent,
  SlideDescription,
  SlideMeta,
  SlideTitle,
  SlideViewport,
  SlideImage,
  SlideImageTag,
  SlideImageLoading,
  SlideImageSpinner,
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

const AUTO_ADVANCE_MS = 5200

function extractImageUrl(bgValue: string) {
  const raw = String(bgValue || '').trim()
  if (!raw) return ''

  if (/^https?:\/\//i.test(raw) || raw.startsWith('data:image/')) {
    return raw
  }

  const matches = [...raw.matchAll(/url\((["'])?(.*?)\1\)/gi)]
  if (matches.length > 0) {
    return String(matches.at(-1)?.[2] || '').trim()
  }

  return ''
}

function Carousel({ items = [] }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const total = items.length

  useEffect(() => {
    if (!total || isPaused) return undefined

    const startedAt = Date.now()
    setProgress(0)

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startedAt
      const value = Math.min(100, (elapsed / AUTO_ADVANCE_MS) * 100)
      setProgress(value)
    }, 80)

    const advanceTimer = setTimeout(() => {
      setDirection(1)
      setIndex((prev) => (prev + 1) % total)
      setProgress(0)
    }, AUTO_ADVANCE_MS)

    return () => {
      clearInterval(progressTimer)
      clearTimeout(advanceTimer)
    }
  }, [index, isPaused, total])

  const current = items[index]
  const currentImageUrl = extractImageUrl(current?.bg || '')

  useEffect(() => {
    setIsImageLoading(Boolean(currentImageUrl) && total > 0)
  }, [currentImageUrl, total])

  useEffect(() => {
    if (!currentImageUrl) {
      setIsImageLoading(false)
      return
    }

    const frame = requestAnimationFrame(() => {
      const image = imageRef.current
      if (image?.complete && image.naturalWidth > 0) {
        setIsImageLoading(false)
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [currentImageUrl, current?.id])

  if (!total || !current) return null

  const paginate = (nextDirection: 1 | -1) => {
    setDirection(nextDirection)
    setIndex((prev) => (prev + nextDirection + total) % total)
    setProgress(0)
  }

  return (
    <CarouselWrap
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <ProgressTrack>
        <ProgressBar $width={`${progress}%`} />
      </ProgressTrack>

      <SlideViewport>
        <AnimatePresence custom={direction} mode="wait">
          <Slide
            as={motion.div}
            key={current.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <SlideContent>
              <SlideMeta>
                Coleção {String(index + 1).padStart(2, '0')}
              </SlideMeta>
              <SlideTitle>{current.title}</SlideTitle>
              <SlideDescription>{current.description}</SlideDescription>
            </SlideContent>
          </Slide>
        </AnimatePresence>

        <AnimatePresence custom={direction} mode="wait">
          <SlideImage
            as={motion.div}
            key={`image-${current.id}`}
            custom={direction}
            initial={{ opacity: 0, scale: 0.96, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.96, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            onDragEnd={(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
              if (info.offset.x < -70) {
                paginate(1)
              } else if (info.offset.x > 70) {
                paginate(-1)
              }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
          >
            {currentImageUrl ? (
              <SlideImageTag
                ref={imageRef}
                src={currentImageUrl}
                alt={current.title}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
              />
            ) : null}
            {isImageLoading ? (
              <SlideImageLoading>
                <SlideImageSpinner aria-hidden="true" />
              </SlideImageLoading>
            ) : null}
          </SlideImage>
        </AnimatePresence>
      </SlideViewport>

      <Controls>
        <ControlGroup>
          <ControlButton
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Slide anterior"
          >
            ‹
          </ControlButton>
          <ControlButton
            type="button"
            onClick={() => paginate(1)}
            aria-label="Próximo slide"
          >
            ›
          </ControlButton>
        </ControlGroup>

        <Counter>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </Counter>
      </Controls>
    </CarouselWrap>
  )
}

export default Carousel
