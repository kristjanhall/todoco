/*
 * Method library for the task functionality 
 */

Tasker = {
	compose: function(data) {
		if(!this.verify(data)) return false;

		data['resolved'] = 0;
		data['resolution'] = null;
		data['resolvedAt'] = null;
		data['assignedTo'] = null;
		data['owner'] = Meteor.userId();
		data['createdBy'] = Meteor.user().username;
		data['createdDate'] = new Date().getTime();
		return true;
	},

	// verification procedure for the task data
	verify: function(data) {
		if(data.taskName.length == 0) {
			$('#newTask').modal('hide');

			sweetAlert({
				title: "Task name?",
				text: "You must give this task a name!",
				type: "error",
			},
			function() {
				$('#newTask').modal('show');
			});
			return false;
		}

		if(data.longDesc.length == 0) {
			$('#newTask').modal('hide');

			sweetAlert({
				title: "Description?",
				text: "You must put in a description for this task!",
				type: "error",
			},
			function() {
				$('#newTask').modal('show');
			});
			return false;
		}

		var d = new Date(data.dueDate);
		if(isNaN(d) || !(typeof Date(d instanceof Date && isFinite(d)))) {
			$('#newTask').modal('hide');

			sweetAlert({
				title: "Due date?",
				text: "You must put in a valid due date for this task!",
				type: "error",
			},
			function() {
				$('#newTask').modal('show');
			});
			return false;
		}
		return true;
	},

	// returns 1 if then is within certain day count of the current date
	// returns 0 if not
	// returns -1 if then > now
	// note, then must be in epoch format
	isDue: function(then, offset) {
		// get the 00:00:00 epoch
		var now = timemachine.base(new Date().getTime());
		then = timemachine.base(then);

		// has then passed?
		if(now > then) return -1;

		// use the user defined offset or a default one
		offset = offset || 2;

		// get the difference in days
		var diff = (then - now) / (1000*60*60*24);

		// is then within the offset?
		return ((diff-2) <= 0) ? 1:0;
	}
};


timemachine = {
	// take any date and find the epoch at 00:00:00 that day
	base : function(date) {
		var b = new Date(date).toLocaleDateString();
		b = new Date(b).getTime();

		return b;
	}
}