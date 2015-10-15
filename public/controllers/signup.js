angular.module( "signup" )
    .controller( "SignupController", [ "$scope", "queryService", "$http",
        function( $scope, queryService, $http )
    {
        $scope.userName =
        {
            "text": "",
            "pattern": /\S{4,20}$/,
            "used": false,
            "firstInput": true,// 对于初次输入的，不作验证
            "onBlur": function ( )
            {
                var userName = $scope.userName.text;
                if ( userName != undefined )
                {
                    queryService.query( "/query_username",
                        { "userName": userName },
                        function ( result )
                        {
                            $scope.userName.used = result.used;
                        } );
                }
                $scope.userName.firstInput = false;// 开始做验证了
            }
        };
        $scope.email =
        {
            "text": "",
            "used": false,
            "pattern": /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/,
            "firstInput": true,// 对于初次输入的，不作验证
            "onBlur": function ( )
            {
                var email = $scope.email.text;
                if ( email != undefined )
                {
                    queryService.query( "/query_email",
                        { "email": email },
                        function ( result )
                        {
                            $scope.email.used = result.used;
                        } );
                }
                $scope.email.firstInput = false;// 开始做验证了
            }
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
        $scope.term =
        {
            "accepted": false
        };
        $scope.signup =
        {
            "data": "",
            "result": "",
            "onChecked": function ( )
            {
                var business =
                {
                    "userName": $scope.userName.text,
                    "email": $scope.email.text,
                    "password": $scope.password.text
                };
                $scope.signup.data = _d( business );
            }
        };
    } ] );
