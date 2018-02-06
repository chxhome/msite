// const pipeline = (...funcs) =>
//   val => funcs.reduce((a, b) => b(a), val);

var pipeline=function(...funcs){
  return function(val){
      return funcs.reduce(function(a,b){
        return b(a);
      },val);
  };

};

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

let a=addThenMult(5);
console.log(a);
// 12