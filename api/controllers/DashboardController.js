/**
 * DashboardController
 *
 * @description :: Server-side logic for Dashboard
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index : function(req,res){
    var user = req.user;
    if(user){
      return res.json({
        user : user
      });
    }
		return res.json({message : "Not Implement yet...."});
	}
};



