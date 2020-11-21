import { useContext, createContext, useState } from 'react'

import {checkIsAddressValid, getData} from '../lib/api'

const AddressContext = createContext()

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([{value: '', isValid: null}])
  const [accountsData, setAccountsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const addAddress = () => setAddresses(addresses => [...addresses, {value: '', isValid: null}])

  const removeAddress = (index) => {
    const filteredAddresses = addresses.filter((address, addressIdx) => addressIdx !== index)
    setAddresses(filteredAddresses)
  }

  const updateAddress =  (value, index) => {
    const newAddresses = [...addresses]
    const newValue = value.trim()
    newAddresses[index] = {value: newValue, isValid: null}

    setAddresses(newAddresses)

    validateAddress(newValue, index)
  }

  const validateAddress = async (address, index) => {
    if (address.length === 34) {
      setIsLoading(true)
      const updatedAdresses = [...addresses]
      const result = await checkIsAddressValid(address)
      updatedAdresses[index] = { value: address, isValid: result}
      setAddresses(updatedAdresses)
      setIsLoading(false)
    }
  }

  const getAddressesData = async () => {
    setIsLoading(true) 

    const validAddressesData = addresses.filter(({isValid}) => isValid === true)

    if (validAddressesData.length === 0) return setIsLoading(false)

    const validAddresses = validAddressesData.map(({value}) => value)
    const data = await getData(validAddresses)
    setAccountsData(data)
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