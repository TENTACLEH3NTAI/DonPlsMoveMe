const Discord = require("discord.js");
const fs = require('fs');
const jsonfile = require('jsonfile')
const channelList = './channels.json'
const client = new Discord.Client();
const config = require("./config.json");

var channel1 = config.channelID1;
var channel2 = config.channelID2;
var channel3 = config.channelID3;
var channel4 = config.channelID4;
var channel5 = config.channelID5;
var channel6 = config.channelID6;
var channel7 = config.channelID7;
var channel8 = config.channelID8;
var channel9 = config.channelID9;
var channel10 = config.channelID10;

var msgChnlID;

var isChan1;
var isChan2;
var isChan3;
var isChan4;
var isChan5;
var isChan6;
var isChan7;
var isChan8;
var isChan9;
var isChan10;


client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Moving people around`);
});




client.on("message", async message => {
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	if(command === "getid"){
		msgChnlID = message.channel.id;
		message.channel.send('The channel you are currently in, has the ID "'+msgChnlID+'"');
	}
  
	/*if(command === "setchannel1") {
		const channelIDman = args.join(" ");
		const obj = {
			channelId1: channelIDman
		}
		jsonfile.writeFileSync(channelList, obj, { flag: 'a' })
		message.channel.send('The channel with the ID "'+channelIDman+'" has been added to the config file "channels.json"');
	}
	if(command === "setchannel2") {
		const channelIDman = args.join(" ");
		const obj = {
			channelId2: channelIDman
		}
		jsonfile.writeFileSync(channelList, obj, { flag: 'a' })
		message.channel.send('The channel with the ID "'+channelIDman+'" has been added to the config file "channels.json"');
	}*/
	
	if(command === "1") {
		message.delete();
		clearMe();
		isChan1=true;
		moveMe();
	}
	if(command === "2") {
		message.delete();
		clearMe();
		isChan2=true;
		moveMe();
	}
	if(command === "3") {
		message.delete();
		clearMe();
		isChan3=true;
		moveMe();
	}
	if(command === "4") {
		message.delete();
		clearMe();
		isChan4=true;
		moveMe();
	}
	if(command === "5") {
		message.delete();
		clearMe();
		isChan5=true;
		moveMe();
	}
	if(command === "6") {
		message.delete();
		clearMe();
		isChan6=true;
		moveMe();
	}
	if(command === "7") {
		message.delete();
		clearMe();
		isChan7=true;
		moveMe();
	}
	if(command === "8") {
		message.delete();
		clearMe();
		isChan8=true;
		moveMe();
	}
	if(command === "9") {
		message.delete();
		clearMe();
		isChan9=true;
		moveMe();
	}
	if(command === "10") {
		message.delete();
		clearMe();
		isChan10=true;
		moveMe();
	}
	if(command === "leave") {
		message.delete();
		clearMe();
		moveMe();
	}
  
	function moveMe(){
		permit1();
		permit2();
		permit3();
		permit4();
		permit5();
		permit6();
		permit7();
		permit8();
		permit9();
		permit10();
		
		function permit1(){
			if (!channel1) return
			client.channels.get(channel1).overwritePermissions(message.author, {
			VIEW_CHANNEL: isChan1
			});
		}
		function permit2(){
			if (!channel2) return
			client.channels.get(channel2).overwritePermissions(message.author, {
			VIEW_CHANNEL: isChan2
			});
		}
		function permit3(){
			if (!channel3) return
			client.channels.get(channel3).overwritePermissions(message.author, {
			VIEW_CHANNEL: isChan3
			});
		}
		function permit4(){
			if (!channel4) return
			client.channels.get(channel4).overwritePermissions(message.author, {
			VIEW_CHANNEL: isChan4
			});
		}
		function permit5(){
			if (!channel5) return
			client.channels.get(channel5).overwritePermissions(message.author, {
			VIEW_CHANNEL: isChan5
			});
		}
		function permit6(){
			if (!channel6) return
			client.channels.get(channel6).overwritePermissions(message.author, {
			VIEW_CHANNEL: isChan6
			});
		}
		function permit7(){
			if (!channel7) return
			client.channels.get(channel7).overwritePermissions(message.author, {
			VIEW_CHANNEL: isChan7
			});
		}
		function permit8(){
			if (!channel8) return
			client.channels.get(channel8).overwritePermissions(message.author, {
			VIEW_CHANNEL: isChan8
			});
		}
		function permit9(){
			if (!channel9) return
			client.channels.get(channel9).overwritePermissions(message.author, {
			VIEW_CHANNEL: isChan9
			});
		}
		function permit10(){
			if (!channel10) return
			client.channels.get(channel10).overwritePermissions(message.author, {
			VIEW_CHANNEL: isChan10
			});
		}
	}
	
	function clearMe(){
		isChan1 = isChan2 = isChan3 = isChan4 = isChan5 = isChan6 = isChan7 = isChan8 = isChan9 = isChan10 = false;
	}

	if(command === "say") {
		const sayMessage = args.join(" ");
		message.channel.send(sayMessage);
	}
});


client.login(process.env.token);
