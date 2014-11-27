/*
 * HEPLERS AND EVENT HANDLERS FOR "header" TEMPLATE
 */

Template.header.helpers({
	// return the currents user username
	username: function () {
		if (Meteor.user()) return Meteor.user().username;
	}
});

Template.header.events({
	// attach a click event to the slogan element
	'click .slogan': function () {
		Router.go('/dashboard');
	}
});