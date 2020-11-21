import styled from  '@emotion/styled'
import { useEffect, useState } from 'react'
import { useImmerReducer } from "use-immer";

import { useAddress } from '../hooks/useAddress'
import Table from './Table'
import Filter from './Filter'
import filterData from '../lib/filterData'

const initialConfig =   {
  address: '',
  balance: {min: null, max: null},
  create_time: {min: null, max: null},
  latest_opration_time: {min: null, max: null}
}

const filterReducer = (draft, action) =>  {
  switch (action.type) {
    case 'SET_ADDRESS_QUERY':
      draft.address = action.value
      return 

    case 'SET_BALANCE':
      if(action.value) {
        draft.balance.[action.option] = action.value
      } else {
        draft.balance.[action.option] = null
      }
      return 
      

    case 'SET_CREATE_TIME':
      if(action.value === null) {
        draft.create_time.[action.option] = null
        return
      }
      const createDateConverted = action.value.getTime()
      draft.create_time.[action.option] = createDateConverted
      return

    case 'SET_LATEST_OPERATION_TIME':
      if(action.value === null) {
        draft.latest_opration_time.[action.option] = null
        return
      }
      const lastDateConverted = action.value.getTime()
      draft.latest_opration_time.[action.option] = lastDateConverted
      return
      
    case 'CLEAR':
      return initialConfig;

    default:
      throw new Error();
  }
}

export default function Presentation () {
  const {accountsData} = useAddress()
  const [filteredData, setFilteredData] = useState(accountsData)
  const [filterConfig, dispatch] = useImmerReducer(filterReducer, initialConfig)
  
  useEffect(() => {
    const filteredData = filterData(filterConfig, accountsData)
    setFilteredData(filteredData)
  }, [accountsData, filterConfig])
  
  return (
    <>
      {
        accountsData.length > 0 && (
          <PresentationContainer>
            <Filter filterConfig={filterConfig} dispatch={dispatch}/>
            <Table filteredData={filteredData}/>
          </PresentationContainer>
        )
      }
    </>
  )
}

const PresentationContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1rem;
`