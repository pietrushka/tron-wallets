import styled from  '@emotion/styled'
import { useEffect, useState } from 'react'

import sortData from '../lib/sortData'
import TableHeading from './TableHeading'
import {NoDataHeading} from './Presentation'

export default function Table ({filteredData}) {
  const [sortingMethod, setSortingMethod] = useState({field: 'default', direction: null})
  const [sortedData, setSortedData] = useState(null)

  useEffect(() => {
    const newSortedData = sortData(sortingMethod, filteredData)
  
    setSortedData(newSortedData)
  }, [filteredData, sortingMethod])
  
  const handleSorting = (field) => {
    if(field === sortingMethod.field) {
      setSortingMethod({
        field,
        direction: sortingMethod.direction === 'UP' ? 'DOWN' : 'UP'
      })
    } else {
      setSortingMethod({
        field,
        direction: 'UP'
      })
    }
  }

  return (
    <>
      {
        sortedData === null || sortedData.length === 0 
        ? (
          <NoDataHeading>There is nothing to display</NoDataHeading>
        ) 
        : (
          <TableContainer>
          <StyledTable>
            <TableHead>
              <tr>
                <TableHeading 
                  name='Address'
                  sortingKey='address' 
                  handler={handleSorting} 
                  sortingMethod={sortingMethod}
                />
                <TableHeading 
                  name='Balance' 
                  sortingKey='balance'
                  handler={handleSorting} 
                  sortingMethod={sortingMethod}
                />
                <TableHeading 
                  name='Created at' 
                  sortingKey='create_time'
                  handler={handleSorting} 
                  sortingMethod={sortingMethod}
                />
                <TableHeading 
                  name='Last operation' 
                  sortingKey='latest_opration_time'
                  handler={handleSorting} 
                  sortingMethod={sortingMethod}
                />
              </tr>
            </TableHead>
              <tbody>
                {
                  sortedData.map(({address, balance, create_time, latest_opration_time}, idx) => (
                    <TableRow key={idx} index={idx}>
                      <TableData >{address}</TableData >
                      <TableData >{balance} TRX</TableData >
                      <TableData >{new Intl.DateTimeFormat('en-GB').format(create_time)}</TableData >
                      <TableData >{new Intl.DateTimeFormat('en-GB').format(latest_opration_time)}</TableData >
                    </TableRow>
                  ))
                }
              </tbody>
            </StyledTable>
          </TableContainer>
        )
      }
    </>
  )
}

const TableContainer = styled.div`
  overflow-x: auto;
  margin: 1rem auto;
`

const StyledTable = styled.table`
  margin: 0 auto;
  border-spacing: 0;
  text-align: left;
  border-spacing: 0;
  font-size: 1rem;

  @media (min-width: 925px) {
    font-size: 1.25rem;
  }
`

const TableHead = styled.thead`
  font-weight: 700;
`

const TableRow = styled.tr`
  ${({index}) => (index + 1) % 2 === 0 && 'background: rgb(243, 243, 243);'}
`

const TableData = styled.td`
  padding: 0.5rem 1rem;
  border-right: 1px solid rgb(229, 229, 229);
  
  :last-child {
    border: 0;
  }
`
