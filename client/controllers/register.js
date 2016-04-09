angular.module('ME').controller('Register', ['$scope', 'toastr', '$state', function ($scope, toastr, $state) {


	
	$scope.registerMe = function(){
		console.log($scope.newUser);
		// return;

		if($scope.newUser.profile.name ==""){
			toastr.error('Enter Name', 'Name');
			return;
		}

		if($scope.newUser.profile.birthdate==""){
			toastr.error('Enter Birthdate', 'birthdate');
			return;
		}

		if($scope.newUser.profile.gender==""){
			toastr.error('Enter Gender','Gender');
			return;
		}

		if($scope.newUser.password.length<8){
			toastr.error('Password length should be grater than 8', 'password');
		}

		if($scope.newUser.email==""){
			toastr.error('Enter Email ID', 'Email');
			return;
		}
		else if($scope.newUser.email.indexOf('@')==-1 || $scope.newUser.email.indexOf('.')==-1) {
			toastr.error('Enter valid Email ID', 'Email');
			return;
		}

		if($scope.newUser.profile.blood_group==""){
			toastr.error('Provide Blood Group','Blood Group');
			return;
		}
		
		if($scope.newUser.profile.primary_contact_no=""){
			toastr.error('Enter contact no', 'contact');
			return;
		}
		else if(isNaN($scope.newUser.profile.primary_contact_no) || $scope.newUser.profile.primary_contact_no.length!=10 ){
			toastr.error('Invalid contact no','contact');
			return;
		}


		if($scope.newUser.profile.address=""){
			toastr.error('Enter address', 'Address');
			return;
		}

		if($scope.newUser.profile.profile_status=""){
			toastr.error('submit profile status', 'public/private');
			return;
		}

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