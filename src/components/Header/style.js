import styled from 'styled-components'

export const HeaderBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  backdrop-filter: blur(16px);
  background: rgba(255, 250, 243, 0.84);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const HeaderInner = styled.div`
  min-height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

export const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0;
`

export const BrandLogo = styled.img`
  width: 120px;
  height: auto;
  display: block;
`

export const MenuAnchor = styled.div`
  position: relative;
  display: inline-flex;
`

export const MenuButton = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.82);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.blueDeep};
  }
`

export const MenuIcon = styled.span`
  width: 20px;
  height: 14px;
  position: relative;
  display: inline-block;

  &::before,
  &::after,
  span {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 3px;
    background: ${({ theme }) => theme.colors.text};
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  &::before {
    top: 0;
  }

  span {
    top: 6px;
  }

  &::after {
    top: 12px;
  }

  &[data-open='true']::before {
    transform: translateY(6px) rotate(45deg);
  }

  &[data-open='true'] span {
    opacity: 0;
  }

  &[data-open='true']::after {
    transform: translateY(-6px) rotate(-45deg);
  }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(27, 42, 74, 0.2);
  z-index: 49;
`

export const Drawer = styled.nav`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  transform: translateX(calc(-100% - 8px));
  width: min(340px, calc(100vw - 5rem));
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border-radius: 18px;
  padding: 1rem;
  z-index: 51;
`

export const MenuList = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.4rem;
`

export const MenuItem = styled.a`
  display: block;
  padding: 0.85rem 0.75rem;
  border-radius: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(244, 93, 34, 0.12);
    color: ${({ theme }) => theme.colors.text};
  }
`

export const DrawerFooter = styled.div`
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.88rem;
`
