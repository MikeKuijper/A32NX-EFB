const fs = require("fs");
const { stringify } = require("querystring");


fs.readdir("./", (error, files) => {
    if (error) console.error(error);

    var directories = [];

    for (let i = 0; i < files.length; i++) {
        if (!files[i].includes('.')) {
            directories.push(files[i]);
        }
    }

    let modules = [];
    let settings = JSON.parse(fs.readFileSync("globalSettings.json"));
    let data = "";
    for (let i in directories) {
        let configRaw = fs.readFileSync(`../../public/modules/${directories[i]}/config.json`);
        let config = JSON.parse(configRaw);

        data += `const ${directories[i]} = require("./${config.id}/").App;\n`;

        console.log(`Compiling ${directories[i]}`);

        let submodules = [];
        for (let i in config.paths) {
            let pascalCaseID = config.paths[i].id.charAt(0).toUpperCase() + config.paths[i].id.slice(1);
            data += `const ${config.id}${pascalCaseID} = require("./${config.id}${(!config.paths[i].path.startsWith(".")) ? config.paths[i].path : config.paths[i].path.substring(1)}").App;\n`;
            submodules.push({
                path: config.paths[i].id,
                module: `${config.id}${pascalCaseID}`
            });
            console.log(`Compiling ${config.id}/${config.paths[i].id}`);
        }
        let moduleSettings = [];
        for (let i in config.settings) {
            moduleSettings.push(config.settings[i]);
        }
        if (moduleSettings.length > 0) settings.categories.push({ id: config.id, name: config.name, settings: moduleSettings });
        modules.push({ module: config.id, submodules: submodules, parameters: config.parameters});
    }

    data += "\nexport const modules = ["

    for (let i in modules) {
      data += "{App: "
      data += modules[i].module;
      data += `, submodules: [`;
      if (modules[i].submodules.length == 0) data += `], `;
      for (let j in modules[i].submodules) {
          let submodule = modules[i].submodules[j];
        data += `{path: "${submodule.path}", module: "${submodule.module}", App: ${submodule.module}}`
        data += (j == modules[i].submodules.length - 1) ? "], " : ", ";
      }

      data += `module: "${modules[i].module}", parameters: ${JSON.stringify(modules[i].parameters)}`;
      data += "}";
      data += (i == modules.length - 1) ? "" : ", ";
    }

    data += "];\n\n"

    console.log(settings);

    fs.writeFile("settings.json", JSON.stringify(settings), {}, (error) => {
        if (error) console.error(error);
        else console.log("Succesfully compiled settings.json");
    })

    data += "\nexport default modules;"


    fs.writeFile("modules.js", data, {}, (error) => {
        if (error) console.error(error);
        else console.log("Succesfully compiled modules.js");
    });
});