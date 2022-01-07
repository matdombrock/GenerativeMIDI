const fs = require('fs');

module.exports = ()=>{

  const userLoc = process.argv[2];
  const configLoc = './'+( userLoc ? useLoc : 'config.json');
  let c = {
    "name":"sample",
    "sequence_length":16,
    "mode":"minor",
    "offset":0,
    "interval_weights":[1,8,1,1,1,1,1],
    "duration_min":4,
    "duration_max":8,
    "octave_weights":[1,1,1,1,1,1,1,1,1,1,1],
    "output_dir":"./output",
    "generate_json":true
  };
  try {
    if (fs.existsSync(configLoc)) {
      //file exists
      c = require(configLoc);
    }
  } catch(err) {
    console.error(err);
    console.log('Using sample config...');
  }
  return c;
  
  
  
};

