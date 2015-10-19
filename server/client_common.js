module.exports = function ( req, res )
{
	var method = req.params.method;
	var business = req.body.business;

	//if ( method == "getUser" )
	//{
	//	getUserByUid( business.uid, function ( err, user )
	//	{
	//		if ( err ) res.json( { "error": err } );
	//		else res.json( user );
	//	} );
	//}
}