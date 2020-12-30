import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './index.css';
import { Home, Header, Footer } from './Home.tsx';

import modules from "./modules/modules.js";
import settings from "./modules/settings.json";

export default settings;

const Routing = () => {  
  let moduleRoutes = [];
  for (let i in modules) {  
    let route = (<Route exact path={"/" + modules[i].module + ((modules[i].parameters) ? modules[i].parameters : "")} component={modules[i].App} />);
    moduleRoutes.push(route);

    for (let j in modules[i].submodules) {
      let submodule = modules[i].submodules[j];
      let route = (<Route exact path={`/${modules[i].module}/${submodule.path}`} component={submodule.App}/>)
      moduleRoutes.push(route);
    }
  }

  return(
    <Router>
        <Header/>
        <div className="outer">
          <Switch>
            <Route exact path="/" component={Home} />
            {moduleRoutes}
          </Switch>
          <Footer />
        </div>
    </Router>
  )
}

function renderEFB() {
  ReactDOM.render(
    <React.StrictMode>
      <Routing />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
renderEFB();
setInterval(renderEFB, 1000);