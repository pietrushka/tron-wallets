import { useContext, createContext, useState } from 'react'
import axios from 'axios'


const AddressContext = createContext()

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([{value: '', isValid: null}])

  const addAddress = () => setAddresses(addresses => [...addresses, {value: '', isValid: null}])

  const removeAddress = (index) => {
    const filteredAddresses = addresses.filter((address, addressIdx) => addressIdx !== index)
    setAddresses(filteredAddresses)
  }

  const saveAddress =  (value, index) => {
    const newAddresses = [...addresses]
    const newValue = value.trim()
    newAddresses[index] = {value: newValue, isValid: null}

    setAddresses(newAddresses)
  }

  const validAddress = async (address, index) => {

    if (address.value.trim().length === 34 && address.isValid === null) {
      try {
        const updatedAdresses = [...addresses]
        let body = JSON.stringify({address: address.value})
        const res = await axios.post('https://api.trongrid.io/wallet/validateaddress', body)
        updatedAdresses[index] = {value: address.value, isValid: res.data.result}
        setAddresses(updatedAdresses)
      } catch (err) {
        console.error(err.message)
      }
    }
  }
    
  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        removeAddress,
        saveAddress,
        validAddress
      }}
    >
      {children}
    </AddressContext.Provider>
  )
}

export const useAddress = () => useContext(AddressContext)