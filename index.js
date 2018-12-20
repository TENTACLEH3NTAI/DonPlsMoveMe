const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const version = "0.0.5a";
let cmds = config.cmd;
let cmdsLen = cmds.length;
let channelIDs = config.channelID;
let channelsLen = channelIDs.length;
let msgChnlID;
let isChan = ["false"];
let permittedIDs = config.permitted;
let permittedIDsLen = permittedIDs.length;
let warning = config.warningMessages;
let roles1 = config.roles1;
let roles2 = config.roles2;
let roles3 = config.roles3;
let botActivity = config.botActivity;
let deleteConfig = config.deleteMessages;


client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`); 
  client.user.setActivity(botActivity);
});

client.on("message", async message => {
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	let userID = message.author.id;
    let userAvatar = message.author.avatarURL;
    let userTag = message.author.tag;
    checkRole1();
    if(command === "h" || command === "help" ){
        helpCommand();
        deleteMessage();
    }
	if(command === "getid" ||  command === "channelid"){
		msgChnlID = message.channel.id;
		getID();
        deleteMessage();
	}
	if(command === "myid" ||  command === "userid"){
		myID();
        deleteMessage();
	}
    if(command === "version" || command === "ver" ){
        getVer();
        deleteMessage();
    }
	if(command === "perm" || command === "perms" || command === "permission" || command === "permissions"){
		getPerms();
        deleteMessage();
	}
	if(command ==="permcheck"){
        yourPerms();
    }
    function checkRole1(){
        if (roles1<=0){
            checkRole2();
        }
		if(message.member.roles.some(r=>roles1.includes(r.name)) ) {
            moveCommand();
        }
        else return checkRole2;
    }
    function checkRole2(){
        if(message.member.roles.some(r=>roles2.includes(r.name)) ) {
            moveCommand();
        }
        if (roles2<=0){
            checkRole3();
        }
        else return checkRole3;
    }
    function checkRole3(){
        if (roles3<=0){
            moveCommand();
        }
        if(message.member.roles.some(r=>roles3.includes(r.name)) ) {
            moveCommand();
        }
    }
	function moveCommand(){
		let i, n = cmdsLen;
		if(cmdsLen>channelsLen){
		    tooManyCommands()
        }
        if(channelsLen>cmdsLen){
            tooManyChannels()
        }
		for (i = 0; i < n; ++i) {
		    if(command === cmds[i]) {
		        clearMe();
				isChan[i]=true;
				moveMe();
		    }
		}
		if (command === "viewall" || command === "joinall"){
            let member = message.mentions.members.first();
            deleteMessage();
            if (!member) {
                for (i = 0; i < n; ++i) {
                    if (client.channels.has(channelIDs[i])) {
                        if (!channelIDs[i]){
                            channelNotDefinedError();
                        }
                        client.channels.get(channelIDs[i]).overwritePermissions(message.author, {
                            VIEW_CHANNEL: true
                        });
                    }
                    else {
                        notDefinedErrorMessage();
                    }
                }
            } else{
                for (i = 0; i < n; ++i) {
                    if (client.channels.has(channelIDs[i])) {
                        if (!channelIDs[i]){
                            channelNotDefinedError();
                        }
                        client.channels.get(channelIDs[i]).overwritePermissions(member, {
                            VIEW_CHANNEL: true
                        });
                    }
                    else {
                        notDefinedErrorMessage();
                    }
                }
			}
		}
        if(command === "leaveall") {
            clearMe();
            moveMe();
        }
        if(command === "leave"){
            leaveChannel();
            deleteMessage();
        }
        if(command === "join"){
            joinChannel();
            deleteMessage();
        }
	}
	function leaveChannel() {
        let member = message.mentions.members.first();
        let channelToJoin = args[0];
        if (!member) {
            for (let i = 0; i < cmdsLen; ++i) {
                if (client.channels.has(channelIDs[i]) && cmds[i] === channelToJoin) {
                    if (!channelIDs[i]) {
                        channelNotDefinedError();
                    }
                    client.channels.get(channelIDs[i]).overwritePermissions(message.author, {
                        VIEW_CHANNEL: false
                    });
                }
                else if (!client.channels.has(channelIDs[i])) {
                    notDefinedErrorMessage();
                }
            }
        }
        else {
            for (let i = 0; i < cmdsLen; ++i) {
                if (client.channels.has(channelIDs[i]) && cmds[i] === channelToJoin) {
                    if (!channelIDs[i]) {
                        channelNotDefinedError();
                    }
                    client.channels.get(channelIDs[i]).overwritePermissions(member, {
                        VIEW_CHANNEL: false
                    });
                }
                else if (!client.channels.has(channelIDs[i])) {
                    notDefinedErrorMessage();
                }
            }
        }
	}
    function joinChannel() {
        let member = message.mentions.members.first();
        let channelToJoin = args[0];
        deleteMessage();
        if (!member) {
            for (let i = 0; i < cmdsLen; ++i) {
                if (client.channels.has(channelIDs[i]) && cmds[i] === channelToJoin) {
                    if (!channelIDs[i]) {
                        channelNotDefinedError();
                    }
                    client.channels.get(channelIDs[i]).overwritePermissions(message.author, {
                        VIEW_CHANNEL: true
                    });
                }
                else if (!client.channels.has(channelIDs[i])) {
                    notDefinedErrorMessage();
                }
            }
        }
        else {
            for (let i = 0; i < cmdsLen; ++i) {
                if (client.channels.has(channelIDs[i]) && cmds[i] === channelToJoin) {
                    if (!channelIDs[i]) {
                        channelNotDefinedError();
                    }
                    client.channels.get(channelIDs[i]).overwritePermissions(member, {
                        VIEW_CHANNEL: true
                    });
                }
                else if (!client.channels.has(channelIDs[i])) {
                    notDefinedErrorMessage();
                }
            }
        }
    }
	function moveMe(){
		let member = message.mentions.members.first();
		let i, n = channelsLen;
		deleteMessage();
        if (!member) {
            for (i = 0; i < n; ++i) {
                if (client.channels.has(channelIDs[i])) {
                    if (!channelIDs[i]){
                        channelNotDefinedError();
                    }
                    client.channels.get(channelIDs[i]).overwritePermissions(message.author, {
                        VIEW_CHANNEL: isChan[i]
                    });
                }
                else {
                    notDefinedErrorMessage();
                }
            }
        }
        else{
            for (i = 0; i < n; ++i) {
                if (client.channels.has(channelIDs[i])) {
                    if (!channelIDs[i]){
                        channelNotDefinedError();
                    }
                    client.channels.get(channelIDs[i]).overwritePermissions(member, {
                        VIEW_CHANNEL: isChan[i]
                    });
                }
                else {
                    notDefinedErrorMessage();
                }
            }
		}
	}
	function errorEmbed(embContent, embTitle, infoType, icon, name){
        message.channel.send({embed: {
                color: 3447003,
                author: {
                    name: name,
                    icon_url: icon
                },
                title: embTitle,
                description: embContent,
                timestamp: new Date(),
                footer: {
                    text: infoType
                }
            }
        });
    }
    function clearMe(){
        for (let i = 0; i < channelsLen; ++i) {
            isChan[i] = false;
        }
    }
    function deleteMessage(){
        if (message && deleteConfig == "true") {
            message.delete(1500);
        }
    }
    function notDefinedErrorMessage(){
        if (warning = true) {
            let embTitle = "ERROR #0001";
            let embContent = "One or more of the channels defined in your config file do not exist. Please contact a moderator to resolve this problem.";
            let infoType = "error";
            let icon = client.user.avatarURL;
            let name = client.user.username;
            errorEmbed(embContent, embTitle, infoType, icon, name);
        }
	}
    function channelNotDefinedError(){
        if (warning = true) {
            let embTitle = "ERROR #0002";
            let embContent = "There is an empty string in your channel list. Please contact a moderator to resolve this problem.";
            let infoType = "error";
            let icon = client.user.avatarURL;
            let name = client.user.username;
            errorEmbed(embContent, embTitle, infoType, icon, name);
        }
    }
    function tooManyCommands() {
        if (warning = true) {
            let embTitle = "ERROR #0003";
            let embContent = "You have more commands than channels in your config file.";
            let infoType = "error";
            let icon = client.user.avatarURL;
            let name = client.user.username;
            errorEmbed(embContent, embTitle, infoType, icon, name);
        }
    }
    function tooManyChannels() {
        if (warning = true) {
            let embTitle = "ERROR #0004";
            let embContent = "You have more channels than commands in your config file.";
            let infoType = "error";
            let icon = client.user.avatarURL;
            let name = client.user.username;
            errorEmbed(embContent, embTitle, infoType, icon, name);
        }
    }
    function getID() {
        let embTitle = "The channel you are currently in, has the ID:";
        let embContent = msgChnlID;
        let infoType = "info";
        let icon = client.user.avatarURL;
        let name = client.user.username;
        errorEmbed(embContent, embTitle, infoType, icon, name);
    }
    function myID() {
        let embTitle;
        let member = message.mentions.members.first();
        let embContent;
        if(!member){
            embTitle = "Your user ID is:";
            embContent = ""+userID;
        }
        else{
            embTitle = client.users.get(member.id).tag+"'s user ID is";
            embContent = ""+ member.id;
        }
        let infoType = "info";
        let icon = userAvatar;
        let name = userTag;
        errorEmbed(embContent, embTitle, infoType, icon, name);
    }
    function getVer() {
        let embTitle = "You are currently running MoveBot version:";
        let embContent = ""+version;
        let infoType = "info";
        let icon = client.user.avatarURL;
        let name = client.user.username;
        errorEmbed(embContent, embTitle, infoType, icon, name);
    }
    function yourPerms() {
        let embTitle;
        let member = message.mentions.members.first();
        let embContent;
        if(!member) {
            embTitle = "Your permissions are:";

            if (permittedIDs.includes(userID)) {
                let specialPermissions = "true";
                embContent = "Special permissions: "+specialPermissions;
            }
            if (permittedIDs <= 0) {
                let specialPermissions = " everyone";
                embContent = "Special permissions: "+specialPermissions;
            }
            else if (!permittedIDs.includes(userID)) {
                let specialPermissions = "false";
                embContent = "Special permissions: "+specialPermissions;
            }
        }
        else{
            embTitle = client.users.get(member.id).tag+"'s permissions are:";
            if (permittedIDs.includes(member.id)) {
                let specialPermissions = "true";
                embContent = "Special permissions: "+specialPermissions;
            }
            if (permittedIDs <= 0) {
                let specialPermissions = "everyone";
                embContent = "Special permissions: "+specialPermissions;
            }
            else if (!permittedIDs.includes(member.id)) {
                let specialPermissions = "false";
                embContent = "Special permissions: "+specialPermissions;
            }
        }
        let infoType = "info";
        let icon = userAvatar;
        let name = userTag;
        errorEmbed(embContent, embTitle, infoType, icon, name);
    }
    //TODO: own perms listed
    function getPerms() {
	    let embContent;
        for (let i = 0; i < permittedIDsLen; ++i) {
            if(!embContent){
                embContent = ""+client.users.get(permittedIDs[i]);
            }
            else{
                embContent = " "+embContent+" "+client.users.get(permittedIDs[i]);
            }
        }
        let embTitle = "The following users have special permissions:";
        let infoType = "info";
        let icon = client.user.avatarURL;
        let name = client.user.username;
        errorEmbed(embContent, embTitle, infoType, icon, name);
    }
    function helpCommand(){
        message.channel.send({embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Command list:",
                description: "The following are commands that are added by default. You might need special permissions for certain commands.",
                fields: [{
                    name: "getID or channelID",
                    value: "Tells you the ID of the text channel you are currently in. Mainly used for moderation."
                },
                    {
                        name: "myID or userID",
                        value: "Tells you your own userID. Mainly used for moderation."
                    },
                    {
                        name: "version or ver",
                        value: "Gives you information about the version of MoveBot you are running."
                    },
                    {
                        name: "perm, perms, permission or permissions",
                        value: "Lists all users with special permissions."
                    },
                    {
                        name: "join",
                        value: "Lets you see a specific channel. Use 'join @person' to give a person permissions to see the channel."
                    },
                    {
                        name: "leave",
                        value: "Takes ability to view a specific channel. Use 'leave @person' to take a persons permissions to see the channel."
                    },
                    {
                        name: "joinAll or viewAll",
                        value: "Lets you see every channel listed in the config files. Use 'joinAll @person' to give a person permissions to see channels."
                    },
                    {
                        name: "leaveAll",
                        value: "Takes ability to view channels listed in the config file. Use 'leaveAll @person' to take a persons permissions to see channels."
                    },
                    {
                        name: "permcheck",
                        value: "Tells you, if you have any special permissions."
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: "https://cdn.discordapp.com/avatars/223540684592906250/250fe53ab2c470fa4420cd721e25a730.png?size=128",
                    text: "© Dr.Phil#8609"
                }
            }
        });
    }
});
client.login(process.env.BOT_TOKEN);