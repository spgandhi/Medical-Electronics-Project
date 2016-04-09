angular.module('ME').controller('FindPatient', ['$scope', 'toastr', 'Upload', function ($scope, toastr, Upload) {
	console.log('ME Project');

	$scope.findPatient = function(){

		Meteor.subscribe('findUser', $scope.patient_id, function(err, user){
			
			if(err){
				toastr.error('There was an error.', 'Error');
				return;
			}

			$scope.found_patient = Meteor.users.findOne({_id: $scope.patient_id});
			$scope.searchDone = true;
			
			if(!$scope.found_patient)
				toastr.error('No User found!', 'Error');
			else{
				toastr.success('User Found', 'Success');
			}

		})
	}

	$scope.uploadFile = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
       patientFiles.insert(file, function (err, fileObj) {
        if(err)
        	toastr.error('There was some error uploading the file', 'Error');
        else{
        	toastr.success('File Uploaded', 'Success');
        }
      });
    };
    // for multiple files:

}])