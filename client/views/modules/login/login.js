/*
 * FIRED WHEN TEMPLATE IS RENDERED
 */
Template.loginForm.rendered = function() {
	// initalise a placeholder for login errors
	Session.set('login_error', '');
};



/*
 * HELPERS FOR THIS TEMPLATE
 */
Template.loginForm.helpers({
	loginError: function() {
		return Session.get('login_error');
	}
});



/*
 * EVENT HANDERLS FOR THIS TEMPLATE
 */
Template.loginForm.events({
	'keydown .login-inputs': function(e, t) {
		if (Session.get('login_error') !== '') Session.set('login_error', '')
	},

	'submit form': function(e, t) {
		e.preventDefault();

		// objectify form data (see library->lib.js)
		var user = t.$(".form-login").serializeArray();
		user = former.objectify(user);

		Meteor.loginWithPassword(user.username, user.password, function(err, ret) {
			if(err) {
				// I do not know you
				Session.set('login_error', "Unkown username or password!");
				t.$('#username')[0].focus();
			}
		});
	}
});

Template.header.events({
	'click #logout': function () {
		Meteor.logout(function () {
			Router.go('/');
		});
	}
});