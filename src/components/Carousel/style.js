import styled from 'styled-components'

export const CarouselWrap = styled.div`
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background:
    radial-gradient(circle at 9% 8%, rgba(247, 148, 29, 0.22), transparent 42%),
    radial-gradient(circle at 90% 88%, rgba(27, 42, 74, 0.16), transparent 48%),
    linear-gradient(150deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 244, 230, 0.96) 100%);
  box-shadow: ${({ theme }) => theme.shadows.card};
  height: 340px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 320px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 470px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 430px;
  }
`

export const SlideViewport = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 1.3fr;
  gap: 0;
  align-items: start;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`

export const Slide = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 250, 240, 0.3) 100%);
  gap: 0;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 1.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.2rem;
  }
`

export const SlideContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: left;
  color: ${({ theme }) => theme.colors.blueDeep};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 1rem;
  }
`

export const SlideMeta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

export const SlideTitle = styled.h3`
  margin-top: 0.3rem;
  margin-bottom: 0.4rem;
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.blueDeep};
  font-weight: 700;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`

export const SlideDescription = styled.p`
  margin-top: 0.4rem;
  margin-bottom: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 40ch;
  font-size: 0.95rem;
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.9rem;
  }
`

export const SlideAction = styled.div`
  margin-top: 1.2rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 1rem;
  }
`

export const SlideImage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f2e8;
  flex: 1;
  height: 100%;
  padding: 0;
  border-radius: 0 16px 16px 0;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 230px;
    border-radius: 0 0 16px 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 200px;
  }
`

export const SlideImageTag = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`

export const SlideImageLoading = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 250, 243, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SlideImageSpinner = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 3px solid rgba(27, 42, 74, 0.22);
  border-top-color: ${({ theme }) => theme.colors.blueDeep};
  animation: carouselSpin 0.8s linear infinite;

  @keyframes carouselSpin {
    to {
      transform: rotate(360deg);
    }
  }
`

export const Controls = styled.div`
  position: absolute;
  bottom: 1.2rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 10;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: 0.8rem;
    padding: 0 1.5rem;
  }
`

export const ControlGroup = styled.div`
  display: flex;
  gap: 0.6rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 0.4rem;
  }
`

export const ControlButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors.blueDeep};
  background: rgba(255, 255, 255, 0.95);
  color: ${({ theme }) => theme.colors.blueDeep};
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: translate(0, -2px);
    background: #fff;
    box-shadow: 0 4px 12px rgba(27, 42, 74, 0.15);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 38px;
    height: 38px;
    font-size: 1.1rem;
  }
`

export const Counter = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blueDeep};
  letter-spacing: 0.05em;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.8rem;
  }
`

export const DotWrap = styled.div`
  margin-top: 1rem;
  padding-bottom: 0;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 0.35rem;
  }
`

export const Dot = styled.button`
  border-radius: 999px;
  border: 1.5px solid ${({ theme }) => theme.colors.blueDeep};
  padding: 0.5rem 0.9rem;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  background: rgba(255, 255, 255, 0.8);
  color: ${({ theme }) => theme.colors.blueDeep};
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;

  &[data-active='true'] {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }
`

export const ProgressTrack = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2.5px;
  background: rgba(27, 42, 74, 0.1);
  z-index: 1;
`

export const ProgressBar = styled.div`
  height: 100%;
  width: ${({ $width }) => $width};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  transition: width 0.2s linear;
`

export const PreviewCard = styled.button`
  display: none;
`

export const PreviewImage = styled.div`
  display: none;
`
