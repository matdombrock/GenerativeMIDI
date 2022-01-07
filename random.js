
const {weightArr} = require('./util');

const {notes, major, minor,chromatic, octaves} = require('./data');

module.exports = {
  note,
  octave,
  duration,
  chance,
  number, 
  velocity
};

function number(min, max){
  const r = Math.random()*(max-min) + min
  return Math.floor(r)
}

function chance(a,b){//75,100 = 75 in 100 (75%)
  const res = Math.floor(Math.random()*b);
  if(res+1<=a){
    return true;
  }else{
    return false;
  }
}

function note(op={mode: 'major', offset: 0, weights: [1,1,1,1,1,1,1], ch_weights:[1,1,1,1,1,1,1,1,1,1,1]}){
  let interval;
  let intervalIndex;
  if(op.mode === 'major'){
    const majWeighted = weightArr(major, op.weights);
    intervalIndex = Math.floor(Math.random()*majWeighted.length);
    interval = majWeighted[intervalIndex];
  }
  if(op.mode === 'minor'){
    const minWeighted = weightArr(minor, op.weights);
    intervalIndex = Math.floor(Math.random()*minWeighted.length);
    interval = minWeighted[intervalIndex];
  }
  if(op.mode === 'chromatic'){
    const chWeighted = weightArr(chromatic, op.ch_weights);
    intervalIndex = Math.floor(Math.random()*chWeighted.length);
    interval = chWeighted[intervalIndex];
  }
  const nInterval = (interval+op.offset) % 11;
  const note = notes[nInterval];
  //

  return {note,interval,intervalIndex};
}

function octave(weights=[1,1,1,1,1,1,1,1,1,1,1]){
  const octWeighted = weightArr(octaves, weights);
  return octWeighted[Math.floor(Math.random()*octWeighted.length)];
}

function velocity(min=0,max=100){
  if(max>100){max=100};
  if(min<0){min=0};
  return number(min,max);
}

function duration(min=0,max=8){
  /*
  2
  4
  8
  16
  32
  64
  */
  // 0 = 1/128 beat
  // 1 = 1/64 beat
  // 2 = 1/32 beat 
  // 3 = 1/16 beat
  // ...
  // 7 = 1 beat (T128)
  const r = number(min, max);
  const sqr = Math.pow(2,r);
  return 'T'+sqr;
}