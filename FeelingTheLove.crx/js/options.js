/* Feeling-the-Love options page
 *
 * We present a form to the user and then manage storage of the results
 *
 * We use chrome.storage to store options
 */
var FeelingTheLoveOptions =  {
    fields: [ "day", "month", "maxHearts", "newHeartDelay", "colors", "minOpacity", "maxOpacity", "minScale", "maxScale", "minDuration", "maxDuration", "minHearts", "maxHearts", "endAfterNumHearts", "endAfterNumSeconds" ],

    init: function() {
	var defaults = {
	    day: 14,
	    month: 2,
            element: 'document.body',  // display hearts within this element
            zIndex: -999999,         // create hearts at this z-index
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
	};

	// attach handlers to form elements
	$( 'form' ).submit( function( e ) { e.preventDefault(); FeelingTheLoveOptions.save( $( this ) ); } );
	$( '#cancel' ).click( function( ) { window.close(); } );
	$( '#clear' ).click( function( ) { chrome.storage.sync.clear(); console.log( 'clear' ); } );

	// get options from synced storage
	chrome.storage.sync.get( defaults , function( obj ) { FeelingTheLoveOptions.populate( obj ) } );
    },

    populate: function( obj ) {
	for( var i = 0; i < FeelingTheLoveOptions.fields.length; i++ ) {
	    $( 'input[name=' + FeelingTheLoveOptions.fields[ i ] + ']' ).attr( 'value', obj[ FeelingTheLoveOptions.fields[ i ] ] );
	}
    },

    save: function( form ) {
	var hash = form.serializeHash();

	console.log( 'before' );
	console.log( hash.colors );

	// get rid of whitespace and split the colors
	hash.colors = hash.colors.replace(/ /g, '').split( ',' );
	console.log( 'after' );
	console.log( hash.colors );

	chrome.storage.sync.set( hash );
	console.log( 'saved' );
    }
};

FeelingTheLoveOptions.init();
