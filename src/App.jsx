import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Router1 from './RouterStudy/Router1/Router1';

import Index from './TodoList/pages';
import Router2 from './RouterStudy/Router2/Router2';
import Router3 from './RouterStudy/Router3/Router3';
import Router4 from './RouterStudy/Router4/Router4';
import MainRouter from './Auth/Routers/MainRouter';

function App() {

  return <BrowserRouter>

    {/* <Index /> */}
    {/* <Router1 /> */}
    {/* <Router2 /> */}
    {/* <Router3 /> */}
    {/* <Router4 /> */}
    <MainRouter />
  </BrowserRouter>
}

export default App;