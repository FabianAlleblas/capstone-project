const baseUrl = 'http://urbanplants.local/plant'

export default async function getPlants() {
  try {
    const response = await fetch(baseUrl)
    const data = await response.json()
    return await data
  } catch (error) {
    return { error: 'The server is down! :(' }
  }
}
