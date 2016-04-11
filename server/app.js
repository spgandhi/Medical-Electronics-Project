patientFiles.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

patientFiles.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});

Meteor.methods({

	newFileUploaded: function(file, patient_id){
		Meteor.users.update({_id: patient_id}, {$push: {'profile.reports': file}});
		return;
	},

	getReports: function(owner){
		return patientFiles.find({'metadata.owner' : owner}).forEach(function(doc){
			doc.owner = Meteor.users.findOne({_id: doc.metadata.owner});
		});
	},

	addLogs: function(patient, data){
		Meteor.users.update({_id: patient}, {$push: {'profile.logs': data}});
		return;
	}
})