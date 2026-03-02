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
