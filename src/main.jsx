import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './App.jsx'
import GlobalStyle from './styles/GlobalStyle'
import theme from './styles/Theme'

window.SC_DISABLE_SPEEDY = true
window.__CLUB_BUILD__ = '2026-03-02.3'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
