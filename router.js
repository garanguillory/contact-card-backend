const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const User = require('./models/user');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {

	app.get('/', requireAuth, function(req, res) {
	  res.send({ message: 'Tokenized' });
	});
		

	app.get('/contactcard/:id', requireAuth, function(req, res) {
		var id = req.params.id;
		console.log("id: ", id);
		User.findById(id, function(err, user) {
		  if (err) { return done(err); }
		  if (!user) { return done(null, false); }
		  res.send({userInfo: user});
		});
	});


	// add requireAuth
	app.put('/contactcard/:id', function(req, res) {

		var id = req.params.id;
		console.log("id: ", id);
		var email = req.body.email;
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var description = req.body.description;
		var photo_url = req.body.photo_url;

		console.log('route hit');
		console.log('req.body: ', req.body);
	
		User.findByIdAndUpdate(id, {$set: {"email": email, "first_name": first_name, "last_name": last_name, "description": description, "photo_url": photo_url}}, {new:true} )
			  .then(function(user) {
			    console.log("user: ", user);
			    // res.status(200).json({
			    //   status: 'success',
			    //   data: user
			    // });
			    res.status(200).send({userInfo: user});
			  })
			  .catch(function (err) {
			    return next(err);
			  });
	});


	app.post('/signup', Authentication.signup);
	app.post('/login', requireLogin, Authentication.login);

	// delete user (need to add id)
	app.delete('/contactcard', function(req, res, next){
		var email = req.body.email;
		console.log("email: ", email);
		User.findOneAndRemove({email: email})
			  .then(function(user) {
			    res.status(200).json({
			      status: 'user deleted',
			      data: user
			    });
			  })
			  .catch(function (err) {
			    return next(err);
			  });
	});

}
