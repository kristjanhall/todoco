/*
 * METHODS
 * general methods for the client side,
 * these methods are not tied to a specific template and can be called
 * on by any template helpers or event hadlers 
 */

Meteor.methods({

	// return the username of a user with given user id
	getUsername: function (id) {
		var q = Meteor.users.findOne({_id: id});

		if(typeof q === 'undefined') {
			throw new Meteor.Error(100, 'No such user', id);
		} else {
			return q.username;
		}
	},

	// returns false if there is no such user
	isUser: function(userName) {
		var q = Meteor.user.findOne({username: userName});
		return (q.hasOwnProperty('profile'));
	},

	// assign a task to a the current user
	assignTask: function (taskId) {
		// find the task in the collection
		var q = Tasks.findOne({_id: taskId});

		// check if it has already been assigned to another user
		if(q.assignedTo !== null) {
			sweetAlert("Computer says no... this task has been assigned to another user!", "error");
			return;
		}

		// update the task
		Tasks.update({_id: taskId}, {$set: {assignedTo: Meteor.user().username}});
	},

	// unassign given task from the current user
	unassignTask: function (taskId) {
		// find the task in the collection
		var q = Tasks.findOne({_id: taskId});

		// find the task in the collection
		var q = Tasks.findOne({_id: taskId});

		// update the task, but only if this user owns this task
		// we take care of this in collections.js
		Tasks.update({_id: taskId}, {$set: {assignedTo: null}});	
	},

	// attach a resolution to a task, and mark said task as resolved
	postResolution: function (task) {
		// get the current time
		var now = new Date().getTime();

		// update relivant fields
		Tasks.update({_id:task.id}, {$set: {resolvedAt: now, resolution: task.res, resolved: 1}}, function(err, r) {
			// note, this error will be posted to the server console!
			if(err) {
				console.log(err);
				return false;
			}
			return true;
		});
	}
});