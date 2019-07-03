var events = require("events");
var eventEmitter = new events.EventEmitter();

//Listener 1
var listener1 = function listener1(){
console.log('listener1 executed.');
}
//Listener 2
var listener2 = function listener2(){
console.log('listner2 executed.');
}

// Bind the connection event with the listner1 function
eventEmitter.addListener('connection',listener1);

eventEmitter.on('connection', listener2);

var eventListeners = require('events').EventEmitter.listenerCount
   (eventEmitter,'connection');
console.log(eventListeners + " Listner(s) listening to connection event");

// Fire the connection event 
eventEmitter.emit('connection');

// Remove the binding of listner1 function
eventEmitter.removeListener('connection', listener1);
console.log("Listner1 will not listen now.");

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listner(s) listening to connection event");

console.log("Program Ended.");
