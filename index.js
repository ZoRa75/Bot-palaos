const Discord = require("discord.js");
const Client = new Discord.Client({
  intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
      ]
});

const prefix = ".";

Client.addListener("ready", () => {
    console.log("bot opérationnel");
});

Client.on("messageCreate", message => {
    if (message.authorbot) return;

    //.help
    if (message.content === prefix + "help"){
        const embed = new Discord.MessageEmbed()
        .setColor("0e13ff")
        .setTitle("Liste des commandes")
        .setAuthor("ZoRa")
        .setDescription("- .info : Voir les actualités du pays !\n - .ping : en cours....")
    

        message.channel.send({ embeds: [embed] });
    }
    
    //.info
    else if(message.content === prefix + "info"){
        const embed = new Discord.MessageEmbed()
        .setTitle("- Info:")
        .setDescription("- Demain  un assaut aura lieu !\n - Le pays avance très bien !\n - **Ne pas violer les règles dites dans  #📢・annonces !**")

         message.channel.send({ embeds: [embed]});
    }
});

Client.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;
  
    // if the message content starts with "!ban"
    if (message.content.startsWith('.ban')) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Ban the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           * Read more about what ban options there are over at
           * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
           */
          member
            .ban({
              reason: 'Il a enfrein une règle !',
            })
            .then(() => {
              // We let the message author know we were able to ban the person
              message.reply(`La banissement a été effectuer sur  ${user.tag}`);
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to ban the member,
              // either due to missing permissions or role hierarchy
              message.reply('Impossible de ban ce membre');
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.reply("Cette utilisateur n'existe pas !");
        }
      } else {
        // Otherwise, if no user was mentioned
        message.reply("Vous n'avez pas mentionner de joueur pour ban !");
      }
    }
  });
  
  Client.on('message', message => {
      if (!message.guild) return;
  
    // If the message content starts with "!kick"
    if (message.content.startsWith('.kick')) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Kick the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           */
          member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
              // We let the message author know we were able to kick the person
              message.reply(`Kick réussis pour ${user.tag}`);
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to kick the member,
              // either due to missing permissions or role hierarchy
              message.reply("Je n'ai pas pus le kick");
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.reply("Cette utilisateur n'existe pas !");
        }
        // Otherwise, if no user was mentioned
      } else {
        message.reply("Vous n'avez pas mentioné pour kick !");
      }
    }
  });

// Create an event listener for new guild members
Client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === '🛬・bienvenue');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Bienvenue, ${member}`);
});

Client.on("message", message => {
    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");

            if(args[1] == undefined){
                message.reply("Nombre de message non ou mal défini !");
            }
            else {
                let number = parseInt(args[1]);

                if(isNaN(number)){
                    message.reply("Nombre de message non ou mal défini.");
                }
                else {
                    message.channel.bulkDelete(number).then(message => {
                        console.log("Supression de" + message.size + "messages réussi !");
                    }).catch(err => {
                        console.log("Erreur de clear :" + err);
                    });
                }
            }
        }        
    }
});

Client.on("message", message => {
  let args = message.content.trim().split(/ +/g)
  if (args[0].toLocaleLowerCase() === prefix + 'avatar') {
    let member = message.mentions.users.first()
    var embedAuthor = new Discord.MessageEmbed()
    .setTitle("Voici ton avatar" + message.author.username)
    .setImage(message.author.avatarURL())
    if(!member) return message.channel.send(embedAuthor)
    var embed = new Discord.MessageEmbed()
    .setTitle("Voici l'avater de " + member.username)
    .setImage(member.displayAvatarUrl())
    message.channel.send(embed)
  }
});




Client.login("OTQ2OTAxNTExNzUyMDI0MTQ0.YhlcwA.ayc29-X-1xUCuEgHGNWYKxrVBw8")