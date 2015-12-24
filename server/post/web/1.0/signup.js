var db = require( "../../../shared/database.js" )( );
var sendEmail = require( "../../../shared/send_email.js" );

const Group_NOT_VALIDATED = 0;
const Group_VALIDATED = 1;

function emailLoginUrl( email )
{
    // 暂时处理这些邮箱
    var urls =
        [
            "mail.163.com",
            "mail.126.com",
            "mail.qq.com",
            "mail.sina.com",
            "mail.sohu.com",
            "gmail.google.com",
            "hotmail.msn.com",
            "mail.189.cn",
            "mail.139.cn",
            "mail.aliyun.com"
        ];

    var atPos = email.indexOf( "@" );
    var dotPos = email.indexOf( "." );
    var provider = email.substring( atPos + 1, dotPos );

    for ( var i in urls )
    {
        var fragments = urls[i].split( "." );

        for ( var j in fragments )
        {
            // 找到了匹配的邮箱提供商
            // 比如说匹配163、或者gmail
            if ( fragments[j] === provider ) return urls[i];
        }
    }

    // 默认有一个约定，那就是mail.XXX.com，其中XXX是邮箱提供商的名称
    return "mail." + provider + ".com";
}

// 导出的函数
module.exports = function ( req, res )
{
    var business = req.body.business;

    var userName = business.userName;
    var email = business.email;
    var password = business.password;

    var user = new db.User( {
        "userName": userName,
        "email": email,
        "registerDate": Date( ),
        "avatar": "",
        "score": 0,
        "country": "中国",
        "group": Group_NOT_VALIDATED
    } );
    db.makeHashedPassword( user, password );// 制作密码和盐
    user.save( function( err )
    {
        if ( err )
        {
            var errorMessage;
            switch ( err.code )
            {
                case 11000:
                    errorMessage = "用户已经注册。"; break;
                default: break;
            }
            console.log( "用户：" + userName + "注册失败！原因是：" + JSON.stringify( err ) );

            // 渲染用户注册出问题的页面，通常仍然是signup.html
            res.render( "signup", { "errorMessage": "注册可能出了一点问题，稍后会好起来的。" } );
        }
        else
        {
            console.log( "用户：" + userName + "注册成功！" );

            // 提示发送验证邮件，跳转到目的站点
            sendEmail( userName, email, function ( err, info )
            {
                console.log( "邮件已经发送到" + email + "中。" );
            } );
            res.render( "redirect", { "redirectPage": emailLoginUrl( email ) } );
        }
    } );
}