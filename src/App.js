import {BrowserRouter as Router,Route,Switch} from "react-router-dom"; 
import Hello from './components/hello';
import Confirm from './components/confirm';
import Login from "./components/login";
// import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router >
      <Switch>
        <Route exact path="/" component={Hello}/>
        <Route exact path="/confirm" component={Confirm}/>
        <Route exact path="/login" component={Login}/>
        {/* <Route exact path="/dashboard" component={Dashboard}/> */}


      </Switch>

     
    </Router>
  );
}

export default App;
