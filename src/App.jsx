import styled from 'styled-components'
import Footer from './components/Footer/component'
import Header from './components/Header/component'
import AdminPage from './pages/AdminPage'
import FormSection from './sections/FormSection/component'
import HeroSection from './sections/HeroSection/component'
import MerchSection from './sections/MerchSection/component'

const Page = styled.main`
  width: 100%;
  padding-top: 84px;
`

function App() {
  if (/\/admin\/?$/.test(globalThis.location.pathname)) {
    return <AdminPage />
  }

  return (
    <>
      <Header />
      <Page>
        <HeroSection />
        <FormSection />
        <MerchSection />
      </Page>
      <Footer />
    </>
  )
}

export default App
