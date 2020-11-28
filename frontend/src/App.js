import { Route, Switch } from 'react-router-dom'
import PlantListPage from './Pages/Plantlistpage/PlantListPage'
import AddPage from './Pages/Addpage/AddPage'
import DetailPage from './Pages/DetailPage/DetailPage'
import usePlantList from './hooks/usePlantList'

function App() {
  const { plantList, savePlantData } = usePlantList()

  return (
    <Switch>
      <Route exact path="/">
        <PlantListPage plantList={plantList} />
      </Route>
      <Route path="/plant">
        <DetailPage plantList={plantList} />
      </Route>
      <Route path="/addplant">
        <AddPage savePlantData={savePlantData} />
      </Route>
    </Switch>
  )
}

export default App
