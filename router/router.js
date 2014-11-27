/*
 * IRON-ROUTER
 * We are using iron router for our routing pleasure
 *
 * meteor add iron-router
 */


// CONTROLLERS
// what does this do?
// if(Meteor.isClient) {

// 	LoginFormController = RouteController.extend({
// 		onBeforeAction: function () {
// 			// check if user is already logged in
// 			if (Meteor.user()) {
// 				this.redirect('/dashboard');
// 			} else {
// 				this.next();
// 			}
// 		}
// 	});
// }


// CONFIGURATION
Router.configure({

	// define some boilerplate stuff
	layoutTemplate: 'main',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
});



// ROUTES
Router.map(function() {
	// if we don't define templates, or routes, the route and the template
	// will be assumed to be the same as the route name

	// default content
    this.route('loginForm', {
    	layoutTemplate: 'layout_login',
    	template: 'loginForm',
    	path: '/',
    	onBeforeAction: function() {
    		if(Meteor.user()) {
    			this.redirect('/dashboard');
    		} else {
    			this.next();
    		}
    	}
    });
    this.route('dashboard', {
    	waitOn: function() {
    		return [Meteor.subscribe('tasks')];
    	}
    }),
	// the about page
	this.route('about', {
		layoutTemplate: 'layout_about',
		template: 'about',
		path: 'about'
	});
	// the about page
	this.route('loading');

});



// HOOKS
// templates not in the onBeforeAction below do require a user to logged in
var requireLogin = function() {
	if(Meteor.loggingIn()) {
		this.render('loading');
	} else {
		if(Meteor.user()) {
			this.render();
		} else {
			this.redirect('/');
		}
	}
};

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {except: ['layout_login', 'loginForm', 'loading', 'spinner', 'notFound']});