import React from 'react';
// import { Image } from 'react-native';
import { Link } from "react-router-dom";
import './Home.css';  
//const fs = require("fs");
// const Logo = require('./assets/logo.png');

interface Props {
  "moduleName" : string;
}

export const AppIcon: React.FC<Props> = ({moduleName}) => {
  let config = require(`../public/modules/${moduleName}/config.json`);
  //let index = require(`./modules/${moduleName}/src/index.tsx`);

  return (
    <div className="app-icon">
      <Link to={`/${moduleName}`} style={{ textDecoration: 'none' }}>
        <img src={`${process.env.PUBLIC_URL}/modules/${moduleName}/${config.logo}`} className="app-icon-img" alt={`${moduleName} logo`}/>
        <p className="app-icon-name">{config.name}</p>
      </Link>
    </div>
  );
}