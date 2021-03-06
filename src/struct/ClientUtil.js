const { Collection, Permissions, RichEmbed, User } = require('discord.js');

/**
 * Function used to check if a response should pass for the prompt.
 * @typedef {Function} PromptCheckFunction
 * @param {Message} message - Message to check.
 * @param {Message} [sent] - The prompt's sent message.
 * @returns {boolean}
 */

class ClientUtil {
    /**
     * Client utilities to help with common tasks.
     * @param {AkairoClient} client - The client.
     */
    constructor(client) {
        /**
         * The Akairo client.
         * @readonly
         * @name ClientUtil#client
         * @type {AkairoClient}
         */
        Object.defineProperty(this, 'client', {
            value: client
        });
    }

    /**
     * Resolves a user from a string, such as an ID, a name, or a mention.
     * @param {string} text - Text to resolve.
     * @param {Collection} users - Collection of users to find in.
     * @param {boolean} [caseSensitive=false] - Makes finding by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes finding by name match full word only.
     * @returns {User}
     */
    resolveUser(text, users, caseSensitive = false, wholeWord = false) {
        return users.find(user => this.checkUser(text, user, caseSensitive, wholeWord));
    }

    /**
     * Resolves multiple users from a string, such as an ID, a name, or a mention.
     * @param {string} text - Text to resolve.
     * @param {Collection} users - Collection of users to find in.
     * @param {boolean} [caseSensitive=false] - Makes finding by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes finding by name match full word only.
     * @returns {Collection<string, User>}
     */
    resolveUsers(text, users, caseSensitive = false, wholeWord = false) {
        return users.filter(user => this.checkUser(text, user, caseSensitive, wholeWord));
    }

    /**
     * Checks if a string could be referring to a user.
     * @param {string} text - Text to check.
     * @param {User} user - User to check.
     * @param {boolean} [caseSensitive=false] - Makes checking by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes checking by name match full word only.
     * @returns {boolean}
     */
    checkUser(text, user, caseSensitive = false, wholeWord = false) {
        if (user.id === text) return true;

        const reg = /<@!?(\d+)>/;
        const match = text.match(reg);

        if (match && user.id === match[1]) return true;

        text = caseSensitive ? text : text.toLowerCase();
        const username = caseSensitive ? user.username : user.username.toLowerCase();
        const discrim = user.discriminator;

        if (!wholeWord) {
            return username.includes(text)
            || (username.includes(text.split('#')[0]) && discrim.includes(text.split('#')[1]));
        }

        return username === text
        || (username === text.split('#')[0] && discrim === text.split('#')[1]);
    }

    /**
     * Resolves a member from a string, such as an ID, a name, or a mention.
     * @param {string} text - Text to resolve.
     * @param {Collection} members - Collection of members to find in.
     * @param {boolean} [caseSensitive=false] - Makes finding by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes finding by name match full word only.
     * @returns {GuildMember}
     */
    resolveMember(text, members, caseSensitive = false, wholeWord = false) {
        return members.find(member => this.checkMember(text, member, caseSensitive, wholeWord));
    }

    /**
     * Resolves multiple members from a string, such as an ID, a name, or a mention.
     * @param {string} text - Text to resolve.
     * @param {Collection} members - Collection of members to find in.
     * @param {boolean} [caseSensitive=false] - Makes finding by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes finding by name match full word only.
     * @returns {Collection<string, GuildMember>}
     */
    resolveMembers(text, members, caseSensitive = false, wholeWord = false) {
        return members.filter(member => this.checkMember(text, member, caseSensitive, wholeWord));
    }

    /**
     * Checks if a string could be referring to a member.
     * @param {string} text - Text to check.
     * @param {GuildMember} member - Member to check.
     * @param {boolean} [caseSensitive=false] - Makes checking by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes checking by name match full word only.
     * @returns {boolean}
     */
    checkMember(text, member, caseSensitive = false, wholeWord = false) {
        if (member.id === text) return true;

        const reg = /<@!?(\d+)>/;
        const match = text.match(reg);

        if (match && member.id === match[1]) return true;

        text = caseSensitive ? text : text.toLowerCase();
        const username = caseSensitive ? member.user.username : member.user.username.toLowerCase();
        const displayName = caseSensitive ? member.displayName : member.displayName.toLowerCase();
        const discrim = member.user.discriminator;

        if (!wholeWord) {
            return displayName.includes(text)
            || username.includes(text)
            || ((username.includes(text.split('#')[0]) || displayName.includes(text.split('#')[0])) && discrim.includes(text.split('#')[1]));
        }

        return displayName === text
        || username === text
        || ((username === text.split('#')[0] || displayName === text.split('#')[0]) && discrim === text.split('#')[1]);
    }

