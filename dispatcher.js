/**
 *  Dispatcher.js
 *
 *  A simple, but effective client-side events dispatcher.
 *  Install the dispatcher on any object by calling its
 *  constructor provided with the context.
 *
 *      eg.  const dispatcher = new Dispatcher(this);
 *
 *  Doing so will install the following methods:
 *
 *      on
 *      ~~~
 *      Install a new callback handler on an event name.
 *
 *      off
 *      ~~~
 *      Uninstall a callback handler of an event name.
 *
 *      propagateTo
 *      ~~~
 *      Propagate events from one dispatcher to another.
 *      The new context is required to also construct a
 *      dispatcher. This method will not do that on its
 *      own, it simply connects the two.
 *
 *      trigger
 *      ~~~
 *      Trigger an event name with optional parameters.
 *
 *  @author         Tycho Atsma  <tycho.atsma@gmail.com>
 *  @file           Dispatcher.js
 *  @documentation  public
 */
class Dispatcher {

    /**
     *  The constructor
     *
     *  @param   object  the context to install the 
     *                   dispatcher on
     *  @return  void
     */
    constructor(context) {

        // the map that holds all the events
        this.events = new Map();

        /**
         *  Generally, we don't want to call the dispatcher methods
         *  directly. We call them from the given context. For 
         *  example: Foo.on(e, cb) instead of dispatcher.on(e, cb).
         *
         *  To do that, we need to install all the methods on the
         *  given context.
         */
        context.on          = this.on.bind(this);
        context.off         = this.off.bind(this);
        context.propagateTo = this.propagateTo.bind(this);
        context.trigger     = this.trigger.bind(this);
    }

    /**
     *  Install an event handler on the
     *  dispatcher.
     *
     *  @param   string    the event name
     *  @param   function  the callback handler
     *  @return  void
     */
    on(eventName, callback) {

        // normalize the event name
        eventName = eventName.toLowerCase();

        // do we not know this event yet?
        if (!this.events.has(eventName)) this.events.set(eventName, []);

        // push the callback to the array of event handlers
        let handlers = this.events.get(eventName);

        // add the new handler
        handlers.push(callback);

        // and save the new array of handlers
        this.events.set(eventName, handlers);
    }

    /**
     *  Uninstall an event handler off the 
     *  dispatcher.
     *
     *  The callback is a required parameter so
     *  the use of named callbacks is enforced.
     *
     *  @param   string    the event name
     *  @param   callback  the callback handler to be removed
     *  @return  bool
     */
    off(eventName, callback) {
        
        // normalize the event name
        eventName = eventName.toLowerCase();

        // do we not know the event or callback?
        if (!this.events.has(eventName) || !callback) return false;

        // construct a new array of handlers
        let handlers = this.events.get(eventName);

        // set the new handlers
        this.events.set(eventName, handlers.filter(cb => cb !== callback));

        // we're good
        return true;
    }

    /**
     *  Select a new contact to propagate events to.
     *
     *  This way child elements can pass their events
     *  on to possible parent objects. This allows
     *  grandparent objects to listen to events
     *  triggered by grandchild objects.
     *
     *  @param   object  the propagated context
     *  @return  void
     */
    propagateTo(context) {

        // init a new self
        this.propagated = context;
    }
    
    /**
     *  Trigger an event paired with optional
     *  parameters.
     *
     *  This method will try to find event
     *  handlers that have the same event name.
     *  If found, all event handlers that belong
     *  to that event will be called.
     *
     *  @param   string  the event to trigger
     *  @param   object  the optional parameters
     *  @return  bool
     */
    trigger(eventName, params = {}) {

        // do we have a propagated dispatcher?
        if (this.propagated) this.propagated.trigger(eventName, params);

        // do we not have a handler for this event?
        if (!this.events.has(eventName)) return false;

        // install a timestamp on the event params
        params.timestamp = Date.now();

        // loop over all the event handlers and call the callback
        for (let callback of this.events.get(eventName)) callback(params);
 
        // we completed our task
        return true;
    }
};
