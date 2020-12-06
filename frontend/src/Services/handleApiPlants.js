const baseUrl = 'http://urbanplants.local/plant'

export async function getPlants(userData) {
  if (userData?.authorized) {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', `Bearer ${userData.currentToken}`)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }
    try {
      const response = await fetch(baseUrl, requestOptions)
      const data = await response.json()
      return await data
    } catch (error) {
      return { error: 'The server is down! :(' }
    }
  }
}

export async function postPlant(formData, userData) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${userData.currentToken}`)
  const copy = Object.assign({}, formData)

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

export async function updatePlant(formData, id, userData) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${userData.currentToken}`)
  const copy = Object.assign({}, formData)

  const raw = JSON.stringify(copy)
  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }
  try {
    const response = await fetch(`${baseUrl}/${id}`, requestOptions)
    const responseData = response.json()
    return responseData
  } catch (error) {
    return { error: 'The server is down! :(' }
  }
}

export async function deletePlant(id, userData) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${userData.currentToken}`)

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  }
  try {
    const response = await fetch(`${baseUrl}/${id}`, requestOptions)
    const responseData = response.json()
    return responseData
  } catch (error) {
    return { error: 'The server is down! :(' }
  }
}

export async function resetTimer(id, type, userData) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${userData.currentToken}`)

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    redirect: 'follow',
  }
  try {
    const response = await fetch(`${baseUrl}/${id}/${type}`, requestOptions)
    const responseData = response.json()
    return responseData
  } catch (error) {
    return { error: 'The server is down! :(' }
  }
}
