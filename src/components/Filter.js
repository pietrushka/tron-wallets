import {useState} from 'react'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'

export default function FilterSettings ({filterConfig, dispatch}) {
  const [isOpen, setIsOpen] = useState(false) 

  const handleClear = () => {
    dispatch({type: 'CLEAR'})
    setIsOpen(false)
  }

  return (
    <>
      <OpenButton onClick={() => setIsOpen(!isOpen)}>Filter <FilterBtnArrow isRotated={!isOpen}>▼</FilterBtnArrow></OpenButton>

      {
        isOpen && (
          <FilterOptionsContainer>
            <InputsConatainer>
              <FilterGroup>
                <FilterHeading>Search addresses</FilterHeading>
                <FilterInput 
                  type='text'
                  onChange={e => dispatch({type: 'SET_ADDRESS_QUERY', value: e.target.value})}
                />
              </FilterGroup>

              <FilterGroup>
                <FilterHeading>Balance</FilterHeading>
                <ValuesPickersContainer>
                  <RangeInputContainer>
                    <span>from: </span>
                    <FilterInput 
                      type="number"
                      onChange={e => dispatch({type: 'SET_BALANCE', value: e.target.value, option: 'min'})}
                    />
                  </RangeInputContainer>
                  <RangeInputContainer>
                    <span>to: </span>
                    <FilterInput 
                      type="number"
                      onChange={e => dispatch({type: 'SET_BALANCE', value: e.target.value, option: 'max'})}
                    />
                  </RangeInputContainer>
                </ValuesPickersContainer>
              </FilterGroup>

              <FilterGroup>
                <FilterHeading>Create time</FilterHeading>
                <ValuesPickersContainer>
                  <RangeInputContainer>
                    <span>from: </span>
                    <StyledDatePicker 
                      placeholderText='dd/mm/yyyy'
                      selected={filterConfig.create_time.min}
                      onChange={date => dispatch({
                        type: 'SET_CREATE_TIME',
                        value: date,
                        option: 'min'
                      })}
                      dateFormat='dd/MM/yyyy'
                      showYearDropdown
                      isClearable
                    />
                  </RangeInputContainer>
                  <RangeInputContainer>
                    <span>to: </span>
                    <StyledDatePicker 
                      placeholderText='dd/mm/yyyy'
                      selected={filterConfig.create_time.max}
                      onChange={date => dispatch({
                        type: 'SET_CREATE_TIME',
                        value: date,
                        option: 'max'
                      })}
                      showYearDropdown
                      dateFormat='dd/MM/yyyy'
                      isClearable
                    />
                  </RangeInputContainer>
                </ValuesPickersContainer>
              </FilterGroup>
              
              <FilterGroup>
                <FilterHeading>Last operation</FilterHeading>
                <ValuesPickersContainer>
                  <RangeInputContainer>
                    <span>from: </span>
                    <StyledDatePicker 
                      placeholderText='dd/mm/yyyy'
                      selected={filterConfig.latest_opration_time.min}
                      onChange={date => dispatch({
                        type: 'SET_LATEST_OPERATION_TIME',
                        value: date,
                        option: 'min'
                      })}
                      dateFormat='dd/MM/yyyy'
                      showYearDropdown
                      isClearable
                    />
                  </RangeInputContainer>
                  <RangeInputContainer>
                    <span>to: </span>
                    <StyledDatePicker 
                      placeholderText='dd/mm/yyyy'
                      selected={filterConfig.latest_opration_time.max}
                      onChange={date => dispatch({
                        type: 'SET_LATEST_OPERATION_TIME',
                        value: date,
                        option: 'max'
                      })}
                      showYearDropdown
                      dateFormat='dd/MM/yyyy'
                      isClearable
                    />
                  </RangeInputContainer>
                </ValuesPickersContainer>
              </FilterGroup>
            </InputsConatainer>

            <ClearButton onClick={handleClear}>Clear</ClearButton>
          </FilterOptionsContainer>
        )
      }
    </>
  )
}



const OpenButton = styled.button`
  font-size: 1.2rem;
  padding: .15em .25em;
  margin: .5em auto;
  border: 0.15em solid var(--black);
  background: var(--white);
  color: var(--black);
  border-radius: .5em;
  cursor: pointer;
  outline: 0;
`

const FilterBtnArrow = styled.span`
  display: inline-block;
  ${({isRotated}) => isRotated && 'transform: rotate(-90deg)'};
`

const FilterOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 2rem;
`

const InputsConatainer = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  @media (min-width: 700px) {
    flex-direction: row;
  }

`

const ValuesPickersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: .5rem 0;
  
  @media (min-width: 700px) {
    width: 25%;
    justify-content: center;
  }
`

const FilterHeading = styled.h3`
  font-weight: 500;
  font-size: 1.1rem;
  margin: 0 0 .25em 0;
`

const RangeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: .25rem 0;

  span {
    font-size: .75rem;
  }
`

const FilterInput = styled.input`
  max-width: 80%;
  padding: .15em .25em;
  border: 0.1em solid var(--black);
  background: var(--white);
  color: var(--black);
  border-radius: .5em;
  cursor: pointer;
  outline: 0;
` 

const StyledDatePicker = styled(DatePicker)`
  max-width: 80%;
  padding: .15em .25em;
  border: 0.1em solid var(--black);
  background: var(--white);
  color: var(--black);
  border-radius: .5em;
  cursor: pointer;
  outline: 0;
`

const ClearButton = styled.button`
  display: inline-block;
  margin-top: 1.5em;
  padding: .25em 0;
  width: 50%;
  border: 0.15em solid var(--black);
  background: var(--white);
  color: var(--black);
  border-radius: .5em;
  cursor: pointer;
  outline: 0;
  align-self: center;
  max-width: 200px;

  @media (min-width: 700px) {
    align-self: flex-end;
    margin-right: 1rem;
  }
`