const baseUrl = 'http://urbanplants.local/plant'

export default async function getData() {
  const response = await fetch(baseUrl)
  const data = response.json()
  return data
}
