var db = require( "../../../shared/database.js" )( );

const Signin_SUCCESS = 0;
const Signin_USERNAME_NOT_EXIST = 1;
const Signin_EMAIL_NOT_EXIST = 2;
const Signin_PASSWORD_NOT_CORRECT = 3;
const Signin_UNKNOWN_ERROR = 4;

// 导出的函数
module.exports = function ( req, res )
{
    // 注册流程
    // 首先判断究竟包含了userName还是email，
    // 然后查找数据库，数据库中不存在，那么返回用户名不存在
    // 如果数据库存在，那么根据盐，来验证密码
    // 如果验证密码成功了，那么返回用户的数据，如果验证密码失败了，那么返回密码错误
    var business = req.body.business;
    var result = { };
    if ( business.userName )
    {
        // 查找数据库中userName的记录
        db.User.findOne( { "userName": business.userName }, function ( err, doc )
        {
            if ( err )
            {
                console.log( JSON.stringify( err ) );
                result.status = Signin_UNKNOWN_ERROR;
                res.send( result );
            }
            else
            {
                if ( !doc )// 没有找到用户
                {
                    result.status = Signin_USERNAME_NOT_EXIST;
                }
                else
                {
                    // 找到了，那么开始验证密码
                    if ( db.verifyPassword( business.password,
                            doc.hashedPassword,
                            doc.salt ) )
                    {
                        // 验证成功，返回User数据
                        var theUser =
                        {
                            "userName": doc.userName,
                            "mobile": doc.mobile,
                            "email": doc.email,
                            "registerDate": doc.registerDate,
                            "avatar": doc.avatar,
                            "score": doc.score,
                            "country": doc.country,
                            "group": doc.group
                        };
                        result.status = Signin_SUCCESS;
                        result.user = theUser;
                    }
                    else
                    {
                        result.status = Signin_PASSWORD_NOT_CORRECT;
                    }
                }
                res.send( result );
            }
        } );
    }
    else if ( business.email )
    {
        // 查找数据库中email的记录
        db.User.findOne( { "email": business.email }, function ( err, doc )
        {
            if ( err )
            {
                console.log( JSON.stringify( err ) );
                result.status = Signin_UNKNOWN_ERROR;
                res.send( result );
            }
            else
            {
                if ( !doc )// 没有找到用户
                {
                    result.status = Signin_EMAIL_NOT_EXIST;
                }
                else
                {
                    // 找到了，那么开始验证密码
                    if ( db.verifyPassword( business.password,
                            doc.hashedPassword,
                            doc.salt ) )
                    {
                        // 验证成功，返回User数据
                        var theUser =
                        {
                            "userName": doc.userName,
                            "mobile": doc.mobile,
                            "email": doc.email,
                            "registerDate": doc.registerDate,
                            "avatar": doc.avatar,
                            "score": doc.score,
                            "country": doc.country,
                            "group": doc.group
                        };
                        result.status = Signin_SUCCESS;
                        result.user = theUser;
                    }
                    else
                    {
                        result.status = Signin_PASSWORD_NOT_CORRECT;
                    }
                }
                res.send( result );
            }
        } );
    }
}