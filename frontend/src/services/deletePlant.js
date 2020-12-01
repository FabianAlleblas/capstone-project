const baseUrl = 'http://urbanplants.local/plant'

export default async function deletePlant(id) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

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
