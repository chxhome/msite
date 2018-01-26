let target = function (s) {
  return 'I am JSPang'+s;
};
var handler = {
  apply(target, ctx, args) {
      console.log('do apply');
      return Reflect.apply(...arguments);
  }
}

var pro = new Proxy(target, handler);

console.log(pro('ddddddddddd'));