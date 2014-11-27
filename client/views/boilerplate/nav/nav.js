Template.nav.events({
	'click .viewFilter': function (e,t) {
		var filters = [];

		// we need to wait a sec before we start collecting the toggled
		// filters, because it takes bootstrap a moment to add the active
		// class to the classList...
		Meteor.setTimeout(function () {
			var q = t.$('.viewFilter');

			for(var i = 0; i < q.length; i++) {
				// swwep up toggled filters
				if(_.contains(q[i].classList, "active")) filters.push(q[i].dataset.filter);
			}

			Session.set('viewFilter', filters);
		}, 100);
	}
});