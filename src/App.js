import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'

function App() {
  return (
    <Router>
      <Navbar />
      <svg> {/* <svg> tag is to supress "This tab <> is unrecognized in this browser" warning in console. */}
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <React.Fragment> {/* Fragment lets us grop a list of children without adding extra nodes to the DOM. Instead of React.Fragment, we can use <></> */}
                  <AddPostForm />
                  <PostsList />
                </React.Fragment>
              )}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </svg>
    </Router>
  )
}

export default App
