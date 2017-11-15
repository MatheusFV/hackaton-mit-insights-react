import axios from 'axios'

export default () => new Promise(async (resolve, reject) => {
  // Implement your own way to build your request
  const request = {}
  axios(request)
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      reject(err)
    })
})
