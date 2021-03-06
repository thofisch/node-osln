const settings = require("./../utils/settings.js");

module.exports = {

    execute: function(commandName, commandArgs) {
        const localVersion = settings.getVersion();

        console.log(`Local version: ${localVersion}`);

        if (commandArgs.check) {
            const http = require("https");
            http.get(`https://registry.npmjs.org/osln`, response => {

                let body = "";

                response.on("data", txt => {
                    body += txt;
                });

                response.on("end", () => {
                    const onlineInfo = JSON.parse(body);
                    const onlineVersion = onlineInfo["dist-tags"].latest;

                    console.log(`Online version: ${onlineVersion}`);
                    console.log();

                    if (localVersion === onlineVersion) {
                        console.log("Up to date - you have the latest version!");
                    } else {
                        console.log(`A newer version is available online. Make sure to update by typing "npm update -g ${settings.getName()}".`);
                    }

                });
            });
        }
    },
    getHelp: function () {
        return {
            name: "version",
            description: `Show information about your version of ${settings.getName()}.`,
            args: [
                {
                    short: "",
                    long: "check",
                    description: "Check to see if you have the latest version. Compares local version with the version available online."
                }
            ]
        };
    }
};