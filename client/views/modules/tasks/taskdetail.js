/*
 * HELPERS AND EVENT HALDERS FOR "taskDetail" TEMPLATE
 */

Template.taskDetail.helpers({
	taskDetail: function () {
		return Tasks.findOne({_id: Session.get('taskDetail')});
	},

	dueDate: function() {
		var d = new Date(this.dueDate);
		return d.toLocaleDateString();
	},

	createdDate: function() {
		var d = new Date(this.createdDate);
		return d.toLocaleDateString();
	},

	resolvedAt: function() {
		var d = new Date(this.resolvedAt);
		return d.toLocaleDateString();	
	},

	// check if the current task was created by the current user
	me: function() {
		try {
			if(this.createdBy === Meteor.user().username) return true;
			return false;
		} catch(err) {
			return false;
		}
	},

	// check if the current task is assigned to the current user
	mine: function() {
		try {
			if(this.assignedTo === Meteor.user().username) return true;
			return false;
		} catch(err) {
			return false;
		}
	},

	// check it the current task has any users assigned to it
	none: function() {
		if(this.assignedTo === null) return true;
		return false;
	},
});

Template.taskDetail.events({
	'keyup #resolution': function(e,t) {
		var chars = t.$('#resolution')[0].value.length;
		var q = t.$('.charCount')[0];
		var max = parseInt(e.target.dataset.max);
		var charsLeft = max - chars;

		q.innerText = charsLeft;
	},
	
	'click .assignTask': function (e,t) {
		var id = e.currentTarget.dataset.id;

		Meteor.call('assignTask', id, function (err, r) {
			if(err) console.log(err);
		});
	},

	'click .unassignTask': function (e,t) {
		// get the id of the task clicked
		var id = e.currentTarget.dataset.id;
		Meteor.call('unassignTask', id, function (err, r) {
			if(err) console.log(err);
		});
	},

	'click .deleteTask': function (e,t) {
		// get the task id
		var id = this._id
		// we need to hide the model before we can do the sweetAlert stuff
		// otherwhise we will have a conflict
		$('#taskDetail').modal('hide');

		sweetAlert({
			title: "Are you sure?",
			text: "You will not be able to recover this task",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "Cancel",
			closeOnConfirm: false,
			closeOnCancel: true
		},
		function (isConfirm) {
			if(isConfirm) {
				console.log('delete task');
				Tasks.remove({_id: id}, function(err,r) {
					if(err) { console.log(err);
					} else {
						sweetAlert("Deleted", "Task was successfully deleted", "success");
					}
				});
			} else {
				console.log('show modal');
				$('#taskDetail').modal('show');
			}
		});
	},

	// post a resolution to a task
	'click .postResolution': function(e,t) {
		// we must have a discription of how the task was resolved
		var q = t.$('#resolution')[0].value;
		if(q.length ==0) {
			$('#taskDetail').modal('hide');

			sweetAlert({
				title: 'Computer says no!',
				text: 'You must give some discription of this tasks resolution',
				type: 'error'
			},
			function() {
				$('#taskDetail').modal('show');
			});

			return false;
		}

		Meteor.call('postResolution', {id: this._id, res: q}, function (error, result) {
			if(error) return;

			$('#taskDetail').modal('hide');
			sweetAlert("Success", "Your resolution has been posted!", "success");
		});
	},
});