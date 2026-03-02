import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Badge } from './style'

type InfoBadgeProps = Readonly<{
  children: ReactNode
}>

function InfoBadge({ children }: InfoBadgeProps) {
  return (
    <Badge
      as={motion.div}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </Badge>
  )
}

export default InfoBadge
