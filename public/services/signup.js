// services的用法：
// 如果是多个controller想调用同一片代码，那么最好将这片代码写成一个service。

angular.module( "signup", ["ngResource"] ).
    factory( "queryService", [ "$resource", function ( $resource )
{
    var query =
    {
        query: function ( method, value, callback )
        {
            var Resource = $resource( method, { } );
            var res = Resource.get( value, callback );
        }
    };

    return query;
} ] );