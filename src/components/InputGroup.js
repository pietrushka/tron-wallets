import styled from  '@emotion/styled'

import { useAddress } from '../hooks/useAddress'

export default function InputGroup ({address, index, isTheOnlyAddress}) {
  const {removeAddress, updateAddress, validateAddress} = useAddress()

  const handleRemovingAddress = e => {
    e.preventDefault();
    removeAddress(index)
  }

  const handleChange = e => {
    updateAddress(e.target.value, index)
    validateAddress({value: e.target.value, isValid: address.isValid}, index)
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
          roundRight={isTheOnlyAddress}
        >
        </Input> 
        {
          !isTheOnlyAddress && <RemoveBtn onClick={handleRemovingAddress}>X</RemoveBtn> 
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
  color: ${({isValid}) => isValid ? 'green' : 'red'}
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