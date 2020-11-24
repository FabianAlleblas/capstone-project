import { Route, Switch } from 'react-router-dom'
import PlantListPage from './plantlistpage/PlantListPage'

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <PlantListPage />
      </Route>
    </Switch>
  )
}

export default App
