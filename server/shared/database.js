// database.js
// 目前只支持mongodb

// 初始化数据库
var mongoose = require( "mongoose" );
//mongoose.connect( "mongodb://jiangcaiyang:jiang2186163@localhost/qtdream-cms" );
//
//var userSchema = new mongoose.Schema( {
//    userName: { type: String, default: "匿名用户", required: true, unique: true },
//    mobile: { type: String, unique: true },
//    email: { type: String, unique: true },
//    hashedPassword: { type: String, required: true, unique: true },
//    salt: { type: String, required: true },
//    registerDate: { type: Date, required: true },
//    avatar: { type: String },
//    score: { type: Number, default: 0, required: true },
//    country: { type: String },
//    group: { type: Number, default: 0, required: true }
//} );

var db = undefined;

// 利用fs模块打开config.json，然后再获取到mongodb连接的用户名和密码，再进行连接。
fileStream.readFile( __dirname + "/../../config.json", "utf-8", function( err, data )
{
    if ( !err )
    {
        var config = JSON.parse( data );
        if ( config.database != "mongo" )
        {
            throw new Error( "config.json文件中不能填写非mongo的数据库。" );
            return;
        }

        var connectionString = "mongodb://" +
            config.mongo.username + ":" +
            config.mongo.password + "@" +
            config.mongo.host + ":" +
            config.mongo.port + "/" +
            config.mongo.database;

        mongoose.connect( connectionString );

        console.log( "database.js，数据库已经初始化！" );
    }
} );

module.exports = function ( )
{
    return db;
}