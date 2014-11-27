
// Tasks contains all resolved and unresolved tasks
Tasks = new Meteor.Collection('tasks');

/*
 * SOME LIBRARY FUNCTIONS TO USE THROUGHOUT THE PROJECT
 */


 former = {
 	// jquery can serialize forms for an array of objects with name:value
 	// pair (singluar) - objectify translates that array to an object of 
 	// name:value pairs
 	//
 	// Note that if any two form attributes have the same name the latter
 	// will prevail
 	objectify: function(serializedArrayData) {
 		var q = serializedArrayData;
 		var obj = {};

 		for(var i = 0; i < q.length; i++) {
 			// underscore magic
 			if(!(_.has(q[i], 'name') && _.has(q[i], 'value'))) continue;
 			obj[q[i].name] = q[i].value;
 		}

 		return obj;
 	}
 }