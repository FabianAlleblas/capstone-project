import { Route, Switch } from 'react-router-dom'
import PlantListPage from './plantlistpage/PlantListPage'
import AddPlantForm from './components/forms/AddPlantForm'

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <PlantListPage />
      </Route>
      <Route path="/form">
        <AddPlantForm />
      </Route>
    </Switch>
  )
}

export default App
