# dispatcher.js
A simple, but effective client side event dispatcher that relies on the jQuery $.Event object.
However, you can easily replace that with your own implementation.

## Usage
Initialize the dispatcher in your desired component like:
```javascript
const dispatcher = new Dispatcher(this);
```
Providing the ```this``` context will install the dispatcher interface on that context.
To trigger an event, you can invoke the ```.trigger($.Event())``` method.

## Event handling
To listen to an event and install a callback handler you can make use of the ```.on('eventName', callback)``` interface.
Let's say you have installed a dispatcher on object **Foo**. In object **Bar**, you initialize Foo as ```const foo = new Foo();```.
Our foo triggers, at some point in time, the **bar** event. To listen to that event, we can say ```foo.on('bar', event => {
  // ... event handling
});```.
