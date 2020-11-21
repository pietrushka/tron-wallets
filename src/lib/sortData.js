export default function sortData (sortingMethod, data) {
  const dataCopy = [...data]

  switch (sortingMethod.field) {
    case 'address':
      const sortedByAddress = sortByField('address', sortingMethod.direction, dataCopy)
      return sortedByAddress
      
    case 'balance':
      const sortedByBalance = sortByField('balance', sortingMethod.direction, dataCopy)
      return sortedByBalance

    case 'create_time':
      const sortedByCreateTime = sortByField('create_time', sortingMethod.direction, dataCopy)
      return sortedByCreateTime

    case 'latest_opration_time':
      const sortedByLatestOperation = sortByField('latest_opration_time', sortingMethod.direction, dataCopy)
      return sortedByLatestOperation
    
    default:
      return dataCopy
  }
}

const sortByField = (field, direction, data) => {
  if (direction === 'UP') {
    const sortedData = data.sort((a, b) => {
      if (a[field] < b[field]) return -1
      if (a[field] > b[field]) return 1
      return 0;
    })

    return sortedData
  } else {
    const sortedData = data.sort((a, b) => {
      if (a[field] < b[field]) return 1
      if (a[field] > b[field]) return -1
      return 0;
    })
    
    return sortedData
  }
}