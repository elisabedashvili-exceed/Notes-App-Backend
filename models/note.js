/* WITHOUT SEQUELIZE - EXAMPLE

const { Client } = require('pg');
const client = new Client({
    user: 'vakho',
	password: 'vakho',
	host: 'localhost',
	port: 5432,
	database: 'notes',
});
client.connect(); 
*/

const Sequelize = require("sequelize");

const connection = new Sequelize("notes", "vakho", "vakho", {
  host: "localhost",
  dialect: "postgres",
  timezone: "+04:00",
});

const Note = connection.define("note", {
  value: { type: Sequelize.TEXT, allowNull: false },
  username: { type: Sequelize.STRING, allowNull: true },
  image: { type: Sequelize.STRING, allowNull: true },
});

connection.sync();

exports.Note = Note;
