const baseUrl = 'http://urbanplants.local/plant'

export default async function getData() {
  try {
    const response = await fetch(baseUrl)
    const data = response.json()
    return data
  } catch (error) {
    return { error: 'The server is down! :(' }
  }
}
