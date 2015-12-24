var msgpack = require( "msgpack5" )( );

function myMixup( str )
{
    var length = str.length;
    var result = "";
    for ( var i = 0; i < length; i += 3 )
    {
        if ( i + 2 == length )
        {
            result += str[i + 1];
            result += str[i];
        }
        else if ( i + 1 == length )
        {
            result += str[i];
        }
        else
        {
            result += str[i + 2];
            result += str[i + 1];
            result += str[i];
        }
    }
    return result;
}

// 解压的函数主要执行的是：
// 1、执行自定义的解密算法
// 2、执行反base64编码
// 3、执行msgpack
module.exports = function ( str )
{
    var result = myMixup( str );
    var encodedBuffer = new Buffer( result, "base64" );
    result = msgpack.decode( encodedBuffer );
    encodedBuffer = undefined;
    return result;
}