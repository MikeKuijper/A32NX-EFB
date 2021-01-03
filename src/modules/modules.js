const airportinfo = require("./airportinfo/").App;
const arachne = require("./arachne/").App;
const performance = require("./performance/").App;
const settings = require("./settings/").App;
const template = require("./template/").App;

export const modules = [{App: airportinfo, submodules: [], module: "airportinfo", parameters: undefined}, {App: arachne, submodules: [], module: "arachne", parameters: undefined}, {App: performance, submodules: [], module: "performance", parameters: undefined}, {App: settings, submodules: [], module: "settings", parameters: "/:page?"}, {App: template, submodules: [], module: "template", parameters: undefined}];


export default modules;