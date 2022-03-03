// React router
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";


// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";


function App() {
  return (
    <Router>
      {/*Main nav */}
      <main>
        <Switch>
          <Route path="/" exact>
            <Home></Home>
          </Route>
          <Route path="/login" exact>
            <Login></Login>
          </Route>
          <Route path="/Signup" exact>
            <Signup></Signup>
          </Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
