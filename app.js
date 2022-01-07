const fs = require('fs');

const MidiWriter = require('midi-writer-js');

const configLoader = require('./configLoader.js');
const c = configLoader();

console.log(c);

const generateSequence = require('./generateSequence');

// Start with a new track
let track = new MidiWriter.Track();

// Define an instrument (optional):
track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 1}));

track = generateSequence(track);

// Generate a data URI
const write = new MidiWriter.Writer(track);
//console.log(write.dataUri());
if(!fs.existsSync(c.output_dir)){
  fs.mkdirSync(c.output_dir);
}
const timestamp = Date.now();
fs.writeFileSync(c.output_dir+'/'+c.name+timestamp+'.mid',write.buildFile());
if(c.generate_json){
  fs.writeFileSync(c.output_dir+'/'+c.name+timestamp+'.config.json',JSON.stringify(c,null,2));
}
