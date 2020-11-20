import styled from  '@emotion/styled'
import { useAddress } from '../hooks/useAddress'

import InputGroup from './InputGroup'

export default function Search () {
  const {addresses, addAddress, getAddressesData, isLoading} = useAddress()

  const handleAddingAddress = e => {
    e.preventDefault();
    addAddress()
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    getAddressesData()
  }

  return (
    <SearchForm onSubmit={handleSubmit}>
      <FormFieldset disabled={isLoading}>
        {
          addresses.map((address, index) => (
            <InputGroup key={index} address={address} index={index} isTheOnlyAddress={addresses.length === 1 && true}/>
          ))
        }
        <AddInputBtn onClick={handleAddingAddress}>+ Add address</AddInputBtn>
        <SubmitBtn type='submit'>{!isLoading ?  'Submit' : 'Loading'}</SubmitBtn>
      </FormFieldset>
    </SearchForm>
  )
}

const SearchForm = styled.form`
  margin: 0 auto;
  width: 90%;
  max-width: 350px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1rem;
`

const FormFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  margin: 0;
  border: 0;
`

const AddInputBtn = styled.button`
  font-size: 1.2rem;
  margin: .5em 0;
  align-self: flex-start;
  border: 0.15em solid var(--black);
  background: var(--white);
  color: var(--black);
  border-radius: .5em;
  cursor: pointer;
  outline: 0;
`
const SubmitBtn = styled.button`
  font-size: 1.2rem;
  align-self: flex-end;
  border: 0.15em solid var(--black);
  background: var(--white);
  color: var(--black);
  border-radius: .5em;
  cursor: pointer;
  outline: 0;
`

