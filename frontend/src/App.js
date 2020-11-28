import { Route } from 'react-router-dom'
import usePlantList from './hooks/usePlantList'
import AddPage from './Pages/Addpage/AddPage'
import DetailPage from './Pages/DetailPage/DetailPage'
import PlantListPage from './Pages/Plantlistpage/PlantListPage'

function App() {
  const { plantList, savePlantData } = usePlantList()

  return (
    <>
      <Route exact path="/">
        <PlantListPage plantList={plantList} />
      </Route>
      <Route path="/plant">
        <DetailPage plantList={plantList} />
      </Route>
      <Route path="/addplant">
        <AddPage savePlantData={savePlantData} />
      </Route>
    </>
  )
}

export default App
