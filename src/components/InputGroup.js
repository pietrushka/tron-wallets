import styled from  '@emotion/styled'

import { useAddress } from '../hooks/useAddress'

export default function InputGroup ({address, index, isTheOnlyAddress}) {
  const {removeAddress, saveAddress} = useAddress()

  const handleRemovingAddress = e => {
    e.preventDefault();
    removeAddress(index)
  }

  const handleChange = e => {
    saveAddress(e.target.value, index)
  }

  return (
    <InputContainer>
      <Input 
        placeholder='Wallet address'
        value={address}
        onChange={handleChange}
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
  display: inline-flex;
  font-size: 1.1rem;
  align-self: center;
  margin: 1rem 0;
  width: 100%;
`

const Input = styled.input`
  font-size: inherit;
  border: 0.15em solid var(--black);
  border-radius: ${({roundRight}) => roundRight ? '.5em' : '0.5em 0 0 0.5em'};
  padding: 0.2em 0.5em;
  color: var(--black);
  outline: 0;
  width: 90%;
  background: var(--white)
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