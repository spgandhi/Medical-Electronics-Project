angular.module('ME').controller('Profile', ['$scope', 'toastr', '$state', function ($scope, toastr, $state) {
	
	console.log('in profile');

	$scope.update = function(){
		Meteor.users.update({_id: $scope.currentUser._id},{$set: {profile:$scope.currentUser.profile}}, function(err){
			if(err)
				toastr.error(err, 'Error');
			else
				toastr.success('Profile updated!', 'Success');
		});
	}
}])