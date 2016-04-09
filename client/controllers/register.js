angular.module('ME').controller('Register', ['$scope', 'toastr', '$state', function ($scope, toastr, $state) {
	
	$scope.registerMe = function(){
		console.log($scope.newUser);
		// return;

		Accounts.createUser({email: $scope.newUser.email, password: $scope.newUser.password, profile:$scope.newUser.profile}, function(err){
			if(err)
				toastr.error(err.reason, 'Error');
			else{
				toastr.success('Registration Successful', 'Success');
				$scope.newUser = {};
				$state.go('home');
			}
		});
	}
}])