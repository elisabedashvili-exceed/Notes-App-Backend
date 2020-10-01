const express = require("express");
const router = express.Router();
const { Note } = require("../models/note");

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
