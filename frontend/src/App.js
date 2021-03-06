import { Route, Switch } from 'react-router-dom'
import usePlantList from './hooks/usePlantList'
import useUserAccess from './hooks/useUserAccess'
import AddPage from './Pages/AddPage/AddPage'
import DetailPage from './Pages/DetailPage/DetailPage'
import EditPage from './Pages/EditPage/EditPage'
import LoadingPage from './Pages/LoadingPage/LoadingPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import PlantListPage from './Pages/PlantListPage/PlantListPage'

function App() {
  const {
    userData,
    userLogin,
    userRegistration,
    userLogout,
    setUserData,
  } = useUserAccess()

  const {
    plantList,
    savePlantData,
    updatePlantData,
    deletePlantData,
    resetCareTimer,
    updateCareInterval,
  } = usePlantList(userData)

  if (!userData?.authorized || plantList?.unauthorized) {
    return (
      <LoginPage
        userRegistration={userRegistration}
        userLogin={userLogin}
        userData={userData}
        setUserData={setUserData}
      />
    )
  }

  if (!plantList) {
    return <LoadingPage />
  }

  return (
    <Switch>
      <Route exact path="/">
        <PlantListPage plantList={plantList} userLogout={userLogout} />
      </Route>
      <Route path="/plant">
        <DetailPage
          plantList={plantList}
          resetTimer={resetCareTimer}
          updateCareInterval={updateCareInterval}
        />
      </Route>
      <Route path="/add-plant">
        <AddPage savePlantData={savePlantData} />
      </Route>
      <Route path="/edit-plant">
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
