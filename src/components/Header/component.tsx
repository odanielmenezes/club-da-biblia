import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import logo from '../../assets/club-da-biblia-logo.png'
import Container from '../Container/component'
import {
  Brand,
  BrandLogo,
  Drawer,
  DrawerFooter,
  HeaderBar,
  HeaderInner,
  MenuAnchor,
  MenuButton,
  MenuIcon,
  MenuItem,
  MenuList,
  Overlay,
} from './style'

const links = [
  { id: 'inicio', label: 'Início' },
  { id: 'comunidade', label: 'Comunidade' },
  { id: 'camisetas', label: 'Camisetas' },
]

function Header() {
  const [open, setOpen] = useState(false)

  const handleNavigate = () => setOpen(false)

  return (
    <>
      <HeaderBar>
        <Container>
          <HeaderInner>
            <Brand href="#inicio" aria-label="Ir para início">
              <BrandLogo src={logo} alt="Logo Club da Bíblia" />
            </Brand>

            <MenuAnchor>
              <MenuButton
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={open}
              >
                <MenuIcon data-open={open}>
                  <span />
                </MenuIcon>
              </MenuButton>

              <AnimatePresence>
                {open && (
                  <Drawer
                    as={motion.nav}
                    initial={{ opacity: 0, x: 20, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MenuList>
                      {links.map((link) => (
                        <li key={link.id}>
                          <MenuItem href={`#${link.id}`} onClick={handleNavigate}>
                            {link.label}
                          </MenuItem>
                        </li>
                      ))}
                    </MenuList>
                    <DrawerFooter>Live diária entre 07:10 e 07:20 • Comunhão em constância</DrawerFooter>
                  </Drawer>
                )}
              </AnimatePresence>
            </MenuAnchor>
          </HeaderInner>
        </Container>
      </HeaderBar>

      <AnimatePresence>
        {open && (
          <Overlay as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
