const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const { createCanvas } = require('canvas');
var clear = null;

var gameData = {}

function timeout(channel) {
    channel.send("Timeout!");
}

bot.on('ready', () => {
    console.log('Jinrai, ready to run!');
});

bot.on('message', (m) => {
    if (!m.content.startsWith(config.prefix) || m.author.bot) return;
    const args = m.content.slice(config.prefix.length).trim().split(/ +/g);
    if(m.channel.id in gameData) {
        data = gameData[channel.id]
        var game = require("./Games/"+gameData['game']+".js");
        //do game stuff
    }
    const command = args.shift().toLowerCase();
    switch(command) {
        case 'game':
            var fs = require("fs");
            if(fs.exists("./Games/"+args[0]+".js" && m.mentions.length >= 2)) {
                newData = {'game':args[0], 'players':[m.mentions[0], m.mentions[1]], 'channel':m.channel.id};
                gameData[channel.id] = newData;
            } else {
                m.channel.send("Bad Input, no game started.");
            }
        case 'ping':
            m.channel.send('Pong!')
            break;
        case 'gyulhaptest':
            gyulhap_array = [2,4,6,14,15,17,19,23,24];
            var game = require("./Games/gyulhap.js");
            m.channel.send("Gyulhap Canvas Test!", {files: [{attachment: game.canvas(gyulhap_array), name: 'gyulhap.png'}]});
            break;
        case 'jinrai':
            m.channel.send("It's Jinrai!", {files: ["./Assets/jinrai.png"]})
            break;
        case 'timeout':
            clear = setTimeout(timeout, 10000, m.channel);
            break;
        case 'clear':
            if(clear){
                clearTimeout(clear);
                clear = null;
            }
            break;

    }
});

bot.login(config.token);