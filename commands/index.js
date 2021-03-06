const settings = require("./../utils/settings.js");

module.exports = function(commandName, commandArgs) {
    switch (commandName) {
        case "open":
            const cmd = require("./open.js");
            cmd.execute(commandName, commandArgs);
            break;
        case "list":
            const list = require("./list.js");
            list.execute(commandName, commandArgs);

            break;
        case "help":
            const helper = require("./help.js");

            helper.execute(commandName, commandArgs, 
                [
                    require("./open.js").getHelp(),
                    require("./list.js").getHelp(),
                    require("./version.js").getHelp(),
                ]
            );

            break;
        case "version":
            const version = require("./version.js");
            version.execute(commandName, commandArgs);

            break;
        default:
            console.log(`Unknown command "${commandName}"`);
            console.log(`Try "${settings.getName()} help" for more information about available commands.`)
    }
};