import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lora:wght@500;600;700&family=Playfair+Display:wght@700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    min-height: 100%;
  }

  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }

  body {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    background: ${({ theme }) => theme.gradients.hero};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.62;
    font-size: ${({ theme }) => theme.typography.body};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    position: relative;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.04;
    z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='%2314213d' fill-opacity='0.38'%3E%3Ccircle cx='12' cy='14' r='1'/%3E%3Ccircle cx='48' cy='32' r='1'/%3E%3Ccircle cx='96' cy='18' r='1'/%3E%3Ccircle cx='36' cy='92' r='1'/%3E%3Ccircle cx='118' cy='86' r='1'/%3E%3Ccircle cx='72' cy='118' r='1'/%3E%3C/g%3E%3C/svg%3E");
    background-repeat: repeat;
  }

  h1,
  h2,
  h3,
  h4 {
    line-height: 1.2;
    letter-spacing: -0.01em;
    overflow-wrap: break-word;
  }

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 800;
    letter-spacing: -0.015em;
    line-height: 1.14;
  }

  h2,
  h3 {
    font-family: 'Lora', Georgia, serif;
    font-weight: 600;
    line-height: 1.24;
  }

  p {
    overflow-wrap: break-word;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input {
    font: inherit;
  }
`

export default GlobalStyle
