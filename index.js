const Discord = require("discord.js");
const fs = require('fs');
const jsonfile = require('jsonfile')
const client = new Discord.Client();
const config = require("./config.json");
var cmds = config.cmd;
var cmdsLen = cmds.length;
var channelIDs = config.channelID;
var channelsLen = channelIDs.length;
var msgChnlID;
var isChan = ["false"];
var permittedIDs = config.permitted;
var permittedIDsLen = permittedIDs.length;
var warning = config.missingChannelWarning;

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Moving people around`);
});

client.on("message", async message => {
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	var userID = message.author.id;

	if(command === "getid"){
		msgChnlID = message.channel.id;
		message.channel.send('The channel you are currently in, has the ID "'+msgChnlID+'"');
	}

	if(command === "myid"){
		message.channel.send('Your userID is "'+userID+'"');
	}

	if(command === "perm"){
		message.channel.send('These IDs are permitted "'+permittedIDs+'"');
	}

	var i, n = permittedIDsLen+1;
	for (i = 0; i < n; ++i) {
		if(userID === permittedIDs[i]) {
			moveCommand();
		}
		if (permittedIDs <= 0){
			moveCommand();
		}
		else return;
	}

	function moveCommand(){
		var i, n = cmdsLen;
		for (i = 0; i < n; ++i) {
				if(command === cmds[i]) {
					try{
						message.delete(10000);
					}
					catch(err){
						console.log(`An error has occured `+err);
					}
					clearMe();
					isChan[i]=true;
					moveMe();
				}
		}
		if (command=== "viewall"){
			try{
				message.delete(10000);
			}
			catch(err){
				console.log(`An error has occured `+err);
			}
			for (i = 0; i < n; ++i) {
				if(client.channels.has(channelIDs[i])){
					if (!channelIDs[i]) return
					client.channels.get(channelIDs[i]).overwritePermissions(message.author, {
					VIEW_CHANNEL: true
					});
				}
				else{
					if(warning === true){
					message.channel.send('There is no channel with the ID "'+channelIDs[i]+'". It has either been deleted or the moderator made an error while setting of the config.json file.');
					}
				}
			}
		}
	}
	
	if(command === "leave") {
		try{
			message.delete(10000);
		}
		catch(err){
			console.log(`An error has occured `+err);
		}
		clearMe();
		moveMe();
	}

	function moveMe(){
		var i, n = channelsLen;
    	for (i = 0; i < n; ++i) {
        	if(client.channels.has(channelIDs[i])){
				if (!channelIDs[i]) return
				client.channels.get(channelIDs[i]).overwritePermissions(message.author, {
				VIEW_CHANNEL: isChan[i]
				});
			}
			else{
				if(warning === true){
				message.channel.send('There is no channel with the ID "'+channelIDs[i]+'". It has either been deleted or the moderator made an error while setting of the config.json file.');
				}
			}
		}
	}
	
	function clearMe(){
		var i, n = channelsLen;
    	for (i = 0; i < n; ++i) {
        	isChan[i] = false;
    	}
	}

	if(command === "say") {
		const sayMessage = args.join(" ");
		message.channel.send(sayMessage);
	}
});
//client.login(config.token);
client.login(process.env.BOT_TOKEN);