import styled from 'styled-components'

export const Badge = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 0.65rem 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  background: rgba(244, 93, 34, 0.08);
`
