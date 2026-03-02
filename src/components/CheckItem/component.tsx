import { motion } from 'framer-motion'
import { Content, Description, Icon, Row, Title } from './style'

function CheckItem({ title, description }) {
  return (
    <Row
      as={motion.div}
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4 }}
    >
      <Icon>✓</Icon>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Row>
  )
}

export default CheckItem
