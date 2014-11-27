// Fixture data
if (Meteor.users.find().count() === 0) {
	installFixtures();
}

function installFixtures() {
	var now = new Date().getTime();

	if (Meteor.users.find({username: 'ark'}).count() === 0) {
		// create first user
		var bob = Accounts.createUser({
			username: 'bob',
			password: 'bob',
			email: 'bob@anon.com',
			profile: {
				name: 'TÖL306 User',
				created: now
			}
		});

		var alice = Accounts.createUser({
			username: 'alice',
			password: 'alice',
			email: 'alice@anon.com',
			profile: {
				name: 'TÖL306 User',
				created: now
			}
		});

		var carol = Accounts.createUser({
			username: 'carol',
			password: 'carol',
			email: 'carol@nsa.org',
			profile: {
				name: 'TÖL306 User',
				created: now
			}
		});

		// add couple of tasks to the task collection
		// console.log(Tasks);

		Tasks.insert({
			taskName: "Send Alice text",
			longDesc: "Make a set of keys, encrypt message and senda to Alice",
			createdDate: now - (240000*1000),
			dueDate: now - (120000*1000),
			createdBy: "bob",
			owner: bob,
			assignedTo: "bob",
			resolvedAt: null,
			resolution: null,
			resolved: 0
		});

		Tasks.insert({
			taskName: "Publish key",
			longDesc: "Publish the public key... so I can recive secure messages.",
			createdDate: now - (200000*1000),
			dueDate: now - (100000*1000),
			createdBy: "bob",
			owner: bob,
			assignedTo: "bob",
			resolvedAt: null,
			resolution: null,
			resolved: 0
		});
		
		Tasks.insert({
			taskName: "Find public key",
			longDesc: "Find out Bob's public key and use it to send him a very important message.",
			createdDate: now - (160000*1000),
			dueDate: now - (80000*1000),
			createdBy: "alice",
			owner: alice,
			assignedTo: "alice",
			resolvedAt: null,
			resolution: null,
			resolved: 0
		});

		Tasks.insert({
			taskName: "Intercept",
			longDesc: "Perform a man in the middle attack, need to intercept theyre comunicay.",
			createdDate: now - (140000*1000),
			dueDate: now - (70000*1000),
			createdBy: "carol",
			owner: carol,
			assignedTo: "carol",
			resolvedAt: null,
			resolution: null,
			resolved: 0
		});


	}
}
