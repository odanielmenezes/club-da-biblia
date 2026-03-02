import styled from 'styled-components'

export const StyledContainer = styled.div`
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: min(1120px, calc(100% - 4rem));
  }
`
