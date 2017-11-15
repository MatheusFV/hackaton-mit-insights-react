export const objectToArray = object => ({
  map: fn => object ? Object.keys(object).map(key => fn(object[key], key)) : [],
})


export const objectToArray2 = object => Object.keys(object).map(key => ({
  ...object[key],
  key,
}))
