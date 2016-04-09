Meteor.publish('findUser', function(patient_id){
	console.log(patient_id);
	return Meteor.users.find({_id: patient_id});
})