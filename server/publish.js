Meteor.publish('findUser', function(options){
	console.log(options);
	console.log(Meteor.users.find(options).fetch());
	return Meteor.users.find(options);
})

Meteor.publishComposite('getUserReports', function(owner){
	return{
		find: function(){
			return patientFiles.find({'metadata.owner': owner});
		},
		children: [
			{
				find: function(file){
					return Meteor.users.find({_id: file.metadata.uploaded_by}, {fields: {'profile.name':1} })
				}
			}
		]
	}
})