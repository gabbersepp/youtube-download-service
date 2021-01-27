const child_process = require("child_process");

function createProcess(cmd) {
    return new Promise((resolve) => {
       console.log("#######\r\nexecute command:\r\n\t" + cmd)
        let processEnded = false;
        const pr =  child_process.exec(cmd);
    
        pr.stdout.on('data', data => {
            console.log(data.toString()); 
        });
    
        pr.stderr.on('data', data => {
            console.log(data.toString()); 
        });
    
        pr.on("close", () => {
            if (!processEnded) {
                processEnded = true;
                resolve()
            }
        })
    
        pr.on("exit", () => {
            if (!processEnded) {
                processEnded = true;
                resolve()
            }
        })
    
        return pr;
    })
}

module.exports = {
    createProcess
}