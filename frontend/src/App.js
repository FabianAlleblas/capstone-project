import { Route, Switch } from 'react-router-dom'
import usePlantList from './hooks/usePlantList'
import useUserAccess from './hooks/useUserAccess'
import AddPage from './Pages/Addpage/AddPage'
import DetailPage from './Pages/DetailPage/DetailPage'
import EditPage from './Pages/Editpage/EditPage'
import LoginPage from './Pages/Loginpage/LoginPage'
import PlantListPage from './Pages/Plantlistpage/PlantListPage'

function App() {
  const { userData, userLogin, userRegistration, userLogout } = useUserAccess()

  const {
    plantList,
    savePlantData,
    updatePlantData,
    deletePlantData,
    resetCareTimer,
  } = usePlantList(userData)

  if (!userData?.authorized || plantList === false) {
    return (
      <LoginPage userRegistration={userRegistration} userLogin={userLogin} />
    )
  }

  if (plantList === undefined) {
    return <div>loading...</div>
  }

  return (
    <Switch>
      <Route exact path="/">
        <PlantListPage plantList={plantList} userLogout={userLogout} />
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
