import * as React from 'react';
import "./style.css";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class App extends React.Component {
    path: String = "/arachne";
    url: any = "https://flybywiresim.com";

    handleSubmit(event: any) {
        event.preventDefault();
        var url = event.target.url.value;
        url = (url.startsWith("https://")) ? url : "https://" + url;
        // this.url = url;
        console.log(url);
        var viewport = document.getElementById("viewport");
        viewport?.setAttribute("data", url);
    }

    render() {
        var url = this.url;
        return (
            <div className="app-content" >
                Airport Information
            </div>
        )
      }
}


// const Arachne: React.FC = ({}) => {
//   const [url, setURL] = React.useState<String>();

//   return (
//         <div className="app-content" >
//             <div className="full-width app-header">
//                 <input id="urlbar" type="text" className="input" value="https://wikipedia.com" onChange={event => setURL(event.target.value)} onKeyDown={(event) => {
//                     console.log(event.key);
//                     if (event.key == "Enter") {
//                         event.preventDefault();
//                         let viewport = document.getElementById("viewport");
//                         let urlbar = document.getElementById("urlbar");
//                         console.log(viewport, urlbar);
//                         // viewport?.setAttribute("src", url);
//                         // document.getElementById("viewport").src = document.getElementById("urlbar").value;
//                         // document.getElementById("viewport").contentWindow.history.go(-1); // back
//                     }
//                 }}></input>
//             </div>
//             <embed id="viewport" type="text/html" src="https://wikipedia.com" className="fullscreen">
//             </embed>
//         </div>
//     );
// }

// export default App;
