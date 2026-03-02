import { motion } from 'framer-motion'
import { Card, Label, Value } from './style'

function CountdownCard({ value, label, delay = 0 }) {
  return (
    <Card
      as={motion.div}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.38, delay }}
      whileHover={{ y: -2 }}
    >
      <Value>{String(value).padStart(2, '0')}</Value>
      <Label>{label}</Label>
    </Card>
  )
}

export default CountdownCard
