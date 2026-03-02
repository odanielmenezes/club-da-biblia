const theme = {
  colors: {
    backgroundPrimary: '#10203D',
    backgroundSecondary: '#1D2D4A',
    goldPrimary: '#F7941D',
    blueDeep: '#1B2A4A',
    textPrimary: '#14213D',
    textSecondary: '#445A78',
    background: '#FFFDF9',
    surface: '#FFFFFF',
    surfaceAlt: '#FFF4E7',
    primary: '#F45D22',
    primaryHover: '#FF7A2F',
    text: '#1B2A4A',
    textMuted: '#5D6F88',
    accentGold: '#F7941D',
    success: '#1F7A4A',
    danger: '#C03A2B',
    border: 'rgba(27, 42, 74, 0.18)',
  },
  gradients: {
    hero: 'radial-gradient(circle at 14% 10%, rgba(244, 93, 34, 0.2), transparent 42%), radial-gradient(circle at 86% 12%, rgba(247, 148, 29, 0.18), transparent 36%), linear-gradient(180deg, #FFFCF7 0%, #FFF2E3 100%)',
    card: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 247, 236, 0.86) 100%)',
    glow: 'radial-gradient(circle, rgba(244, 93, 34, 0.24), rgba(244, 93, 34, 0) 72%)',
  },
  shadows: {
    glow: '0 0 24px rgba(244, 93, 34, 0.18)',
    card: '0 14px 34px rgba(18, 31, 56, 0.16)',
  },
  spacing: {
    sectionY: 'clamp(44px, 6.2vw, 82px)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  typography: {
    h1: 'clamp(2rem, 5vw, 3.8rem)',
    h2: 'clamp(1.55rem, 3.5vw, 2.35rem)',
    body: 'clamp(0.98rem, 1.5vw, 1.06rem)',
    bodyLg: 'clamp(1rem, 2.2vw, 1.2rem)',
  },
}

export default theme
