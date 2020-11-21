import styled from  '@emotion/styled'

import { useAddress } from '../hooks/useAddress'

export default function InputGroup ({address, index, addressesLength}) {
  const {removeAddress, updateAddress, addAddress} = useAddress()

  const handleAddingAddress = e => {
    e.preventDefault();
    addAddress()
  }

  const handleAddressRemoving = e => {
    e.preventDefault();
    removeAddress(index)
  }

  const handleChange = e => {
    updateAddress(e.target.value, index)
  }

  return (
      <InputContainer>
      {
        typeof address.isValid === 'boolean' && (
          <IsValidLabel isValid={address.isValid}>{address.isValid ? 'Address is valid' : 'Address is not valid'}</IsValidLabel>
        )
      }
        <Input 
          placeholder='Wallet address'
          value={address.value}
          onChange={handleChange}
          isValid={address.isValid}
          roundRight={addressesLength === 1}
        >
        </Input> 
        {
          addressesLength > 1 && <RemoveBtn onClick={handleAddressRemoving}>X</RemoveBtn> 
        }
        {
          addressesLength === index + 1 && <AddInputButton onClick={handleAddingAddress}>+</AddInputButton>
        }
      </InputContainer>
  )
}



const InputContainer = styled.div`
  position: relative;
  margin: 1rem 0;
  display: inline-flex;
  font-size: 1.1rem;
  align-self: center;
  width: 100%;
`

const IsValidLabel = styled.label`
  position: absolute;
  top: -1.25rem;
  font-size: 1rem;
  left: .5rem;
  color: ${({isValid}) => isValid ? 'green' : 'red'};
`

const Input = styled.input`
  font-size: inherit;
  border: 0.15em solid ${({isValid}) => isValid ? 'green' : isValid === null ? 'var(--black)' : 'red'};
  border-radius: ${({roundRight}) => roundRight ? '.5em' : '0.5em 0 0 0.5em'};
  padding: 0.2em 0.5em;
  color: var(--black);
  outline: 0;
  width: 90%;
  background: var(--white)
  z-index: 2;
`

const RemoveBtn = styled.button`
  font-size: inherit;
  border: 0.15em solid var(--black);
  border-radius: 0 0.5em 0.5em 0;
  background: var(--white);
  border-left: 0;
  padding: 0 0.75em;
  color: var(--black);
  font-weight: bold;
  outline: 0;
  cursor: pointer;
`

const AddInputButton = styled.button`
  position: absolute;
  font-weight: 700;
  left: .5rem;
  font-size: 1.5rem;
  bottom: -1.3em;
  line-height: 1em;
  padding: .1em .75em;
  border-color: var(--black);
  border-style: solid;
  border-width: 0 .1em .1em .1em;
  background: var(--white);
  border-radius: 0 0 0.25em .25em;
  outline: 0;
  cursor: pointer;
`