angular.module( "signin", [ ] ).
    controller( "SigninController",
    [ "$scope", "$http", function ( $scope, $http )
    {
        $scope.name =
        {
            "text": ""
        };
        $scope.password =
        {
            "text": "",
            "pattern": /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{8,16}$/,
            "firstInput": true,// 对于初次输入的，不作验证
            "onBlur": function ( )
            {
                $scope.password.firstInput = false;
            }
        };
        $scope.signin =
        {
            "data": "",
            "onHovered": function ( )
            {
                var business =
                {
                    "name": $scope.name.text,
                    "password": $scope.password.text,
                };
                $scope.signin.data = _d( business );
            }
        };
        //$scope.login =
        //{
        //    "business": "",
        //    "onHovered": function ( )
        //    {
        //        var business =
        //        {
        //            "name": $scope.name.text,
        //            "password": $scope.password.text,
        //        };
        //
        //        $scope.login.business = _d( business );
        //
        //        console.log( "$scope.login.business is: " + $scope.login.business );
        //
        //
        //        //var data =
        //        //var transFn = function( data )
        //        //{
        //        //    return $.param( data );
        //        //};
        //        //var postCfg =
        //        //{
        //        //    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        //        //    transformRequest: transFn
        //        //};
        //        //
        //        //$http.post( "/signin", data, postCfg ).success(
        //        //    function ( data, status, headers, config )
        //        //    {
        //        //        // 成功
        //        //        //$scope.register.result = data;
        //        //        console.log( data );
        //        //
        //        //    } ).error( function ( data, status, headers, config )
        //        //    {
        //        //        // 失败
        //        //    } );
        //    }
        //};
    } ] );