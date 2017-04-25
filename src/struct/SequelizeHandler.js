const { Collection } = require('discord.js');
const EventEmitter = require('events');
const { DatabaseHandlerEvents } = require('../util/Constants');
const Sequelize = require('sequelize');

class SequelizeHandler extends EventEmitter {
    constructor(uri, options = {}) {
        super();
        sequelize = require('sequelize');
        this.dialect = options.dialect === undefined || options.dialect == 'sqlite' ? path.resolve(uri) : options.dialect;
        this.tableName = options.tableName || 'config';
        this.database = new Sequelize(this.uri, {
            dialect: this.dialect
        });
        this.init = typeof options.init === 'function' ? options.init : () => options.init;
        this.memory = new Collection();

    }
}
