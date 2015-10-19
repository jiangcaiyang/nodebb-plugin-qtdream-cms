"use strict";

var router = module.parent.require( "express" ).Router( ),
	async = module.parent.require( "async" ),
	controllers = module.parent.parent.require( "./controllers" ),
	user = module.parent.parent.require( "./user" ),
	unpack = require( "./shared/unpack" );

function methodHandlerDispatcher( req, res )
{
	// 按照一下流程：
	// 1、执行自定义的解密算法
	// 2、执行反base64编码
	// 3、执行msgpack
	// 4、判断一下os和version
	req.body = unpack( req.body.data );
	var os = req.body.os;
	var version = req.body.version;
	var handler;
	try
	{
		handler = require( "./client_" + os + '_' + version );
		//handler = require( "./post/" + os + '/' + version + req.originalUrl );
		console.log( "[post] os is: " + os + ", version is: " + version );
	}
	catch ( e )
	{
		try
		{
			handler = require( "./client_common" );
			//handler = require( "./post/common/" + version + req.originalUrl );
			console.log( "[post] try to use common one, version is: " + version );
		}
		catch ( e )
		{
			res.sendStatus( 404 );
			return;
		}
	}
	finally
	{
		handler( req, res );
	}
}

/*
	解压的中间件
 */
function unpackMiddleware( req, res, next )
{
	var unpacked = unpack( req.body.data );
	req.body = unpacked.business || { };
	//console.log( "origin: " + JSON.stringify( req.body ) );
	next( );
}

function hackResponseMiddleware( req, res, next )
{
	res.originalSend = res.send;
	res.send = function ( body )
	{
		async.waterfall(
			[
				function ( next )
				{
					if ( req.body.username )
					{
						user.getUidByUsername( req.body.username, next );
					}
					else if ( req.body.email )
					{
						user.getUidByEmail( req.body.email, next );
					}
					else
					{
						res.originalSend( { "error": "neither username nor email is present." } );
					}
				},
				function ( uid, next )
				{
					user.getUsers( [ uid ], uid, next );
				}
			],
			function ( err, users )
			{
				res.originalSend( JSON.stringify( users[0] ) );
			} );
	}
	next( );
}

router.use( "/client/register",
	unpackMiddleware,
	hackResponseMiddleware,
	controllers.authentication.register );
router.use( "/client/login",
	unpackMiddleware,
	hackResponseMiddleware,
	controllers.authentication.login );

router.post( "/client/:method", methodHandlerDispatcher );

module.exports = router;
