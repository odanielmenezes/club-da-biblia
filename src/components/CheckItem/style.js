import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
`

export const Icon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.backgroundPrimary};
  background: ${({ theme }) => theme.colors.goldPrimary};
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.25);
  flex-shrink: 0;
`

export const Content = styled.div``

export const Title = styled.h4`
  font-size: 1rem;
  font-weight: 700;
`

export const Description = styled.p`
  margin-top: 0.2rem;
  color: ${({ theme }) => theme.colors.textMuted};
`
