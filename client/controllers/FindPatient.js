angular.module('ME').controller('FindPatient', ['$scope', 'toastr', 'Upload', '$state',function ($scope, toastr, Upload, $state) {

	$scope.patient_id = '';
	$scope.patient_email = '';

	$scope.getURL = function(report){
		return report.url();
	}

	$scope.findPatient = function(){


		if( (!$scope.patient_id || $scope.patient_id == '') ){
			options = { $or: [ { "emails.address" : $scope.patient_email }, { "profile.dob": $('#dob-search').val() } ] }
			console.log(options);
		}else{
			options = {_id : $scope.patient_id};
		}


		Meteor.subscribe('findUser', options, function(err, user){
			console.log(Meteor.users.findOne(options));
			if(err){
				toastr.error('There was an error.', 'Error');
				return;
			}

			$scope.patient = Meteor.users.findOne(options);
			$scope.searchDone = true;

			$scope.$digest();

			if($scope.patient && $scope.patient._id == $scope.currentUser._id){
				$state.go('profile');
			}
			
			if(!$scope.patient)
				toastr.error('No User found!', 'Error');
			else{
				toastr.success('User Found', 'Success');
				console.log($scope.patient.profile.dob);
				$('#dob-pat').val($scope.patient.profile.dob);
				// if($scope.patient.profile.profile_status == 'public'){

					var d = new Date();
					var ISODate = d.toISOString();

					Meteor.call('addLogs', $scope.patient._id, {type: 'view', by: $scope.currentUser._id, name:$scope.currentUser.profile.name, date: ISODate});

					Meteor.subscribe('getUserReports', $scope.patient._id, function(err, answer){
						if(err)
							toastr.error('Error fetching files!', 'Error');
						else{
							$scope.reports = [];
							
							patientFiles.find(
									{
										$and: [ 
												{'metadata.owner': $scope.patient._id }, 
												{
													$or: [
														{'metadata.uploaded_by' : $scope.currentUser._id},
														{'metadata.patient_privacy': 'public','metadata.doc_privacy': 'public'}
														
													]
												}
											]
									}).forEach(function(doc){
										doc.uploaded_by = Meteor.users.findOne({_id: doc.metadata.uploaded_by});
										doc.url = doc.url();
										$scope.reports.push(doc);
									});

									console.log($scope.reports);
						}

						$scope.$digest();

					})
				// }

			}

		})
	}

	$scope.uploadFile = function() {

		if(!$scope.file || !$scope.file.file){
			toastr.error('Please select a file.', 'Error');
			return;
		}

		if(!$scope.file.doctor_privacy){
			toastr.error('Please select privacy option.', 'Error');
			return;
		}


    	if ($scope.form.file.$valid && $scope.file.file) {
        	$scope.upload($scope.file.file);
    	}
    };

    // upload on file select or drop
    $scope.upload = function (file) {

    	var newFile = new FS.File(file);
      	newFile.metadata = {owner: $scope.patient._id, uploaded_by: $scope.currentUser._id, comment: $scope.file.file_comment, doc_privacy: $scope.file.doctor_privacy, patient_privacy: 'public'};

       patientFiles.insert(newFile, function (err, fileObj) {
        if(err)
        	toastr.error('There was some error uploading the file', 'Error');
        else{
        	uploadedFile = {
        		file_id: fileObj._id,
        		uploaded_by: $scope.currentUser._id,
        		doc_privacy: fileObj.metadata.doc_privacy,
        		patient_privacy: fileObj.metadata.patient_privacy
        	}
        	Meteor.call('newFileUploaded', uploadedFile, $scope.patient._id, function(err, msg){
        		if(err)
        			toastr.error(err.reason, 'Error');
        		else{
        			toastr.success('File Uploaded', 'Success');		
        			$scope.file = {};
        			var d = new Date();
					var ISODate = d.toISOString();
        			Meteor.call('addLogs', $scope.patient._id, {type: 'upload', by: $scope.currentUser._id, name: $scope.currentUser.profile.name, date: ISODate, filename: fileObj.original.name });
        		}
        	})
        }
      });
    };
    // for multiple files:

}])