const exec = require('child_process').exec;
const fs = require('fs');
const os = require('os');
const path = require('path');
const remote = require('electron').remote;

const DEFAULT_COMMANDS = '{\n    "edit": "__edit__"\n}';
const CommandsFile = path.join(os.homedir(), '.linner-rc.json');
let Commands = {};

function setupDom(){
    const search = document.getElementById('search');

    search.addEventListener('keyup', function(e){
        if (e.key === 'Enter'){
            let query = search.value;

            if (Commands[query]){
                let command = Commands[query];
                if (command === '__edit__'){
                    if (process.platform === 'win32'){
                        command = 'START "" "' + CommandsFile + '"';
                    } else if (process.platform === 'darwin'){
                        command = 'open ' + CommandsFile;
                    } else {
                        command = 'x-terminal-emulator -e "$EDITOR ' + CommandsFile + '"';
                    }
                }
                exec(command);
            }

            remote.getCurrentWindow().close();
        }
    });
}

window.addEventListener('load', function(){
    fs.readFile(CommandsFile, function(err, buffer){
        let data = DEFAULT_COMMANDS;
        if (!err){
            data = buffer.toString();
        } else if (err.code === 'ENOENT') {
            fs.writeFile(commandsFile, DEFAULT_COMMANDS);
        }

        Commands = JSON.parse(data);

        setupDom();
    });
});
