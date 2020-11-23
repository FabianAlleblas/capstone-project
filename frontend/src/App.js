import { Route, Switch } from 'react-router-dom'
import PlantListPage from './plantlistpage/PlantListPage'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <PlantListPage />
        </Route>
      </Switch>
    </div>
  )
}

export default App
