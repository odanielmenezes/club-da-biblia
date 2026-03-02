import { motion } from 'framer-motion'
import { StyledButton } from './style'

function Button({ children, variant = 'primary', size = 'md', fullWidth = false, ...rest }) {
  return (
    <StyledButton
      as={motion.button}
      whileTap={{ scale: 0.98 }}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </StyledButton>
  )
}

export default Button
