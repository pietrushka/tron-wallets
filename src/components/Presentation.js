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
  const {accountsData, isLoading} = useAddress()
  const [filteredData, setFilteredData] = useState(accountsData)
  const [filterConfig, dispatch] = useImmerReducer(filterReducer, initialConfig)
  
  useEffect(() => {
    if(accountsData === null) return
    const filteredData = filterData(filterConfig, accountsData)
    setFilteredData(filteredData)
  }, [accountsData, filterConfig])
  
  return (
      <PresentationContainer>
        {
          isLoading ? (
            <SpinnerOverlay>
              <Spinner/>
            </SpinnerOverlay>
          ) : accountsData !== null && (
            <>
              {
                accountsData.length > 0  
                ? (
                  <>
                    <Filter filterConfig={filterConfig} dispatch={dispatch}/>
                    <Table filteredData={filteredData}/>
                  </>
                ) : (
                <NoDataHeading>No data to display</NoDataHeading>
                )
              }
            </>
          )
        }
    </PresentationContainer>
  )
}

const PresentationContainer = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  min-height: 50vh;
  padding: .75rem;
  box-sizing: border-box;
`

const SpinnerOverlay = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Spinner = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
  border: 10px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`

export const NoDataHeading = styled.h2`
  font-size: 1.25rem;
  margin-top: 2em;
  text-align: center;
`
