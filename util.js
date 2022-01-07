module.exports = {
  weightArr,
  //randomNumber
}

function weightArr(original, weights){
  let newArr = [];
  for(let [index,weight] of Object(weights).entries()){
    for(let i = 0; i < weight; i++){
      newArr.push(original[index]);
    }
  }
  return newArr;
}

// function randomNumber(min, max){
//   const r = Math.random()*(max-min) + min
//   return Math.floor(r)
// }