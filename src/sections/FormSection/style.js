import styled from 'styled-components'

export const Grid = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  padding: clamp(1.2rem, 3vw, 2rem);
  background:
    radial-gradient(circle at 16% 18%, rgba(244, 93, 34, 0.14), transparent 44%),
    radial-gradient(circle at 84% 14%, rgba(247, 148, 29, 0.16), transparent 34%),
    linear-gradient(140deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 244, 231, 0.96) 100%);
  display: grid;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    z-index: -1;
    opacity: 0.55;
  }

  &::before {
    width: 220px;
    height: 220px;
    top: -110px;
    left: -80px;
    background: rgba(244, 93, 34, 0.2);
  }

  &::after {
    width: 180px;
    height: 180px;
    right: -70px;
    bottom: -90px;
    background: rgba(247, 148, 29, 0.2);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }
`

export const LeftCard = styled.div`
  min-width: 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-right: 0.6rem;
    min-height: 100%;
  }
`

export const RightCard = styled.form`
  min-width: 0;
  display: grid;
  gap: 0.15rem;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(27, 42, 74, 0.12);
  border-radius: 18px;
  padding: clamp(0.9rem, 2.2vw, 1.3rem);
  backdrop-filter: blur(6px);

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-left: clamp(1rem, 2vw, 1.3rem);
    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }
`

export const Heading = styled.h2`
  font-size: ${({ theme }) => theme.typography.h2};
  max-width: 18ch;
`

export const Description = styled.p`
  margin-top: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 40ch;
`

export const CheckList = styled.div`
  margin-top: 1.25rem;
  display: grid;
  gap: 1rem;
  width: 100%;
`

export const Feedback = styled.p`
  margin-top: 0.7rem;
  color: ${({ theme }) => theme.colors.success};
  min-height: 1.2rem;

  &[data-error='true'] {
    color: ${({ theme }) => theme.colors.danger};
  }
`
