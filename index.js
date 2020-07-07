const Discord = require("discord.js")
const client = new Discord.Client()
const leaveEvent = require('./events/leave.event')

const commands = {
	// 'wm': require('./commands/welcome.command'),
	'whitelist': require('./commands/whitelist.command')
}
/**
 * Clustering.
 */
if((process.env.ENV === 'PROD' || process.env.CLUSTERING === "TRUE") && cluster.isMaster) {
    let workers = [];
    // to read number of cores on system
    let numCores = require('os').cpus().length;
    console.log('Master cluster setting up ' + numCores + ' workers');
    
    // iterate on number of cores need to be utilized by an application
    // current example will utilize all of them
    for(let i = 0; i < numCores; i++) {
        // creating workers and pushing reference in an array
        // these references can be used to receive messages from workers
        workers.push(cluster.fork());
    
        // to receive messages from worker process
        workers[i].on('message', function(message) {
            console.log(message);
        });
    }
    
    // process is clustered on a core and process id is assigned
    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is listening');
    });
    
    // if any of the worker process dies then start a new one by simply forking another one
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        workers.push(cluster.fork());
        // to receive messages from worker process
        workers[workers.length-1].on('message', function(message) {
            console.log(message);
        });
    });
} else { 
	client.on("ready", () => {
		console.log(`Logged in as ${client.user.tag}!`)
	})
	
	client.on("message", message => {
		const content = message.content;
		if(content.charAt(0) === "!") {
			const command = content.substr(1);
			if(typeof commands[command] === 'function') {
				commands[command]({ message, client })
			} 
		}
	})
	
	client.on("guildMemberRemove", (member) => {
		leaveEvent(member)
	})
	client.login("NTE2MjkwNTQ1MDczNTIwNjYw.XwDy0Q.EdkLTuSSJDFlwnHgFj2V9M_ubWY")
}
