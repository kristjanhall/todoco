
// Tasks contains all resolved and unresolved tasks
Tasks.allow({
	insert: function (userId, doc) {
		if(userId) return true;
	},

	update: function (userId, doc, fields, modifier) {

		// we need to let users assign and unassign them selfs form tasks
		if(_.has(modifier.$set, "assignedTo")) {

			// only allo users to assign them selfs (not others) to tasks
			if(doc.assignedTo === null)
				return (modifier.$set.assignedTo === Meteor.user().username);

			// only allow users to unassign them selfs (not others) from tasks
			if(modifier.$set.assignedTo === null) {
				return (doc.assignedTo === Meteor.user().username);
			}
		}

		// only allow the task owner to alter other properties of the task
		if(userId === doc.owner) return true;
		return false;
	},
	
	remove: function (userId, doc) {
		// only allow tasks to be deleted by it's creator
		if(userId === doc.owner) return true;
		return false;
	}
});