
/**
 * Abstract named Database Provider
 * @abstract
 */
class DatabaseProvider {

    constructor() {
        if (this.constructor.name === 'DatabaseProvider') {
            throw new Error('DatabaseProvider cannot be initlialised if used as a base.');
        }
    }

    /**
     * Opens and initialises the Sequelize database
     * @param {AkairoClient} client - Client using the provider
     * @return {Promise<any>}
     * @abstract
     */
    open() {
        throw new Error(`${this.constructor.name} does not have an 'open' method.`);
    }

    /**
     * Obtain data from a table in the defined database
     * @param {string} table - The table in the database (defaults to guild)
     * @param {string} key - The name of the cell in the table to add
     * @param {string|object} data - Data to set in the key cell.
     * @return {any} - Returns the queried data
     * @abstract
     */
    add(table, key, data) {
        throw new Error(`${this.constructor.name} does not have an 'add' method.`);
    }

    /**
     * Obtain data from a table in the defined database
     * @param {string} table - The table in the database (defaults to guild)
     * @param {string} key - Name of data in the table to grab
     * @return {any} - Returns the queried data
     * @abstract
     */
    query(table, key) {
        throw new Error(`${this.constructor.name} does not have a 'query' method.`);
    }

    /**
     * Allows execution of a raw SQL query to the database via Sequelize
     * @param {string} query SQL Query
     * @param {object} options [plain=false, raw=false] Allows use of either getting 
     * table as plain text data, or pure raw table data.
     * @returns {any} Returns query information
     * @abstract
     */
    queryRaw(query, options = {}) {
        throw new Error(`${this.constructor.name} does not have a 'queryRaw' method.`);
    }
}

module.exports = DatabaseProvider;