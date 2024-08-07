import './App.scss'
import {AppContainer} from './containers'
import {Intro, Resume, Work, Contact} from './components'
import {} from './components'

function App() {


  return (
    <div className="App">
      <AppContainer />
        <Intro />
        <Resume />
        <Work />
        <Contact />
    </div>
  )
}

export default App
