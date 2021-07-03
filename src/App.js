// import Index from './Table';
import './App.css'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Index from './Components/Cat/Index';
import Gate from './Components/Prod/Gate';
import Modl from './Components/Prod/Modal';
// import Index from './Cate/index'
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <div >
        <Switch >
          {/* <div className="pages"> */}
          <Route  exact path="/" > 
          
          <Gate/>
              </Route>
          {/* </div> */}
          
          <Route path="/Add Product">
            {/* <Form/> */}
            <Modl/>
            
      {/* <Main /> */}
          </Route>
          <Route path="/categories">
            <Index />
          </Route>
        </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
