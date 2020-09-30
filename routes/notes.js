const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
// const { Client } = require('pg');

/* WITHOUT SEQUELIZE - EXAMPLE */
/* const client = new Client({
	user: 'vakho',
	password: 'vakho',
	host: 'localhost',
	port: 5432,
	database: 'notes',
});
client.connect(); */

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

/* Show notes */
router.get("/:username", (req, res, next) => {
  let { username } = req.params;
  Note.findAll({
    where: { username },
    order: [["createdAt", "ASC"]],
  })
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});

/* Add new note */
router.post("/add", (req, res) => {
  if (Object.keys(req.body).length > 0) {
    Note.create(req.body)
      .then((doc) => {
        res.send(doc);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.send("Please fill in the body");
  }
});

/* Edit note */
router.put("/edit/:noteid", (req, res) => {
  let { value, image } = req.body;
  Note.update(
    { value, image },
    {
      where: {
        id: req.params.noteid,
      },
    }
  )
    .then(() => {
      res.send("Updated successfully");
    })
    .catch((err) => {
      res.send(err);
    });
});

/* Delete note */
router.delete("/delete/:id", (req, res) => {
  let { id } = req.params;
  Note.destroy({
    where: {
      id,
    },
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
