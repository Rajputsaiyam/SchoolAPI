const db = require('../model/index');

class School {
  static async addSchool({ id, name, address, latitude, longitude }) {
    const query = 'INSERT INTO schools (id, name, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.execute(query, [id, name, address, latitude, longitude]);
    return result;
  }

  static async getSchools() {
    const query = 'SELECT * FROM schools';
    const [rows] = await db.execute(query);
    return rows;
  }
}

module.exports = School;
