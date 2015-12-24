var router = require( "express" ).Router( );

router.get( "/signin", function ( req, res )
{
    res.render( "signin", { } );
} );

module.exports = router;