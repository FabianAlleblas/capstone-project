const baseUrl = 'http://urbanplants.local/plant'

export default async function postData(data) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const copy = Object.assign({}, data)

  const raw = JSON.stringify(copy)
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }
  try {
    const response = await fetch(baseUrl, requestOptions)
    const responseData = response.json()
    return responseData
  } catch (error) {
    return { error: 'The server is down! :(' }
  }
}
