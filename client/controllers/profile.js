angular.module('ME').controller('Profile', ['$scope', 'toastr', '$state', '$rootScope', function ($scope, toastr, $state, $rootScope) {
		
    if(!$rootScope.reports_done){
        $scope.$awaitUser().then((user) =>{

            $('#dob-pro').val($scope.currentUser.profile.dob);
            console.log($scope.currentUser.profile.dob);

            Meteor.subscribe('getUserReports', $scope.currentUser._id, function(err, answer){
                if(err)
                    toastr.error('Error fetching files!', 'Error');
                else{
                    $scope.reports = [];
                    patientFiles.find({'metadata.owner': $scope.currentUser._id}).forEach(function(doc){
                        doc.uploaded_by = Meteor.users.findOne({_id: doc.metadata.uploaded_by});
                        doc.url = doc.url();
                        $scope.reports.push(doc);
                    });
                }

                console.log($scope.reports);
                $rootScope.reports_done = true;
                $scope.$digest();

            })
        })
    }
    		

	$scope.update = function(){
        
        $scope.currentUser.profile.dob = $('#dob-pro').val();

		Meteor.users.update({_id: $scope.currentUser._id},{$set: {profile:$scope.currentUser.profile}}, function(err){
			if(err)
				toastr.error(err, 'Error');
			else
				toastr.success('Profile updated!', 'Success');
		});
	}

	$scope.uploadFile = function() {

        if(!$scope.file || !$scope.file.file){
            toastr.error('Please select a file.', 'Error');
            return;
        }

        if(!$scope.file.patient_privacy){
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
      	newFile.metadata = {owner: $scope.currentUser._id, uploaded_by: $scope.currentUser._id, comment: $scope.file.file_comment, patient_privacy: $scope.file.patient_privacy, doc_privacy: 'public'};

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

        	Meteor.call('newFileUploaded', uploadedFile, $scope.currentUser._id, $scope.currentUser._id,  function(err, msg){
        		if(err)
        			toastr.error(err.reason, 'Error');
        		else{
        			toastr.success('File Uploaded', 'Success');		
        			$scope.file = {};
        			var d = new Date();
					var ISODate = d.toISOString();
        			Meteor.call('addLogs', $scope.currentUser._id ,{type: 'upload', by: $scope.currentUser._id, name: $scope.currentUser.profile.name, date: ISODate, filename: fileObj.original.name });
        		}
        	})
        }
      });
    };

}])