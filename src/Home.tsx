import React from 'react'
import { Link } from "react-router-dom";
import './Home.css';
import HomeIcon from './assets/home.svg'
import { AppIcon } from './AppIcon'
import modules from "./modules/modules.js";

export const Header: React.FC = () => {
var date = new Date();
var hours = date.getUTCHours();
var minutes = date.getUTCMinutes();
return (
  <header className="header">
    <div className="row">
      <div className="header-column span-left">
        <p className="header-text">flyPad</p>
      </div>
      <div className="header-column span-center">
        <p className="header-text">{hours > 9 ? hours : "0"+hours}:{minutes > 9 ? minutes : "0"+minutes}z</p>
      </div>
      <div className="header-column span-right">
        <p className="header-text">Horizon Wireless</p>
        <p className="header-text">100%</p>
      </div>
    </div> 
  </header>);
}

export const Footer: React.FC = () => {
return (
  <footer className="footer">
    <span>
      <Link to="/"><img className="footer-icon" src={HomeIcon} alt="tbd"></img></Link>
    </span>
  </footer>);
}

export class Home extends React.Component {
  scriptLoaded() {
    
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = `${process.env.PUBLIC_URL}/lib/flickity.pkgd.min.js`;
    script.async = true;
    script.onload = () => this.scriptLoaded();
  
    document.body.appendChild(script);
  }
  
  render() {
    let homeIcons = [];
    for (let i in modules) {
      let route = (<AppIcon moduleName={modules[i].module} />)
      homeIcons.push(route);
    }

    let iconsPerPage = 20;
    let homeIconsStructured = [];
    for (let i = 0; i < Math.ceil(homeIcons.length / iconsPerPage); i++) {
      let page = [];
      for (let j = 0; j < iconsPerPage; j++) {
        page.push(homeIcons[i * iconsPerPage + j]);
      }
      homeIconsStructured.push(page);
    }

    let pages = [];
    for (let i in homeIconsStructured) {
      let page = <div className="gallery-cell grid-container">{homeIconsStructured[i]}</div>
      pages.push(page);
    }
  
    return (
    <div className="Home">
      <div className="content">
        <div className="js-flickity fullscreen">
          {pages}
        </div>
      </div>
    </div>);
  }
}

export default Home;