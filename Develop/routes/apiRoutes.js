const router = require("express").Router();
const store = require("./../db/store");

// API Routes
//consol;
router.get("/notes", (req, res) => {
  // fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
  //   res.json(JSON.parse(data));
  // });
  store.getNotes().then((notes) => {
    console.log("Got Notes");
    res.json(notes);
  });
  console.log("Yes!");
});

router.post("/notes", (req, res) => {
  console.log("Post Hit ");
  store
    .addNote(req.body)
    .then((note) => {
      res.json(note);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

router.delete("/notes/:id", (req, res) => {
  store.deleteNote(req.params.id).then(() => res.json({ ok: true }));
  console.log(req.params.id);
});

module.exports = router;
