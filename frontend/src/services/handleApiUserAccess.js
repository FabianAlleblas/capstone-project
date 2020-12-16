const baseUrl = process.env.REACT_APP_API_BASE_URL

export async function signUpUser(data) {
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
    const response = await fetch(`${baseUrl}/user`, requestOptions)
    const responseData = response.json()
    return responseData
  } catch (error) {
    return { error: 'The server is down! :(' }
  }
}

export async function loginUser(data) {
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
    const response = await fetch(`${baseUrl}/login`, requestOptions)
    const responseData = response.json()
    return responseData
  } catch (error) {
    return { error: 'The server is down! :(' }
  }
}
