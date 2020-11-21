import axios from 'axios'

export const checkIsAddressValid = async (address) => {
  try {
    let body = JSON.stringify({address})
    const res = await axios.post('https://api.trongrid.io/wallet/validateaddress', body)
    return res.data.result
  } catch (err) {
    console.error(err.message)
    return null
  }
  //returns boolean or null
}

export const getData = async (validAddresses) => {
  let data = []

  const reqApi = async (address) => {
    const body = await JSON.stringify({address, visible: true})
    const res = await axios.post('https://api.trongrid.io/wallet/getaccount', body)
    const {balance, create_time, latest_opration_time} = res.data 
    const resData = {address, balance, create_time, latest_opration_time}
    if(resData.balance === undefined) resData.balance = 0
    return resData
  }

  const requests = validAddresses.map((address) => reqApi(address))

  try {
    await Promise.all(requests).then((values) => {
      data = [...data, ...values]
    })
  } catch (err) {
      console.error(err)
  }
  
  return data
}

