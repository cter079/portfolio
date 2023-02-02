
import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import ProjectList from './projectList';
import './nav.css'

document.title = "Project List";
document.querySelector("link[rel*='icon']").href = "";
  
class App extends Component {
  render() {
    return (
       <Router>
           <nav  aria-label="nav bar with 2 options" className="App">
            <ul className="App-header">
              <li aria-label='homepage'>
                <Link to="#">Home</Link>
              </li>
              <li aria-label='todo-list'>
                <Link to="/projects">Projects</Link>
              
              </li>
            </ul>
           
          </nav>
          <Routes>
                 <Route exact path='/projects' element={< ProjectList />}></Route>
          </Routes>
       </Router>
   );
  }
}
  
export default App;