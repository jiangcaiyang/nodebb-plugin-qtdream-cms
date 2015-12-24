var db = require( "../../../shared/database.js" )( );
var unpack = require( "../../../shared/unpack.js" );

const FOUND = 0;
const NOT_FOUND = 1;
const ERROR = 2;

function foundHandler( docs, res )
{
    var result =
    {
        "status": NOT_FOUND
    };

    // 找到了，应该对docs作处理，应该放到session中，给客户端一个sessionID
    if ( docs.length > 0 )
    {
        result.status = FOUND;

        // 应当跳转到个人的主页面。
        res.render( "index", { } );
        console.log( docs );
    }
    else
    {
        // 这里应当用一个页面提示登录失败。
        result.status = NOT_FOUND;
        res.render( "signin", { "errorMessage": "用户名或者是密码不正确。" } );
    }
}

function errorHandler( err, res )
{
    var result =
    {
        "status": ERROR
    };
    return result;
}

function find( criteria, res )
{
    db.User.find( criteria, function( err, docs )
    {
        if ( err ) errorHandler( err, res );
        else foundHandler( docs, res );
    } );
}

// 导出的函数
module.exports = function ( req, res )
{
    var name = req.body.business.name;

    // 判断是否是邮箱
    if ( /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/.
            test( ( name ) ) )
    {
        find( { "email": name }, res );
    }
    else if ( /\w{4,20}$/.test( name ) )
    {
        find( { "userName": name }, res );
    }
    else
    {
        console.log( "好像既不是邮箱也不是用户名。应该直接返回找不到的。" );
        return;
    }
}