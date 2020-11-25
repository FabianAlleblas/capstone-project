import { Route, Switch } from 'react-router-dom'
import PlantListPage from './plantlistpage/PlantListPage'
import AddPage from './addpage/AddPage'
import usePlantList from './hooks/usePlantList'

function App() {
  const { plantList, savePlantData } = usePlantList()

  return (
    <Switch>
      <Route exact path="/">
        <PlantListPage plantList={plantList} />
      </Route>
      <Route path="/form">
        <AddPage savePlantData={savePlantData} />
      </Route>
    </Switch>
  )
}

export default App
