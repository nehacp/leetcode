/*
 * Make an eventing system mix-in that adds .trigger() and .on() to any input
 * object.
 *
 * Example usage:
 * var obj = mixEvents({ name: 'Alice', age: 30 });
 * obj.on('ageChange', function(){ // On takes an event name and a callback function
 *    console.log('Age changed');
 * });
 * obj.age++;
 * obj.trigger('ageChange'); // This should call our callback! Should log 'age changed'.
 *
 * Caveats:
 * - mixEvents should return the original object it was passed after extending it.
 * - If we repeatedly call .on with the same event name, it should
 *   continue to call the old function as well. That is to say, we can have multiple
 *   listeners for an event.
 * - If `obj.trigger` is called with additional arguments, pass those to the
 *   listeners.
 * - It is not necessary to write a way to remove listeners.
 */

var mixEvents = function (obj) {
  //i: an object
  //o: the same object with added functions
  //c: none
  //e: none
  // create a events object with a reference to the callback functions

  const events = {};
  obj.on = (event, callback) => {
    events[event] ? events[event].push(callback) : events[event] = [callback];
  };

  obj.trigger = (event, ...args) => {
    if (!events[event]) {
      return;
    } else {
      events[event].forEach(fn => fn(args));
    }
  }

  return obj;
};

var obj = mixEvents({ name: 'Alice', age: 30 });

obj.on('ageChange', function () { // On takes an event name and a callback function
  console.log('Age changed');
});
obj.age++;
obj.trigger('ageChange'); // This should call our callback! Should log 'age changed'.
obj.on('ageChange', function () { // On takes an event name and a callback function
  console.log('Age changed second event');
});
obj.age++;
obj.trigger('ageChange'); // This should call our callback! Should log 'age changed'.
console.log('object in end', obj);




// ES5
// var events = {};
// var context = this;

// obj.on = function (event, callback) {
//   events[event] ? events[event].push(callback) : events[event] = [callback];
// }

// obj.trigger = function (event) {
//   var args = Array.from(arguments).slice(1);
//   if (!events[event]) {
//     return;
//   } else {
//     events[event].forEach(function (fn) {
//       fn.apply(context, args);
//     });
//   }
// }
// return obj;