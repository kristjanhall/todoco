/*
 * PUBLICATIONS OF COLLECTIONS
 */

 Meteor.publish("tasks", function() {
	return Tasks.find();
});

  Meteor.publish("deadfile", function() {
	return Deadfile.find();
});