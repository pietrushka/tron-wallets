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
  const newValidAddresses = [...validAddresses]
  let data = []

  // resolves up to 6 promises, prevents from api error 
  for (let i = newValidAddresses.length; i > 0; i -= 6) {
    const addressesToHandle = newValidAddresses.splice(0, 6)
    const requests = addressesToHandle.map(async (address) => {
      let body = JSON.stringify({address, visible: true})
      const {data} = await axios.post('https://api.trongrid.io/wallet/getaccount', body)
      const {balance, create_time, latest_opration_time} = data 
      return {
        address, 
        balance, 
        create_time: formatDate(create_time), 
        latest_opration_time: formatDate(latest_opration_time)
      }
    })

    try {
      await Promise.all(requests).then((values) => {
        data = [...data, ...values]
      })
    } catch (err) {
      console.error(err)
    }
  }

  return data
}

const formatDate = (data) => {
  const date = new Date(data)
  const dateString = date.toLocaleDateString('en-EN')
  return dateString
}