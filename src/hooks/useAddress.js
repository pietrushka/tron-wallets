import { useContext, createContext, useState } from 'react'

import {validateAddresses, getData} from '../lib/api'

const AddressContext = createContext()

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([{value: '', isValid: null}])
  const [accountsData, setAccountsData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const addAddress = () => setAddresses([...addresses, {value: '', isValid: null}])

  const removeAddress = (index) => {
    const filteredAddresses = addresses.filter((address, addressIdx) => addressIdx !== index)
    setAddresses(filteredAddresses)
  }

  const updateAddress =  (value, index) => {
    const newAddresses = [...addresses]
    const newValue = value.trim()
    newAddresses[index] = {value: newValue, isValid: null}

    setAddresses(newAddresses)
  }

  const getAddressesData = async () => {
    setIsLoading(true) 

    const validatedAddressesData = await validateAddresses(addresses)

    const validAddressesData = validatedAddressesData.filter(({isValid}) => isValid === true)

    if (validAddressesData.length > 0) {
      const validAddresses = validAddressesData.map(({value}) => value)
      const data = await getData(validAddresses)
      setAccountsData(data)
    } else {
      setAccountsData([])
    }

    
    setAddresses(validatedAddressesData)
    setIsLoading(false)
  }

  return (
    <AddressContext.Provider
      value={{
        addresses,
        accountsData,
        isLoading,
        addAddress,
        removeAddress,
        updateAddress,
        getAddressesData
      }}
    >
      {children}
    </AddressContext.Provider>
  )
}

export const useAddress = () => useContext(AddressContext)