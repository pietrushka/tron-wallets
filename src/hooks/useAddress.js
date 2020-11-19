import { useContext, createContext, useState } from 'react'

const AddressContext = createContext()

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([''])

  const addAddress = () => setAddresses(addresses => [...addresses, ''])

  const removeAddress = (index) => {
    const filteredAddresses = addresses.filter((address, addressIdx) => addressIdx !== index)
    setAddresses(filteredAddresses)
  }

  const saveAddress = (value, index) => {
    const newAddresses = [...addresses]
    newAddresses[index] = value.trim()
    setAddresses(newAddresses)
  }

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        removeAddress,
        saveAddress
      }}
    >
      {children}
    </AddressContext.Provider>
  )
}

export const useAddress = () => useContext(AddressContext)