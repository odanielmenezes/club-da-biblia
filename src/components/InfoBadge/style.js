import styled from 'styled-components'

export const Badge = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 0.65rem 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  background: rgba(244, 93, 34, 0.08);
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
    text-align: left;
  }
`
