
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
     * @return {Promise<any>}
     * @abstract
     */
    open() {
        throw new Error(`${this.constructor.name} does not have an 'open' method.`);
    }

    /**
     * Obtain data from a table in the defined database
     * @param {string} table - The table in the database (defaults to guild)
     * @param {string|object} key - The name of the cell in the table to add
     * @param {string|object} data - Data to set in the key cell.
     * @return {any} - Returns the queried data
     * @abstract
     */
    add(table, key, data) {
        throw new Error(`${this.constructor.name} does not have an 'add' method.`);
    }

    /**
     * Remove data from the table
     * @param {string} table 
     * @param {string|object} key
     * @return {any}
     * @abstract
     */
    delete(table, key) {
        throw new Error(`${this.constructor.name} does not have a 'remove' method.`);
    }

    /**
     * Closes the database
     * @return {Promise<any>}
     * @abstract
     */
    close() {
        throw new Error(`${this.constructor.name} does not have a 'close' method`);
    }
    
}

module.exports = DatabaseProvider;