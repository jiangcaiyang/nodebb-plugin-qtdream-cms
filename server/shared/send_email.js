var fileStream = require( "fs" );
var nodeMailer = require( "nodemailer" );
var validateUrl = "http://localhost:3000/validate";

function formatDate( date )
{
    var result = date.getFullYear( ) + "年" +
        ( date.getMonth( ) + 1 ) + "月" +
        ( date.getDate( ) + 1 ) + "日" ;
    return result;
}

function formatTime( date )
{
    var result = date.getFullYear( ) + "年" +
        ( date.getMonth( ) + 1 ) + "月" +
        ( date.getDate( ) + 1 ) + "日" +
        date.getHours( ) + ":" +
        date.getMinutes( ) + ":" +
        date.getSeconds( );
    return result;
}

// 导出的函数
module.exports = function ( userName, email, callback )
{
    fileStream.readFile( __dirname + "/email.html", "utf-8", function( err, data )
    {
        if ( !err )
        {
            // 发送邮件
            var send = "jiangcaiyang12345@126.com";
            var receive = email;

            // 修改邮件的内容为一个正确的值
            var date = new Date;
            var url = validateUrl + "?user_name=" + userName;
            data = data.replace( "user_name", userName );
            data = data.replace( /url/g, url );
            data = data.replace( "time", formatTime( date ) );

            var transporter = nodeMailer.createTransport(
                {
                    service: "126",
                    auth:
                    {
                        user: send,
                        pass: "jiang2186163"
                    }
                } );

            transporter.sendMail(
                {
                    from: send,
                    to: receive,
                    subject: "萌梦验证邮件",
                    html: data
                },
                callback );
        }
    } );
}