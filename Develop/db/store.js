const fs = require("fs");
const path = require("path");
const util = require("util");

const { v1: uuidv1 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const dbPath = path.join(__dirname, "../db/db.json");

class Store {
  read() {
    //getting string data out of db file
    return readFileAsync(dbPath, "utf8");
  }

  write(content) {
    return writeFileAsync(dbPath, content);
  }

  getNotes() {
    // parse the data into a JSON string
    // filtering the string data from file and turning it into a file
    // our get notes function handles the string to object conversion
    return this.read().then((data) => {
      return data ? JSON.parse(data) : [];
    });
  }

  saveNotes(notes) {
    this.write(JSON.stringify(notes));
  }

  addNote(note) {
    return this.getNotes().then((notes) => {
      const newNote = { ...note, id: uuidv1() };
      notes.push(newNote);
      return this.saveNotes(notes).then(() => newNote);
    });
  }

  deleteNote(noteID) {
    return this.getNotes().then((notes) => {
      const newList = notes.filter((note) => note.id !== note.id);

      this.saveNotes(newList);
    });
  }
}

module.exports = new Store();
