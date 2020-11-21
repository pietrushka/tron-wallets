import {useState} from 'react'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'

export default function FilterSettings ({filterConfig, dispatch}) {
  const [isOpen, setIsOpen] = useState(false) 


  return (
    <>
      <OpenButton onClick={() => setIsOpen(!isOpen)}>Filter <FilterBtnArrow isRotated={!isOpen}>▼</FilterBtnArrow></OpenButton>

      {
        isOpen && (
          <FilterOptionsContainer>
            <FilterGroup>
              <p>Search addresses</p>
              <input 
                type='text'
                onChange={e => dispatch({type: 'SET_ADDRESS_QUERY', value: e.target.value})}
              />
            </FilterGroup>

            <FilterGroup>
              <p>balance</p>
              <ValuesPickersContainer>
                <input 
                  type="number"
                  onChange={e => dispatch({type: 'SET_BALANCE', value: e.target.value, option: 'min'})}
                />
                <input 
                  type="number"
                  onChange={e => dispatch({type: 'SET_BALANCE', value: e.target.value, option: 'max'})}
                />
              </ValuesPickersContainer>
            </FilterGroup>

            <FilterGroup>
              <p>create_time</p>
              <ValuesPickersContainer>
                <div>
                  <span>from: </span>
                  <DatePicker 
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
                </div>
                <div>
                  <span>to: </span>
                  <DatePicker 
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
                </div>
              </ValuesPickersContainer>
            </FilterGroup>
            
            <FilterGroup>
              <p>Last operation</p>
              <ValuesPickersContainer>
                <div>
                  <span>from: </span>
                  <DatePicker 
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
                </div>
                <div>
                  <span>to: </span>
                  <DatePicker 
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
                </div>
              </ValuesPickersContainer>
            </FilterGroup>

            <ClearButton onClick={() => dispatch({type: 'CLEAR'})}>Clear</ClearButton>
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
  margin: 0 auto;
  width: 90%;
  max-width: 435px;
`

const ValuesPickersContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const FilterGroup = styled.div``

const ClearButton = styled.button``