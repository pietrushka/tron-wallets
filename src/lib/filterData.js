export default function filterData (filterConfig, data) {

  const {address, balance, create_time, latest_opration_time} = filterConfig
  let newData = [...data]
  
  //address
  newData = filterByCharacters(address, newData)
  
  //balance
  newData = filterByNumbers('balance', balance, newData)
  
  //create_time
  newData = filterByDates('create_time', create_time, newData)
 
  //latest_opration_time'
  newData = filterByDates('latest_opration_time', latest_opration_time, newData)
  
  return newData
}

const filterByCharacters = (filterParameter, data) => {
  if(filterParameter === '') return data

  const filteredData = data.filter(dataItem => dataItem.address.includes(filterParameter))
  return filteredData 
}

const filterByNumbers = (filterKey, filterParameter, data) => {
  if(filterParameter.min === null && filterParameter.max === null) return data

  if(filterParameter.min && filterParameter.max === null) {
    const filteredData = data.filter(dataItem => dataItem[filterKey] >= filterParameter.min)
    return filteredData
  }

  if (filterParameter.min === null && filterParameter.max) {
    const filteredData = data.filter(dataItem => dataItem[filterKey] <= filterParameter.max)
    return filteredData
  }

  const filteredData = data.filter(dataItem => {
    return dataItem[filterKey] >= filterParameter.min && dataItem[filterKey] <= filterParameter.max
  })
  
  return filteredData
}

const filterByDates = (filterKey, filterParameter, data) => {

  if(filterParameter.min === null && filterParameter.max === null) return data

  if(filterParameter.min && filterParameter.max === null) {
    const filteredData = data.filter(dataItem => dataItem[filterKey] >= filterParameter.min)
    return filteredData
  }

  if (filterParameter.min === null && filterParameter.max) {
    const filteredData = data.filter(dataItem => dataItem[filterKey] <= filterParameter.max)
    return filteredData
  }

  if (filterParameter.min && filterParameter.max) {
    const filteredData = data.filter(dataItem => {
      return dataItem[filterKey] >= filterParameter.min && dataItem[filterKey] <= filterParameter.max
    })
    return filteredData
  }
}

