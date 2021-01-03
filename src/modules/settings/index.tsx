import * as React from 'react';
import { BrowserRouter as Router, Link, RouteComponentProps } from "react-router-dom";
import "./style.css";

import settingsConfig from "../../index";

interface propertyProps {
    "id"?: string,
    "name"?: String,
    "type"?: String,
    "value"?: any,
    "onChange"?: (e: any) => void,
    "onClick"?: (e: any) => void
}

interface menuEntryProps {
    "name": string,
    "isActive"?: boolean,
    "url"?: string
}

export const Property: React.FC<propertyProps> = ({id, name, type, value, onChange, onClick}) => {
    Router.bind(this); // fixes @typescript-eslint/no-unused-vars
    if (type) {
        switch (type) {
            default:
                return (
                    <div className="row">
                        <div className="settings-property-column-left">
                            <p className="settings-description-text">{name}</p>
                        </div>
                        <div className="settings-property-column-right">
                            <div className="settings-container">
                                <input id={id} type="text" className="settings-input" value={value} onChange={onChange} onClick={onClick}></input>
                            </div>
                        </div>
                    </div>);
            case "button-full-width":
                return (<div className="row">
                        <div className="full-width">
                            <div className="settings-container">
                                <button id={id} className="settings-button" onChange={onChange} onClick={onClick}>{name}</button>
                            </div>
                        </div>
                    </div>);
            case "information":
                return (<div className="row">
                            <div className="settings-property-column-left">
                                <p className="settings-description-text">{name}</p>
                            </div>
                            <div className="settings-property-column-right">
                                <div className="settings-container no-padding">
                                    <p className="settings-text" onClick={onClick}>{value}</p>
                                </div>
                            </div>
                        </div>);
            case "boolean":
                return (<div className="row">
                            <div className="settings-property-column-left">
                                <p className="settings-description-text">{name}</p>
                            </div>
                            <div className="settings-property-column-right">
                                <div className="settings-container">
                                    <input id={id} type="checkbox" className="settings-checkbox" checked={value} onChange={onChange} onClick={onChange}></input>
                                </div>
                            </div>
                        </div>);
        }
    } else {
        return (
            <div className="row">
                <div className="settings-property-column-left">
                    <p className="settings-description-text">{name}</p>
                </div>
                <div className="settings-property-column-right">
                    <a href="#outer">{value}</a>
                </div>
            </div>
        );
    }
}

export const MenuEntry: React.FC<menuEntryProps> = ({name, isActive, url}) => {
    return (
        <Link to={(url) ? url : "#"}><a href="#outer" className={(isActive) ? "active" : ""}>{name}</a></Link>
    );
}


interface settingsFormProps {
    page: string
}

interface settingsFormState {
    settings: any
}

export class SettingsForm extends React.Component<settingsFormProps, settingsFormState> {
    props: settingsFormProps;
    
    constructor (props: settingsFormProps) {
        super (props);
        this.props = props;

        let settings = settingsConfig.categories.find((element) => { return element.id === props.page })?.settings;
        this.state = {
            settings: settings
        }
    }

    public handleChange = (e: any) : void => {
        if(e.target.type === "checkbox") settingsConfig.categories[globalPageID].settings[e.target.id].value = e.target.checked;
        else settingsConfig.categories[globalPageID].settings[e.target.id].value = e.target.value;
        this.setState({});
    }

    render() {
        let settings = [];
        for (let i in settingsConfig.categories[globalPageID].settings) {
            let setting = settingsConfig.categories[globalPageID].settings[parseInt(i)];
            let prop = <Property id={i} name={setting.name} value={setting.value} type={setting.type} onChange={this.handleChange}/>;
            settings.push(prop);
        }

        return (
            <div className="settings">
                {settings}
                <Property name="Apply changes" type="button-full-width" onClick={() => {console.log("click")}}/>
            </div>
        )
    }
}


interface appProps extends RouteComponentProps {
    
}

interface appState {

}

let globalPageID: number;
export class App extends React.Component<appProps, appState> {
    render() {
        const page = (this.props.match.params as any).page || "general";
        const pageID = settingsConfig.categories.findIndex((element) => { return element.id === page });
        globalPageID = pageID;

        let menuEntries = [];
        for (let i in settingsConfig.categories) {
            let menuEntry = <MenuEntry name={settingsConfig.categories[i].name} url={`/settings/${settingsConfig.categories[i].id}`} isActive={settingsConfig.categories[i].id === page}></MenuEntry>;
            menuEntries.push(menuEntry);
        }

        return (
            <div className="app-content settings-content" >
                <div className="full-width settings-app-header">
                    <p className="settings-title">Settings</p>
                </div>
                <div className="fullscreen">
                    <div className="row">
                        <div className="settings-column-left">
                            <div className="settings-vertical-menu">
                                {menuEntries}
                            </div>
                        </div>
                        <div className="settings-column-right">
                            <SettingsForm page={page}></SettingsForm>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}