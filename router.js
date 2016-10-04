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

	// app.post('/contactcard', requireAuth, function(req, res) {
	// 	User.findOne({ email: email }, function(err, user) {
	// 	  if (err) { return done(err); }
	// 	  if (!user) { return done(null, false); }

	// 	  res.send({userInfo: user});

	// 	  done();
	// 	  // user.comparePassword(password, function(err, isMatch) {
	// 	  //   if (err) { return done(err); }
	// 	  //   if (!isMatch) { return done(null, false); }

	// 	  //   return done(null, user);
	// 	  // });
	// 	});
	//   // res.send({ message: 'contactcard' });
	// });

	app.put('/contactcard', function(req, res) {
		var id = req.body.id;
		var email = req.body.email;
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var photo_url = req.body.photo_url;

		console.log('route hit');
		console.log('req.body: ', req.body);
	
		User.findOneAndUpdate({email: email}, {$set: {"email": email, "first_name": first_name, "last_name": last_name, "photo_url": photo_url}}, {new:true} )
			  .then(function(user) {
			    console.log("user: ", user);
			    // res.status(200).json({
			    //   status: 'success',
			    //   data: post
			    // });
			    return res.send({
			    	email: email,
			    	first_name: first_name,
			    	last_name: last_name,
			    	photo_url: photo_url
			    });
			  })
			  .catch(function (err) {
			    return next(err);
			  });
	});


	app.post('/signup', Authentication.signup);
	app.post('/login', requireLogin, Authentication.login);

	// delete user
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
