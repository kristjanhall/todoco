/*
 * HELPERS AND EVENTS FOR THE "newTask" TEMPLATE
 */
Template.newTask.events({

	// deal with submiting a new task
	'submit form': function (e,t) {
		e.preventDefault();

		var q = former.objectify(t.$('#form_newTask').serializeArray());
		q.dueDate = new Date(q.dueDate).getTime();

		if(!Tasker.compose(q)) return false;

		Tasks.insert(q, function(err,r) {
			if(err) {
				console.log(err);
			} else {
				$('#newTask').modal('hide');
				$('#form_newTask')[0].reset();
			}
		});

	},
	

	'keyup #longDesc': function(e,t) {
		var chars = t.$('#longDesc')[0].value.length;
		var q = t.$('.charCount')[1];
		var max = parseInt(e.target.dataset.max);
		var charsLeft = max - chars;

		q.innerText = charsLeft;
	},

	'keyup #taskName': function(e,t) {
		var chars = t.$('#taskName')[0].value.length;
		var q = t.$('.charCount')[0];
		var max = parseInt(e.target.dataset.max);
		var charsLeft = max - chars;

		q.innerText = charsLeft;
	}	
});