    /**
     * Resolves a guild channel from a string, such as an ID, a name, or a mention.
     * @param {string} text - Text to resolve.
     * @param {Collection} channels - Collection of channels to find in.
     * @param {boolean} [caseSensitive=false] - Makes finding by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes finding by name match full word only.
     * @returns {GuildChannel}
     */
    resolveChannel(text, channels, caseSensitive = false, wholeWord = false) {
        return channels.find(channel => this.checkChannel(text, channel, caseSensitive, wholeWord));
    }

    /**
     * Resolves multiple guild channels from a string, such as an ID, a name, or a mention.
     * @param {string} text - Text to resolve.
     * @param {Collection} channels - Collection of channels to find in.
     * @param {boolean} [caseSensitive=false] - Makes finding by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes finding by name match full word only.
     * @returns {Collection<string, GuildChannel>}
     */
    resolveChannels(text, channels, caseSensitive = false, wholeWord = false) {
        return channels.filter(channel => this.checkChannel(text, channel, caseSensitive, wholeWord));
    }

    /**
     * Checks if a string could be referring to a channel.
     * @param {string} text - Text to check.
     * @param {Channel} channel - Channel to check.
     * @param {boolean} [caseSensitive=false] - Makes checking by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes checking by name match full word only.
     * @returns {boolean}
     */
    checkChannel(text, channel, caseSensitive = false, wholeWord = false) {
        if (channel.id === text) return true;

        const reg = /<#(\d+)>/;
        const match = text.match(reg);

        if (match && channel.id === match[1]) return true;

        text = caseSensitive ? text : text.toLowerCase();
        const name = caseSensitive ? channel.name : channel.name.toLowerCase();

        if (!wholeWord) {
            return name.includes(text)
            || name.includes(text.replace(/^#/, ''));
        }

        return name === text
        || name === text.replace(/^#/, '');
    }

    /**
     * Resolves a role from a string, such as an ID, a name, or a mention.
     * @param {string} text - Text to resolve.
     * @param {Collection} roles - Collection of roles to find in.
     * @param {boolean} [caseSensitive=false] - Makes finding by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes finding by name match full word only.
     * @returns {Role}
     */
    resolveRole(text, roles, caseSensitive = false, wholeWord = false) {
        return roles.find(role => this.checkRole(text, role, caseSensitive, wholeWord));
    }

    /**
     * Resolves multiple roles from a string, such as an ID, a name, or a mention.
     * @param {string} text - Text to resolve.
     * @param {Collection} roles - Collection of roles to find in.
     * @param {boolean} [caseSensitive=false] - Makes finding by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes finding by name match full word only.
     * @returns {Collection<string, Role>}
     */
    resolveRoles(text, roles, caseSensitive = false, wholeWord = false) {
        return roles.filter(role => this.checkRole(text, role, caseSensitive, wholeWord));
    }

    /**
     * Checks if a string could be referring to a role.
     * @param {string} text - Text to check.
     * @param {Role} role - Role to check.
     * @param {boolean} [caseSensitive=false] - Makes checking by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes checking by name match full word only.
     * @returns {boolean}
     */
    checkRole(text, role, caseSensitive = false, wholeWord = false) {
        if (role.id === text) return true;

        const reg = /<@&(\d+)>/;
        const match = text.match(reg);

        if (match && role.id === match[1]) return true;

        text = caseSensitive ? text : text.toLowerCase();
        const name = caseSensitive ? role.name : role.name.toLowerCase();

        if (!wholeWord) {
            return name.includes(text)
            || name.includes(text.replace(/^@/, ''));
        }

        return name === text
        || name === text.replace(/^@/, '');
    }

    /**
     * Resolves a custom emoji from a string, such as a name or a mention.
     * @param {string} text - Text to resolve.
     * @param {Collection} emojis - Collection of emojis to find in.
     * @param {boolean} [caseSensitive=false] - Makes finding by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes finding by name match full word only.
     * @returns {Emoji}
     */
    resolveEmoji(text, emojis, caseSensitive = false, wholeWord = false) {
        return emojis.find(emoji => this.checkEmoji(text, emoji, caseSensitive, wholeWord));
    }

    /**
     * Resolves multiple custom emojis from a string, such as a name or a mention.
     * @param {string} text - Text to resolve.
     * @param {Collection} emojis - Collection of emojis to find in.
     * @param {boolean} [caseSensitive=false] - Makes finding by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes finding by name match full word only.
     * @returns {Collection<string, Emoji>}
     */
    resolveEmojis(text, emojis, caseSensitive = false, wholeWord = false) {
        return emojis.filter(emoji => this.checkEmoji(text, emoji, caseSensitive, wholeWord));
    }

    /**
     * Checks if a string could be referring to a emoji.
     * @param {string} text - Text to check.
     * @param {Emoji} emoji - Emoji to check.
     * @param {boolean} [caseSensitive=false] - Makes checking by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes checking by name match full word only.
     * @returns {boolean}
     */
    checkEmoji(text, emoji, caseSensitive = false, wholeWord = false) {
        if (emoji.id === text) return true;

        const reg = /<:[a-zA-Z0-9_]+:(\d+)>/;
        const match = text.match(reg);

        if (match && emoji.id === match[1]) return true;

        text = caseSensitive ? text : text.toLowerCase();
        const name = caseSensitive ? emoji.name : emoji.name.toLowerCase();

        if (!wholeWord) {
            return name.includes(text)
            || name.includes(text.replace(/:/, ''));
        }

        return name === text
        || name === text.replace(/:/, '');
    }

    /**
     * Resolves a guild from a string, such as an ID or a name.
     * @param {string} text - Text to resolve.
     * @param {Collection} guilds - Collection of guilds to find in.
     * @param {boolean} [caseSensitive=false] - Makes finding by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes finding by name match full word only.
     * @returns {Guild}
     */
    resolveGuild(text, guilds, caseSensitive = false, wholeWord = false) {
        return guilds.find(guild => this.checkGuild(text, guild, caseSensitive, wholeWord));
    }

    /**
     * Resolves multiple guilds from a string, such as an ID or a name.
     * @param {string} text - Text to resolve.
     * @param {Collection} guilds - Collection of guilds to find in.
     * @param {boolean} [caseSensitive=false] - Makes finding by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes finding by name match full word only.
     * @returns {Collection<string, Guild>}
     */
    resolveGuilds(text, guilds, caseSensitive = false, wholeWord = false) {
        return guilds.filter(guild => this.checkGuild(text, guild, caseSensitive, wholeWord));
    }

    /**
     * Checks if a string could be referring to a guild.
     * @param {string} text - Text to check.
     * @param {Guild} guild - Guild to check.
     * @param {boolean} [caseSensitive=false] - Makes checking by name case sensitive.
     * @param {boolean} [wholeWord=false] - Makes checking by name match full word only.
     * @returns {boolean}
     */
    checkGuild(text, guild, caseSensitive, wholeWord) {
        if (guild.id === text) return true;

        text = caseSensitive ? text : text.toLowerCase();
        const name = caseSensitive ? guild.name : guild.name.toLowerCase();

        if (!wholeWord) return name.includes(text);
        return name === text;
    }

    /**
     * Gets the role which is used to display the member's color.
     * @deprecated Use GuildMember#colorRole
     * @param {GuildMember} member - The member to find the role.
     * @returns {Role}
     */
    displayRole(member) {
        const coloredRoles = member.roles.filter(role => role.color);
        if (!coloredRoles.size) return null;
        return coloredRoles.reduce((prev, role) => !prev || role.comparePositionTo(prev) > 0 ? role : prev);
    }

    /**
     * Gets the display color in decimal of the member.
     * @deprecated Use GuildMember#displayColor
     * @param {GuildMember} member - The member to find color of.
     * @returns {number}
     */
    displayColor(member) {
        const role = this.displayRole(member);
        return (role && role.color) || 0;
    }

    /**
     * Gets the display color in hex code of the member.
     * @deprecated Use GuildMember#displayHexColor
     * @param {GuildMember} member - The member to find color of.
     * @returns {string}
     */
    displayHexColor(member) {
        const role = this.displayRole(member);
        return (role && role.hexColor) || '#000000';
    }

    /**
     * Gets the role which is used to hoist the member.
     * @deprecated Use GuildMember#hoistRole
     * @param {GuildMember} member - The member to find the role.
     * @returns {Role}
     */
    hoistRole(member) {
        const hoistedRoles = member.roles.filter(role => role.hoist);
        if (!hoistedRoles.size) return null;
        return hoistedRoles.reduce((prev, role) => !prev || role.comparePositionTo(prev) > 0 ? role : prev);
    }

    /**
     * Array of permission names.
     * @returns {string[]}
     */
    permissionNames() {
        return Object.keys(Permissions.FLAGS);
    }

    /**
     * Resolves a permission number and returns an array of permission names.
     * @param {number} number - The permissions number.
     * @returns {string[]}
     */
    resolvePermissionNumber(number) {
        const resolved = [];

        for (const key of Object.keys(Permissions.FLAGS)) {
            if (number & Permissions.FLAGS[key]) resolved.push(key);
        }

        return resolved;
    }

    /**
     * Resolves a channel permission overwrite.
     * Returns an object with the `allow` and `deny` arrays of permission names.
     * @param {PermissionOverwrites} overwrite - Permissions overwrite.
     * @returns {Object}
     */
    resolvePermissionOverwrite(overwrite) {
        const copy = Object.assign({}, overwrite);
        copy.allow = this.resolvePermissionNumber(overwrite.allow);
        copy.deny = this.resolvePermissionNumber(overwrite.deny);
        return copy;
    }

    /**
     * Compares two member objects presences and checks if they stopped or started a stream or not.
     * Returns `0`, `1`, or `2` for no change, stopped, or started.
     * @param {GuildMember} oldMember - The old member.
     * @param {GuildMember} newMember - The new member.
     * @returns {number}
     */
    compareStreaming(oldMember, newMember) {
        const s1 = oldMember.presence.game && oldMember.presence.game.streaming;
        const s2 = newMember.presence.game && newMember.presence.game.streaming;

        if (s1 === s2) return 0;
        if (s1) return 1;
        if (s2) return 2;
        return 0;
    }

    /**
     * Combination of `<Client>.fetchUser()` and `<Guild>.fetchMember()`.
     * @param {Guild} guild - Guild to fetch in.
     * @param {string} id - ID of the user.
     * @param {boolean} cache - Whether or not to add to cache.
     * @returns {Promise<GuildMember>}
     */
    fetchMemberFrom(guild, id, cache) {
        return this.client.fetchUser(id, cache).then(fetched => {
            return guild.fetchMember(fetched, cache);
        });
    }

    /**
     * Makes a RichEmbed.
     * @param {Object} [data] - Embed data.
     * @returns {RichEmbed}
     */
    embed(data) {
        return new RichEmbed(data);
    }

    /**
     * Makes a Collection.
     * @param {Iterable} [iterable] - Entries to fill with.
     * @returns {Collection}
     */
    collection(iterable) {
        return new Collection(iterable);
    }

    /**
     * Prompts a user for input, returning the message that passes.
     * @param {Message} [message] - Message to prompt.
     * @param {string} [content] - Text to send.
     * @param {RegExp|PromptCheckFunction} [check] - Regex or function to check if message should pass.
     * @param {number} [time=30000] - Time in milliseconds to wait.
     * @param {MessageOptions} [options] - Message options for message.
     * @returns {Promise<Message>}
     */
    prompt(message, content, check = () => true, time = 30000, options) {
        const promise = content || options
        ? message.channel.send(content, options)
        : Promise.resolve();

        return promise.then(sent => new Promise((resolve, reject) => {
            const collector = message.channel.createCollector(m => {
                try {
                    if (sent && m.id === sent.id) return undefined;
                    if (m.author.id !== message.author.id) return undefined;

                    let passed;

                    if (typeof check === 'function') {
                        const checked = check(m, sent);
                        passed = checked != null && checked !== false;
                    } else {
                        passed = check.test(m.content);
                    }

                    if (!passed) return collector.stop('failed');
                    return true;
                } catch (err) {
                    return collector.stop(err);
                }
            }, { time });

            collector.on('message', () => collector.stop('passed'));

            collector.on('end', (collected, reason) => {
                if (reason !== 'passed') return reject(reason);
                return resolve(collected.first());
            });
        }));
    }

    /**
     * Prompts a user for input in a specific channel, returning the message that passes.
     * @param {TextBasedChannel|User} channel - Channel to prompt in or a user to prompt in DM.
     * @param {User} [user] - User to prompt, if not a user object in the channel param.
     * @param {string} [content] - Text to send.
     * @param {RegExp|PromptCheckFunction} [check] - Regex or function to check if message should pass.
     * @param {number} [time=30000] - Time in milliseconds to wait.
     * @param {MessageOptions} [options] - Message options for message.
     * @returns {Promise<Message>}
     */
    promptIn(channel, user, content, check, time, options) {
        if (channel instanceof User) {
            const user = channel; // eslint-disable-line no-shadow

            const sendPromise = content || options
            ? user.send(content, options)
            : Promise.resolve();

            return sendPromise.then(msg => {
                const dmChannel = (msg && msg.channel) || user.dmChannel;
                const channelPromise = dmChannel ? Promise.resolve(dmChannel) : user.createDM();

                return channelPromise.then(dm => this.prompt({
                    author: user,
                    channel: dm
                }, null, check, time, null));
            });
        }

        return this.prompt({
            channel,
            author: user
        }, content, check, time, options);
    }

    /**
     * Fetches a message, works for both bots and user accounts.
     * @deprecated Use TextBasedChannel#fetchMessage
     * @param {TextBasedChannel} channel - Channel to fetch in.
     * @param {Snowflake} id - ID of the message.
     * @returns {Promise<Message>}
     */
    fetchMessage(channel, id) {
        if (this.client.user.bot) return channel.fetchMessage(id);

        return channel.fetchMessages({ around: id, limit: 1 }).then(msgs => {
            const msg = msgs.get(id);
            if (!msg) throw new Error('Message was not found.');
            return msg;
        });
    }
}

module.exports = ClientUtil;
