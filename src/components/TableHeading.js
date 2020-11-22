
import styled from  '@emotion/styled'

export default function TableHeading ({name, sortingKey, handler, sortingMethod}) {

  const checkSorting = (direction => {
    if (sortingMethod.field === sortingKey && sortingMethod.direction === direction) return true
    return false
  })

  return (
    <TableHeadingContainer>
      <button onClick={() => handler(sortingKey)}>
        <span>{name}</span>           
        <ArrowsContainer>
          <SortingArrow currentSorting={checkSorting("UP")}>▲</SortingArrow>
          <SortingArrow currentSorting={checkSorting("DOWN")}>▼</SortingArrow>
        </ArrowsContainer>
      </button>
    </TableHeadingContainer>
  )
}

const TableHeadingContainer = styled.th`
  button {
    display: flex;
    font-size: inherit;
    background: var(--black);
    color: var(--white);
    width: 100%;
    white-space: nowrap;
    padding: 0.5rem 1rem;
    border-right: 1px solid rgb(229, 229, 229);
    outline: 0;
  
    :last-child {
      border: 0;
    }
  }
`

const ArrowsContainer = styled.div`
  padding-left: .5em;
`

const SortingArrow = styled.span`
  font-size: .5em;
  display: block;
  font-weight: 700;
  ${({currentSorting}) => currentSorting && 'color: var(--blue);'}
`