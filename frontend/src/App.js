import { Route, Switch } from 'react-router-dom'
import usePlantList from './hooks/usePlantList'
import AddPage from './Pages/Addpage/AddPage'
import EditPage from './Pages/Editpage/EditPage'
import DetailPage from './Pages/DetailPage/DetailPage'
import PlantListPage from './Pages/Plantlistpage/PlantListPage'
import LoginPage from './Pages/Loginpage/LoginPage'

function App() {
  const {
    plantList,
    savePlantData,
    updatePlantData,
    deletePlantData,
    resetCareTimer,
  } = usePlantList()

  if (!plantList) {
    return <div>loading...</div>
  }

  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/">
        <PlantListPage plantList={plantList} />
      </Route>
      <Route path="/plant">
        <DetailPage plantList={plantList} resetTimer={resetCareTimer} />
      </Route>
      <Route path="/addplant">
        <AddPage savePlantData={savePlantData} />
      </Route>
      <Route path="/edit">
        <EditPage
          updatePlantData={updatePlantData}
          deletePlantData={deletePlantData}
          plantList={plantList}
        />
      </Route>
    </Switch>
  )
}

export default App
