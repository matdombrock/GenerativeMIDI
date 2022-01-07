const MidiWriter = require('midi-writer-js');

const random = require('./random');

const configLoader = require('./configLoader.js');
const c = configLoader();
//
module.exports = (track)=>{
  for(let i = 0; i < c.sequence_length; i++){
    let {note, interval, intervalIndex} = random.note({mode:c.mode,offset:c.offset, weights: c.interval_weights, ch_weights:c.ch_interval_weights});
    //
    let dur;
    const normSeqDurIndex = i % c.sequence_duration.length;
    if(c.sequence_duration[normSeqDurIndex]==='?'){
      dur = random.duration(c.duration_min,c.duration_max);
    }else{
      dur = random.duration(c.sequence_duration[normSeqDurIndex],c.sequence_duration[normSeqDurIndex]);
    }
    //
    const oct = random.octave(c.octave_weights);
    //
    //
    let velocity;
    const normSeqVelIndex = i % c.sequence_velocity.length;
    if(c.sequence_velocity[normSeqVelIndex]==='?'){
      velocity = random.velocity(c.velocity_min, c.velocity_max);
    }else{
      velocity = c.sequence_velocity[normSeqVelIndex];
      if(velocity>100){velocity=100};
      if(velocity<0){velocity=0};
    }
    //
    const normSeqProbIndex = i % c.sequence_probability.length;
    const indexSeqProb = c.sequence_probability[normSeqProbIndex];
    const probCheckSeq = random.chance(indexSeqProb,100);
    //
    const probCheckAll = random.chance(c.overall_probability,100);
    const probCheck = probCheckSeq && probCheckAll;
    //
    //let note2 = notes[major[(intervalIndex+5) % major.length]];
    //
    let eventData = {
      pitch: [note+oct], 
      duration: dur, 
      velocity:velocity
    };
    if(!probCheck){
      eventData = {
        pitch: [note+99], //needs secondary notes as well
        duration: 0, 
        velocity:0,
        wait: dur
      };
    }
    const event = new MidiWriter.NoteEvent(eventData);
    track.addEvent(event);
    console.log(eventData);
    //
  }  
  return track;
}