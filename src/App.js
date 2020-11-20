import {AddressProvider} from './hooks/useAddress'
import Layout from './components/Layout'
import Header from './components/Header'
import Search from './components/Search'
import Table from './components/Table'

export default function App() {
  return (
    <>
      <AddressProvider>
        <Layout>
          <Header />
          <Search />
          <Table/>
        </Layout>
      </AddressProvider>
    </>
  )
}