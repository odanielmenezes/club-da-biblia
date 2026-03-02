import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  gap: 1.4rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 2.2rem;
  }
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.h2};
  max-width: 18ch;
`

export const Text = styled.p`
  margin-top: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 55ch;
`

export const Actions = styled.div`
  margin-top: 1.4rem;
`

export const LoadingCard = styled.div`
  min-height: 300px;
  border-radius: 28px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 244, 230, 0.96) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 3px solid rgba(27, 42, 74, 0.2);
  border-top-color: ${({ theme }) => theme.colors.blueDeep};
  animation: merchSpin 0.8s linear infinite;

  @keyframes merchSpin {
    to {
      transform: rotate(360deg);
    }
  }
`
