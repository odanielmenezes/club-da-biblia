import { Wrapper } from './style'

function SectionWrapper({ children, id }) {
  return <Wrapper id={id}>{children}</Wrapper>
}

export default SectionWrapper
