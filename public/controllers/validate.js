angular.module( "validate", [ ] ).
    controller( "ValidateController",
    [ "$timeout", function ( $timeout )
    {
        $timeout( function ( )
        {
            window.location = 'index';
        }, 3000 );
    } ] );