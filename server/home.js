"use strict";

var router = module.parent.require( "express" ).Router( ),
    winston = module.parent.require( "winston" ),
	async = module.parent.require( "async" ),
	User = module.parent.parent.require( "./user" );

function getUserData( uid, callback )
{
	async.waterfall(
		[
			function ( next )
			{
				User.getUsernamesByUids( [ uid ], next );
			},
			function ( userNames, next )
			{
				callback( userNames[0] );
				next( null, userNames[0] );
			}
		], function ( err, result )
		{
			if ( err )
			{
				console.log( "getUserData: error: ", JSON.stringify( err ) );
			}
			// result -> null
		} );
}

function renderPage( req, res, page, renderData )
{
	if ( req.user && parseInt( req.user.uid, 10 ) !== 0 )
	{
		getUserData( req.user.uid, function ( userName )
		{
			renderData.userName = userName;
			res.render( page, renderData );
		} );
	}
	else
	{
		renderData.userName = "";
		res.render( page, renderData );
	}
}

var renderData =
{
	"publicDir": "/plugins/nodebb-plugin-route-cms",
};

router.get( "/home", function ( req, res )
{
	renderPage( req, res, "index", renderData );
} );

router.get( "/home/index", function ( req, res )
{
	renderPage( req, res, "index", renderData );
} );

router.get( "/home/about", function ( req, res )
{
	renderPage( req, res, "about", renderData );
} );

router.get( "/home/contact", function ( req, res )
{
	renderPage( req, res, "contact", renderData );
} );

router.get( "/home/take-medicine", function ( req, res )
{
	renderPage( req, res, "take-medicine", renderData );
} );

router.get( "/home/ten-days-lay-ghost", function ( req, res )
{
	renderPage( req, res, "ten-days-lay-ghost", renderData );
} );

module.exports = router;
