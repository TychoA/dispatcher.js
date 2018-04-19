# Dispatcher.js
 
 A simple, but effective client-side events dispatcher.
 Install the dispatcher on any object by calling its
 constructor provided with the context.

```javascript
const Foo = function () {

    // construct a new dispatcher
    const dispatcher = new Dispatcher(this);

    // trigger a new event
    dispatcher.trigger('event', { foo: 'bar' });
};

// construct a new instance of foo
const foo = new Foo();
 ```

Doing so will install the following methods on an instance 
of Foo:

```javascript
foo.on('event', console.log);
```
Install a new callback handler on an event name.

```javascript
foo.off('event', console.log);
```
Uninstall a callback handler of an event name.

```javascript
const Bar = function () {
    
    // construct a new dispatcher
    const dispatcher = new Dispatcher(this);

    // propagate foo events to Bar
    foo.propagateTo(this);
};
Propagate events from one dispatcher to another.
The new context is required to also construct a
dispatcher. This method will not do that on its
own, it simply connects the two.

```javascript
dispatcher.trigger('event', { foo: 'bar' });
```
Trigger an event name with optional parameters.
