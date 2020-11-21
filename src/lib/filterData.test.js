import filterData from './filterData'

describe('filterData', () => {
  test('Does not filter if there is no filtering methods', () => {
    const arr = [
      {address: 'g43g3'},
      {address: '1agsaa'},
      {address: 'hrehw23'},
      {address: 'aaa3tegds'}
    ]
    const filteredArr = filterData(
      {
        address: '',
        balance: {min: null, max: null},
        create_time: {min: null, max: null},
        latest_opration_time: {min: null, max: null}
      }, 
      arr
    )

    expect(filteredArr).toStrictEqual([
      {address: 'g43g3'},
      {address: '1agsaa'},
      {address: 'hrehw23'},
      {address: 'aaa3tegds'}
    ])
  })

  test('Filtering by characters in address', () => {
    const arr = [
      {address: 'g43g3'},
      {address: '1agsaaa'},
      {address: 'hrehw23'},
      {address: 'aaa3tegds'}
    ]
    const filteredArr = filterData(
      {
        address: 'aaa',
        balance: {min: null, max: null},
        create_time: {min: null, max: null},
        latest_opration_time: {min: null, max: null}
      }, 
      arr
    )

    expect(filteredArr).toStrictEqual([
      {address: '1agsaaa'},
      {address: 'aaa3tegds'}
    ])
  })

  test('Filtering by characters in address', () => {
    const arr = [
      {address: 'g43g3'},
      {address: '1agsaaa'},
      {address: 'hrehw23'},
      {address: 'aaa3tegds'}
    ]
    const filteredArr = filterData(
      {
        address: 'aaa',
        balance: {min: null, max: null},
        create_time: {min: null, max: null},
        latest_opration_time: {min: null, max: null}
      }, 
      arr
    )

    expect(filteredArr).toStrictEqual([
      {address: '1agsaaa'},
      {address: 'aaa3tegds'}
    ])
  })

  test('Filtering by numbers in balance', () => {
    const arr = [
      {balance: 50},
      {balance: 150},
      {balance: 250},
      {balance: 200},
      {balance: 100}
    ]
    const filteredArr = filterData(
      {
        address: '',
        balance: {min: 100, max: 200},
        create_time: {min: null, max: null},
        latest_opration_time: {min: null, max: null}
      }, 
      arr
    )

    expect(filteredArr).toStrictEqual([
      {balance: 150},
      {balance: 200},
      {balance: 100}
    ])
  })
})