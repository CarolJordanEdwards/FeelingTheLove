var FeelingTheLove = {
    defaults: {
	month: 2,
	day: 14,
        maxHearts: 12,           // maximum on screen at once
        newHeartDelay: 600,      // delay between creating new hearts
        colors: ['red', 'pink'], // colors to be randomly selected from
        minOpacity: 0.2,         // minimum opacity
        maxOpacity: 1.0,         // maximum opacity
        minScale: 0.4,           // minimum scaling factor
        maxScale: 2.4,           // maximum scaling factor
        minDuration: 4,          // minimum seconds a heart can be on screen
        maxDuration: 18,         // maximum seconds a heart can be on screen
        endAfterNumHearts: 64,   // stop creating new hearts after this many have been created
        endAfterNumSeconds: 30   // stop creating new hearts after this many seconds
    },

    init: function() {
	// retrieve the options from persistent, synced storage
	chrome.storage.sync.get( FeelingTheLove.defaults , function( obj ) { FeelingTheLove.run( obj ) } );
    },

    run: function( obj ) {
	// is today the day?
	var d = new Date();
	console.log( d.getDate() + ', ' + d.getMonth() );

	// should we run Hearts? Run it if the day and month are set to 0 or the day is today
	if( ( ( obj.day == 0 ) && ( obj.month == 0 ) ) || ( ( d.getDate() == obj.day ) && ( d.getMonth() + 1 == obj.month ) ) ) {
	    delete obj[ "day" ];
	    delete obj[ "month" ];

	    Hearts( obj );
	}
    }
};

FeelingTheLove.init();

