import styled, { css } from 'styled-components'

const variants = {
  primary: css`
    background: ${({ theme }) =>
      `linear-gradient(140deg, ${theme.colors.primary} 0%, ${theme.colors.primaryHover} 100%)`};
    color: ${({ theme }) => theme.colors.backgroundPrimary};
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.2);

    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.03);
      box-shadow: 0 10px 22px rgba(212, 175, 55, 0.24);
    }
  `,
  secondary: css`
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      transform: translateY(-2px);
      border-color: ${({ theme }) => theme.colors.blueDeep};
      box-shadow: 0 0 16px rgba(244, 93, 34, 0.2);
    }
  `,
  success: css`
    background: linear-gradient(140deg, #31a24c 0%, #25a343 100%);
    color: #ffffff;
    box-shadow: 0 8px 20px rgba(49, 162, 76, 0.25);

    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.08);
      box-shadow: 0 10px 25px rgba(49, 162, 76, 0.3);
    }
  `,
}

export const StyledButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: ${({ size }) => (size === 'lg' ? '1rem 2rem' : '0.85rem 1.4rem')};
  min-width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  font-weight: 700;
  letter-spacing: 0.005em;
  cursor: pointer;
  transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease,
    border-color 0.22s ease;
  ${({ variant }) => variants[variant || 'primary']}

  &:active {
    transform: translateY(0) scale(0.99);
  }
`
