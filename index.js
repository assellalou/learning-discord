const Discord = require('discord.js');
const {prefix, token, giphyToken} = require('./config.json');
const client = new Discord.Client();
const giphy = require('giphy-api')(giphyToken);

client.once('ready', ()=>{
    console.log('Ready!');
    
});

client.on('message', message=>{
    if(message.content.startsWith(`${prefix}kick`)){
        if(message.member.hasPermission(['ADMINISTRATOR'])){
            let member = message.mentions.members.first();
            member.kick().then((member)=>{
                giphy.search({q:'fail', rating:'g'}).then((res)=>{
                    let tr = res.data.length;
                    let ri = Math.floor(Math.random()*10+1)%tr;
                    let fr = res.data[ri];
                    message.channel.send(`Suck it ${member.displayName}`, {
                        files:[fr.images.fixed_height.url]
                    });
                }).catch(()=>{
                    message.channel.send('Gifs are not working!');
                })
            }).catch(()=>{
                    message.channel.send('Something went wrong!');
                })
        }else{
            message.channel.send('You are not permitted to do this, sorry!');
        }
    }
})
client.login(token);
