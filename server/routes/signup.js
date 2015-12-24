// 这里专门定义注册相关的路由

var router = require( "express" ).Router( );
var db = require( "../shared/database.js" )( );
var sendEmail = require( "../shared/send_email.js" );

const Group_NOT_VALIDATED = 0;
const Group_VALIDATED = 1;

// 导出的函数
router.get( "/signup", function ( req, res )
{
    res.render( "signup", { } );
} );

router.get( "/query_username", function ( req, res )
{
    var userName = req.query.userName;

    db.User.find( { "userName": userName }, function( err, docs )
    {
        if ( err )
        {
            res.send( err );
        }
        else
        {
            var result =
            {
                "used": docs.length > 0
            };
            res.send( result );
        }
    } );
} );

router.get( "/query_email", function ( req, res )
{
    var email = req.query.email;

    db.User.find( { "email": email }, function( err, docs )
    {
        if ( err )
        {
            res.send( err );
        }
        else
        {
            var result =
            {
                "used": docs.length > 0
            };
            res.send( result );
        }
    } );
} );

router.get( "/validate", function ( req, res )
{
    // 从数据库寻找到userName一样的记录，并且标志为
    var userName = req.query.user_name;

    db.User.update( { "userName": userName },
                    { "group": Group_VALIDATED },
                    { "multi": true },
                    function ( err, numberAffected, raw )
                    {
                        if ( err )
                        {
                            res.send( "更新出错了。错误：" + JSON.stringify( err ) );
                        }
                        else
                        {
                            console.log( "更新的个数是：" + JSON.stringify( numberAffected ) );

                            // TODO 换成一个正规的页面，加上一个跳转的定时器，定时跳转到index页面中
                            res.send( "认证成功！欢迎回来，" + userName );
                        }
                    } );
} );

router.get( "/validate_test", function ( req, res )
{
    res.render( "validate", { } );
} );

module.exports = router;