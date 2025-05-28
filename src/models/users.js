const { deleteUser } = require("../controllers");
const connection = require("./connection");

class users extends connection{
    async fetchAllUsers(){
        try{
            const result = await this.userDb.query('select * from ??', [this.table]);
            return result && result.length ? result[0] : null;
        }
        catch(error){
            console.log(error);
            return null;
        }
    }
    async updateUser(datatoUpdate){
        try{
            const fieldsToUpdate = [];
            const values = [];
            values.push(this.table);
            
            for (const key in datatoUpdate) {
                if (key === 'id') {
                    continue;
                }
                fieldsToUpdate.push(`${key} = ?`);
                values.push(datatoUpdate[key]);
            }

            if (fieldsToUpdate.length === 0) {
                throw new Error('No valid fields to update');
            }
            values.push(datatoUpdate.id);
            const sql = `UPDATE ?? SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;
            const result = await this.userDb.query(sql, values);
            return result && result[0].affectedRows>0 ? true : false;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }
    async addUser(userData) {
        try {
            let fields = [];
            let values = [];
            let placeholders = [];
            values.push(this.table);
            for (const [key, value] of Object.entries(userData)) {
                if (key !== 'id' && value !== undefined) {
                    fields.push(key);
                    values.push(value);
                    placeholders.push('?'); // For SQL query placeholders
                }
            }
            const query = `INSERT INTO ?? (${fields.join(', ')}) VALUES (${placeholders.join(', ')})`;
            const result = await this.userDb.query(query, values);
            return result && result[0].affectedRows > 0 ? true : false;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteUser(id){
        try{
            const result = await this.userDb.query('DELETE FROM ?? WHERE id = ?', [this.table, id]);
            return result ? true : false;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    async fetchUserById(id){
        try{
            const result = await this.userDb.query('SELECT * FROM ?? WHERE id = ?', [this.table, id]);
            return result && result.length ? result[0] : null;
        }
        catch(error){
            console.log(error);
            return null;
        }
    }
}

module.exports = new users();