/**
 * Created by jiangcaiyang, modified by jiangcaiyang
 * at 2015年09月14日11:47:33
 * modified at 2015年10月12日13:51:25
 */
var router = require( "express" ).Router( );
var swig = require( "swig" );
var session = require( "express-session" );
var cookieParser = require( "cookie-parser" );
var unpack = require( "./shared/unpack" );

// 拦截所有POST请求，并且分配到各个方法中
router.post( "*", function ( req, res )
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
        handler = require( "./post/" + os + '/' + version + req.originalUrl );
        console.log( "[post] os is: " + os + ", version is: " + version );
    }
    catch ( e )
    {
        try
        {
            handler = require( "./post/common/" + version + req.originalUrl );
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
} );

router.get( "/", function ( req, res )// 默认路由
{
    console.log( "user's uid is: " + req.user.uid );

	//var User = module.parent.parent.require( ".user" );
	//User.getUserData( req.user.uid, function ( user )
	//{
	//	console.log( "user is: " + JSON.stringify( user ) );
	//} );

	res.render( "index", router.renderData );
} );

router.get( "/about", function ( req, res )
{
    res.render( "about", router.renderData );
} );

router.get( "/contact", function ( req, res )
{
    res.render( "contact", router.renderData );
} );

router.get( "/index", function ( req, res )// 默认路由
{
    res.render( "index", router.renderData );
} );

module.exports = router;