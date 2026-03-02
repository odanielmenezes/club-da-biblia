import styled from 'styled-components'

export const Card = styled.div`
  background: ${({ theme }) => theme.gradients.card};
  border: 1px solid rgba(212, 175, 55, 0.22);
  border-radius: 20px;
  padding: 1rem 0.75rem;
  text-align: center;
  backdrop-filter: blur(8px);
  box-shadow: ${({ theme }) => theme.shadows.card};
`

export const Value = styled.div`
  font-size: clamp(1.55rem, 4vw, 2.35rem);
  font-weight: 800;
  line-height: 1;
  color: ${({ theme }) => theme.colors.accentGold};
  font-family: 'Playfair Display', Georgia, serif;
`

export const Label = styled.div`
  margin-top: 0.4rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`
