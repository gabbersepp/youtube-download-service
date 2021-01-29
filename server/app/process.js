const child_process = require("child_process");

function createProcess(cmd) {
    return new Promise((resolve) => {
       console.log("#######\r\nexecute command:\r\n\t" + cmd)
        let processEnded = false;
        const pr =  child_process.exec(cmd);
        let output = "";

        pr.stdout.on('data', data => {
            console.log(data.toString()); 
            output += data.toString();
        });
    
        pr.stderr.on('data', data => {
            console.log(data.toString()); 
            output += data.toString();
        });
    
        pr.on("close", () => {
            if (!processEnded) {
                processEnded = true;
                resolve(output)
            }
        })
    
        pr.on("exit", () => {
            if (!processEnded) {
                processEnded = true;
                resolve(output)
            }
        })
    
        return pr;
    })
}

module.exports = {
    createProcess
}