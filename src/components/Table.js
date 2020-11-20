import {css} from  '@emotion/react'
import styled from  '@emotion/styled'

import { useAddress } from '../hooks/useAddress'

export default function Table () {
  const {accountsData} = useAddress()

  if(accountsData.length === 0) return (
    <h2>NO DATA TO DISPLAY</h2>
  )
  
  return (
    <TableContainer>

      <StyledTable>
        <TableHead>
          <tr>
            <TableHeading>Address</TableHeading>
            <TableHeading>Balance</TableHeading>
            <TableHeading>Created at</TableHeading>
            <TableHeading>Last operation</TableHeading>
          </tr>
        </TableHead>
        <tbody>
          {
            accountsData.map(({address, balance, create_time, latest_opration_time}, idx) => (
              <TableRow key={idx} index={idx}>
                <TableData >{address}</TableData >
                <TableData >{balance}</TableData >
                <TableData >{create_time}</TableData >
                <TableData >{latest_opration_time}</TableData >
              </TableRow>
            ))
          }
        </tbody>
      </StyledTable>
    </TableContainer>
  )
}

const CellStyles = css`
  padding: 0.5rem 1rem;
  border-right: 1px solid rgb(229, 229, 229);
  
  :last-child {
    border: 0;
  }
`

const TableContainer = styled.div`
  overflow-x: auto;
  width: 90%;
  margin: 2rem auto;
`

const StyledTable = styled.table`
  margin: 0 auto;
  border-spacing: 0;
  text-align: left;
  border-spacing: 0;
`

const TableHead = styled.thead`
  background: var(--black);
  color: var(--white);
  font-weight: 700;
`
const TableHeading = styled.th`
  ${CellStyles}
  white-space: nowrap;
`

const TableRow = styled.tr`
  ${({index}) => (index + 1) % 2 === 0 && 'background: rgb(243, 243, 243);'}
`

const TableData = styled.td`
  ${CellStyles}
`
