const db = require('./conn');

class ListModel {
    constructor(id, status, list_content, user_list) {
        this.id = id;
        this.status = status;
        this.list_content = list_content;
        this.user_list = user_list;
    }

    static async getAll(user_id) {
        try {
            const response = await db.one (
                `SELECT * FROM list WHERE user_list = ${user_id}`
            )
            return response;
        } catch (error) {
            console.log('ERROR: ', error);
            return error;
        }
    }

    static async getAllLists() {
        try {
            const response = await db.any (
                `SELECT * FROM list;`
            )
            return response;
        } catch (error) {
            console.log('ERROR: ', error)
            return error;
        }
    }

    async addList() {
        try {
            const response = await db.one(
                `INSERT INTO list (status, list_content, user_list) VALUES (false, '${this.list_content}', ${this.user_list}) RETURNING id;`
            )
            return response;
        } catch (error) {
            console.log('ERROR: ', error);
            return error;
        }
    }
}

module.exports = ListModel;