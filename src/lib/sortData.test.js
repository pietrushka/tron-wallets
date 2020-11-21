import sortData from './sortData'

describe('sortData', () => {
  test('Does not sort if there is no sorting method', () => {
    const arr = [
      {address: 'g43g3'},
      {address: '1agsaa'},
      {address: 'hrehw23'},
      {address: 'aaa3tegds'}
    ]

    const sortedArr = sortData({field: null, direction: null}, arr)

    expect(sortedArr).toStrictEqual([
      {address: 'g43g3'},
      {address: '1agsaa'},
      {address: 'hrehw23'},
      {address: 'aaa3tegds'}
    ])
  })

  test('sorts by address, direction - UP', () => {
    const arr = [
      {address: 'g43g3'},
      {address: '1agsaa'},
      {address: 'hrehw23'},
      {address: 'aaa3tegds'}
    ]
    const sortedArr = sortData({field: 'address', direction: 'UP'}, arr)
    expect(sortedArr).toStrictEqual([
      {address: '1agsaa'},
      {address: 'aaa3tegds'},
      {address: 'g43g3'},
      {address: 'hrehw23'}
    ])
  })

  test('sorts by address, direction - DOWN', () => {
    const arr = [
      {address: 'g43g3'},
      {address: '1agsaa'},
      {address: 'hrehw23'},
      {address: 'aaa3tegds'}
    ]
    const sortedArr = sortData({field: 'address', direction: 'DOWN'}, arr)
    expect(sortedArr).toStrictEqual([
      {address: 'hrehw23'},
      {address: 'g43g3'},
      {address: 'aaa3tegds'},
      {address: '1agsaa'}
    ])
  })

  test('sorts by balance, direction - UP', () => {
    const arr = [
      {balance: '143265'},
      {balance: '3463463476'},
      {balance: '235235'},
      {balance: '6346346436'}
    ]
    const sortedArr = sortData({field: 'balance', direction: 'UP'}, arr)
    expect(sortedArr).toStrictEqual([
      {balance: '143265'},
      {balance: '235235'},
      {balance: '3463463476'},
      {balance: '6346346436'}
    ])
  })

  test('sorts by balance, direction - DOWN', () => {
    const arr = [
      {balance: '143265'},
      {balance: '3463463476'},
      {balance: '235235'},
      {balance: '6346346436'}
    ]
    const sortedArr = sortData({field: 'balance', direction: 'DOWN'}, arr)
    expect(sortedArr).toStrictEqual([
      {balance: '6346346436'},
      {balance: '3463463476'},
      {balance: '235235'},
      {balance: '143265'}
    ])
  })
})