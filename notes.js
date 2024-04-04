const chalk = require('chalk');
const fs = require('fs');
//getting the note.
const getNotes = function () {
    return 'your notes...'
}
// Adding a new note
const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse("New Note added!!"));
    } else {
        console.log(chalk.red.inverse("please add different note!!"))
    }
}
//Removing a note
const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter((note) => {
        return (note.title !== title)
    });
    if (filteredNotes.length < notes.length) {
        console.log(chalk.green.inverse(`Note Removed!!`));
        saveNotes(filteredNotes);
    } else {
        console.log(chalk.red.inverse("No Note is found"))
    }
}
//saved the notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}
//load the notes
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    getNote: getNotes,
    addNote: addNotes,
    removeNote: removeNote
}