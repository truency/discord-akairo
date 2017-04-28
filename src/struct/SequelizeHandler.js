const { Collection } = require('discord.js');
const { DatabaseProvider } = require('./DatabaseProvider');
const { DatabaseHandlerEvents } = require('../util/Constants');
const Sequelize = require('sequelize');

module.exports = class SequelizeHandler extends DatabaseProvider {

    constructor(uri, options = {}) {
        super();
        this.dialect = options.dialect === undefined ? this.dialect = 'sqlite' : options.dialect;
        this.uri = options.url === undefined ? this.uri = 'localhost' : options.url;
        this.databaseName = options.databaseName === undefined ? this.databaseName == 'akairo' : options.databaseName;
    }

    /**
     * Opens and initialises the Sequelize database
     * @param {AkairoClient} client - Client using the provider
     * @return {Promise<any>}
     */
    open(client) {
        if (this.dialect == 'sqlite') {
            this.database = new Sequelize(this.databaseName, {
                dialect: 'sqlite',
                storage: this.uri
            })
        } else {
            this.database = new Sequelize(this.databaseName, { 
                dialect: this.dialect
            });
            this.database.authenticate().catch(err => { 
                throw new Error(err) 
            });
        }
    }

    /**
     * @todo logic for add, remove, close, query, and queryRaw for
     *       user clients using sequelize
     */

    /**
     * Obtain data from a table in the defined database
     * @param {string} table - The table in the database (defaults to guild)
     * @param {string} key - The name of the cell in the table to add
     * @param {string|object} data - Data to set in the key cell.
     * @return {any} - Returns the queried data
     */
    add(table, key, data) {

    }

    /**
     * Remove data from the table
     * @param {string} table 
     * @param {string|object} key
     * @return {any}
     */
    remove(table, key) {

    }
    
    /**
     * Closes the database
     * @return {Promise<any>}
     */
    close() {

    }

    /**
     * Obtain data from a table in the defined database
     * @param {string} table - The table in the database (defaults to guild)
     * @param {string} key - Name of data in the table to grab
     * @return {any} - Returns the queried data
     */
    query(table, key) {

    }

    /**
     * Allows execution of a raw SQL query to the database via Sequelize
     * @param {string} query SQL Query
     * @param {object} options [plain=false, raw=false] Allows use of either getting 
     * table as plain text data, or pure raw table data.
     * @returns {any} Returns query information
     */
    queryRaw(query, options = {}) {

    }

}
