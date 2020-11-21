import {AddressProvider} from './hooks/useAddress'
import Layout from './components/Layout'
import Header from './components/Header'
import Search from './components/Search'
import Presentation from './components/Presentation'

export default function App() {
  return (
    <>
      <AddressProvider>
        <Layout>
          <Header />
          <Search />
          <Presentation />
        </Layout>
      </AddressProvider>
    </>
  )
}