import { StyledContainer } from './style'

function Container({ children, as = 'div' }) {
  return <StyledContainer as={as}>{children}</StyledContainer>
}

export default Container
