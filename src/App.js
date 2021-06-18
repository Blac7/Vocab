import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

// importing components for routing
import Words from './components/Words'
import SearchWords from './components/SearchWords'

// importing redux funcs and components
import store from './redux/Store'

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Words} />
            <Route path='/search' exact component={SearchWords} />
            <Route path='/search/:name' exact component={SearchWords} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App

