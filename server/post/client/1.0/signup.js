var db = require( "../../../shared/database.js" )( );

const Signup_SUCCESS = 0;
const Signup_REGISTERED = 1;
const Signup_UNKNOWN_ERROR = 2;

// 导出的函数
module.exports = function ( req, res )
{
    var business = req.body.business;

    var userName = business.userName;
    var email = business.email;
    var password = business.password;
    var mobile = "";

    // 测试输出
    //console.log( "User name is: " + userName );
    //console.log( "Salted Email is: " + email + guidSalt );
    //console.log( "Verify code is: " + verifyCode );
    //console.log( "Password add salt, and the result is: " + SHA1( password + guidSalt ) );

    var user = new db.User( {
        "userName": userName,
        "email": email,
        "mobile": mobile,
        "registerDate": Date( ),
        "avatar": "",
        "score": 0,
        "country": "中国",
        "group": 0
    } );
    db.makeHashedPassword( user, password );// 制作密码和盐
    user.save( function( err )
    {
        var theUser =
        {
            "userName": user.userName,
            "mobile": user.mobile,
            "email": user.email,
            "registerDate": user.registerDate,
            "avatar": user.avatar,
            "score": user.score,
            "country": user.country,
            "group": user.group
        };

        if ( err )
        {
            var errorCode;
            switch ( err.code )
            {
                case 11000:
                    errorCode = Signup_REGISTERED; break;
                default:
                    errorCode = Signup_UNKNOWN_ERROR; break;
            }

            var result =
            {
                "status": errorCode,
                "user": theUser
            };
            console.log( "用户：" + userName + "注册失败！原因是：" + JSON.stringify( err ) );
            res.send( result );
        }
        else
        {
            var result =
            {
                "status": Signup_SUCCESS,
                "user": theUser
            };
            console.log( "用户：" + userName + "注册成功！" );
            res.send( result );
        }
    } );
}