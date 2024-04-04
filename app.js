const yargs = require('yargs');
const notes = require('./notes.js')
// console.log(process.argv)

//customize yargs version
yargs.version('1.1.0');

//create add command
//command:--> node app.js --help
//node app.js add --title="abc" --body="xyz"
yargs.command({
    command: 'add',
    describe: "Add a new note",
    builder: { //not necessary to give this. add the otions for the commands 
        title: {
            describe: "Note title",
            demandOption: true, //by default it is false if you are not providing this then it is not mandatory to give the title
            type: 'string', // if you are not providing the title value it will give an empty string. if you are not adding this property and not providing the type value it will give true value in the title
        },
        body: {
            describe: "This is body option",
            demandOption: true, //make it required
            type: 'string' //value should be a string
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);
    }
})

//create remove command
//node app.js remove --title="abc"
yargs.command({
    command: 'remove',
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Title of the note you want to remove.",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title);
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: "List your note",
    handler: function () {
        console.log("Listing out all notes!!")
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: "Read a note",
    handler: function () {
        console.log("Read the note!!")
    }
})


//console.log(yargs.argv); or  yargs.parse() will print the help message, so we need to call it after defining our commands 
// console.log(yargs.argv)
yargs.parse()