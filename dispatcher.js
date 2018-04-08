/**
 *  This component makes it possible to attach events to
 *  every object possible.  It is initialized by passing
 *  it a context (such as this) and in consequence,
 *  can trigger events on that object. Others
 *  can listen to those events.
 *
 *	@author         Tycho Atsma  <tycho.atsma@gmail.com>
 *  @file           Dispatcher.js
 *  @documentation  public
 */
const Dispatcher = function (context) {
	
	/**
	 *  The event container
     * 
	 *  @var  object
	 */
	const events = { };
    
    /**
     *  A bubbler context
     *
     *  @var  mixed
     */
    let bubbler;

	/**
	 *  Function that adds an event listener to a given context
	 *
	 *  @param   string    the name of the event
	 *  @param   function  callback fired when the event is triggered
     *  @return  void
	 */
	const addListener = function (name, callback) {

		// do we already have this event installed?
		if (!events.hasOwnProperty(name)) events[name] = [];

		// install the callback
		events[name].push(callback);
	};

	/**
	 *  Function that removes an event listener of a given context
	 *
	 *  @param   string    the name of the event
	 *  @param   function  callback fired when the event is triggered	
     *  @return  void
	 */
	const removeListener = function (name, callback) {

		// do we event have events?
		if (!events[name]) return; 
		
		// is a callback provided?
		else if (!callback) events[name] = [];

		// otherwise just remove the callback from the list
		else {

			// filter the array of callbacks
			events[name] = events[name].filter(cb => cb !== callback);
		}
	};

	/**
	 *  Function that triggers an event listener within a given context
	 *
	 *  @param   $.Event  jQuery event that can contain data
     *  @return  void
	 */
	const triggerEventListener = function ($event) {
		
        // get the event name
		const name = $event.type;

		// see if we have this event installed
		if (!events.hasOwnProperty(name)) return;

		// loop through the events
		for (let i = 0; i < events[name].length; i++) {

			// fire the installed callbacks with the event as argument
			events[name][i]($event);
		};
	};

    /**
     *  Function that can bubble the events of one context to another
     *
     *  @param   object  context we want to bubble events to
     *  @return  void
     */
    const bubbleTo = function (context) {
        
        // set the bubbled context
        bubbler = context;
    };

	// easy-to-access trigger function
	this.trigger = function ($event) {
        
        // trigger the event
        triggerEventListener($event);

        // do we have a bubbler?
        if (bubbler) bubbler.trigger($event);
    };

	// easy-to-access function shortcuts
	context.on = addListener.bind(this);
	context.off = removeListener.bind(this);
	context.trigger = this.trigger.bind(this);
    context.bubbleTo = bubbleTo.bind(this);
};