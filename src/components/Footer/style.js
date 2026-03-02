import styled from 'styled-components'

export const FooterWrap = styled.footer`
  margin-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`

export const FooterGrid = styled.div`
  padding: 2.4rem 0 1.4rem;
  display: grid;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.3fr 1fr 1fr 1fr;
    gap: 2rem;
  }
`

export const Title = styled.h3`
  font-size: 1.18rem;
`

export const Text = styled.p`
  margin-top: 0.6rem;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 45ch;
`

export const List = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.48rem;
`

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.textMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`

export const SocialList = styled.ul`
  list-style: none;
  margin-top: 0.7rem;
  display: flex;
  gap: 0.6rem;
`

export const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
`

export const SocialIcon = styled.span`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`

export const BottomBar = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 1rem 0 1.6rem;
  font-size: 0.92rem;
`
