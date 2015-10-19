"use strict";

var routeCMS = { };
routeCMS.onLoad = function ( params, callback )
{
	params.router.use( require( "./server/home" ) );
	params.router.use( require( "./server/client" ) );

	callback( );
};

routeCMS.onAddFields = function ( data, callback )
{
	data.fields.push( "email" );
	callback( null, data );
};

module.exports = routeCMS;