/*
 * HELPERS AND EVENTS FOR THE "task" TEMPLATE
 */
 
Template.task.helpers({
	// createDate is a Unix timestamp, we want to intersect and turn to a readable format 
	createdDate: function(t) {
		var d = new Date(this.createdDate);
		return d.toLocaleDateString();
	},

	// dueDate is a Unix timestamp, we want to intersect and turn to a readable format 
	dueDate: function(t) {
		var d = new Date(this.dueDate);
		return d.toLocaleDateString();
	},

	// check if the current task was created by the current user
	me: function() {
		try{
			if(this.createdBy === Meteor.user().username) return true;
			return false;
		} catch(err) {
			return false
		}
	},

	// check if the current task is assigned to the current user
	mine: function() {
		try {
			if(this.assignedTo === Meteor.user().username) return true;
			return false;
		} catch(err) {
			return false
		}
	},

	// check it the current task has any users assigned to it
	none: function() {
		if(this.assignedTo === null) return true;
		return false;
	},

	resolved: function() {
		var q = Tasks.findOne({_id: this._id});
		return (q.resolved === 1);
	},

	isDue: function() {
		var q = Tasks.findOne({_id: this._id});
		var state = Tasker.isDue(this.dueDate, 2);

		return (state == 1);
	},

	pastDue: function() {
		var q = Tasks.findOne({_id: this._id});
		var state = Tasker.isDue(this.dueDate, 2);
		
		return (state == -1);
	},
});


Template.task.events({
	// assign a task to a user
	'click .assignTask': function (e,t) {
		// *100
		e.bubbles = false;
		e.stopPropagation();

		// get the id of the task clicked
		var id = e.target.dataset.id;
		Meteor.call('assignTask', id, function (err, r) {
			if(err) console.log(err);
		});
	},

	// unassign a task from a user	
	'click .unassignTask': function (e,t) {
		// Grap the event so it will not bubble down
		e.bubbles = false;
		e.stopPropagation();

		// get the id of the task clicked
		var id = e.target.dataset.id;
		Meteor.call('unassignTask', id, function (err, r) {
			if(err) console.log(err);
		});
	},

	// display this tasks detailed information
	'click .taskItem': function(e,t) {
		// get the id of the clicked task
		var id = e.currentTarget.dataset.id;

		// setup the task detail for display
		Session.set('taskDetail', id);
		Meteor.setTimeout(function() {
			$('#taskDetail').modal('show');
		}, 10);
	}
});