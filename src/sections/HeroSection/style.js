import styled from 'styled-components'

export const HeroGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.1fr 1fr;
    align-items: center;
    gap: 3rem;
  }
`

export const Eyebrow = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.82rem;
`

export const Title = styled.h1`
  margin-top: 0.8rem;
  font-size: ${({ theme }) => theme.typography.h1};
  line-height: 1.08;
  max-width: 16ch;
`

export const Subtitle = styled.p`
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.typography.bodyLg};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 52ch;
`

export const CounterGrid = styled.div`
  margin-top: 1.7rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

export const CounterLabel = styled.p`
  margin-top: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accentGold};
`

export const MetaInfo = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
`

export const CtaWrap = styled.div`
  margin-top: 1.5rem;
`

export const IllustrationWrap = styled.div`
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: center;

  &::before {
    content: '';
    position: absolute;
    width: 86%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: ${({ theme }) => theme.gradients.glow};
    filter: blur(12px);
    z-index: -1;
    opacity: 0.65;
  }
`

export const BibleArt = styled.img`
  width: min(500px, 100%);
  height: auto;
  filter: drop-shadow(0 12px 34px rgba(27, 42, 74, 0.24));
`

export const Logo = styled.img`
  width: min(120px, 100%);
  margin-bottom: 0.9rem;
`
