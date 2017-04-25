const { Collection } = require('discord.js');
const EventEmitter = require('events');
const { DatabaseHandlerEvents } = require('../util/Constants');

let sequelize;

class DatabaseHandler extends EventEmitter {
    constructor(uri, options = {}) {
        super();
        sequelize = require('sequelize');
        this.uri = options.dialect === undefined || options.dialect == 'sqlite' ? path.resolve(uri) : options.dialect;
        this.tableName = options.tableName || 'config';
        this.database = null; //@todo: set as new sequelize()
        this.init = typeof options.ini === 'function' ? options.init : () => options.init;
        this.memory = new Collection();
        this.model = this.db.define('settings', {
            guild: {
                type: sequelize.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true
            },
            settings: {
                type: sequelize.STRING
            }
        });
    }

    /**
     * @TODO
     * Optional:
     * - Setup guild-side settings
     * - Setup basic table management (i.e. Getting Data from table)
     * - save needs to be async
     * - new Table() needs to have a defined model by the user which uses this.db.define();
     * - remove sanitize/desanitize, replace with serialize if JSON is needed.
     * - proper documentation
     */
}
