angular.module('ME').controller('FindPatient', ['$scope', 'toastr', function ($scope, toastr) {
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
}])