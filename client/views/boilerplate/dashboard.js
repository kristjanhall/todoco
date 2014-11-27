/*
 * HELPERS AND EVENTS FOR THE "dashboard" TEMPLATE
 */
Template.dashboard.helpers({
	// get list of all task, with applied view filters
	tasks: function() {
		// get the view filters
		var filter = Session.get('viewFilter')

		// if all the toggles are in the filter collection
		// we can just fetch all the tasks
		if(typeof filter === "undefined" ||
			filter === "undefined" ||
			filter.length == 5) {

			return Tasks.find({},{sort: {createdDate: -1}});
		}


		// if on the other hand they are not we need to collect the tasks
		// based on our filters
		// this can get tricky since each task can pass multiple filters
		// so we need to be clever in sweeping up only one instance of
		// each task
		var tasks = {};
		var filters = {};

		// filter: due
		if(_.contains(filter, "due")) {
			var now = timemachine.base(new Date().getTime())-1000;
			var then = now + (1000*60*60*48);

			filters['dueDate'] = {$gt: now, $lt: then};
		}

		// filter: past due
		if(_.contains(filter, "past")) {
			var now = new Date().getTime();
			var then = timemachine.base(now);

			filters['dueDate'] = {$lt: then};
		}

		// filter: byme
		if(_.contains(filter, "byme")) {
			filters['owner'] = Meteor.userId();
		}

		// filter: forme
		if(_.contains(filter, "forme")) {
			filters['assignedTo'] = Meteor.user().username;
		}

		// filter: unresolved
		if(_.contains(filter, "unresolved")) {
			filters['resolved'] =  0;
		}

		// filter: resolved
		if(_.contains(filter, "resolved")) {
			filters['resolved'] =  1;
		}

		return  Tasks.find(filters, {sort: {createdDate: -1}}).fetch();

		// the template wants an array of objects, not
		// object of objects, so we need to serialize our tasks
		return viewSweeper.serialize(tasks);

	},
});


// make sure we clean up when we leave...
// because user might log out and in again with a different user
Template.dashboard.destroyed = function () {
	Session.set('viewFilter', undefined);
	Session.set('taskDetail', undefined);
};


// santas litle helper
viewSweeper = {
	// update an object of task with an array of tasks
	// task id is key here so we only end up with on
	// set of each task
	// popObject: function(obj, taskArray) {
	// 	if(taskArray.length > 0) {
	// 		for(var i = 0; i < taskArray.length; i++) {
	// 			obj[taskArray[i]._id] = taskArray[i];
	// 		}
	// 	}
	// },

	// take an object of objects and turn them into array of objects
	serialize: function(object) {
		var objArr = [];

		for(var key in object) objArr.push(object[key]);

		// sort the thing
		objArr.sort(function (a, b) {
			if (a.createdDate < b.createdDate) {
				return 1;
			}
			if (a.createdDate > b.createdDate) {
				return -1;
			}
			// a must be equal to b
			return 0;
		});

		return objArr;
	}
}