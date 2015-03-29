var app = angular.module('loginModule');
    
    app.controller('loginController', ['$scope','$http',function($scope,$http){

		 $scope.name = 'Create account';
		 $scope.signin = 'Sing in';
     $scope.userNotexist = '';
     $scope.valueemail='';
     $scope.valuepass='';


		$scope.submitSignupForm = function (){
            $http.post('/signup', {
               name: $scope.signupForm.name,
               title : $scope.signupForm.title,
               email : $scope.signupForm.email,
               password : $scope.signupForm.password            
            }).then(function onSuccess(){
               $scope.signupForm.location = true;
               window.location='/user';
            }).catch(function onError(sailsResponse){
               console.log(sailsResponse);
            }).finally(function eitheWay(){
            	 $scope.signupForm.location = false;
            })
		};
     
    $scope.submitLoginForm = function (){                    
              $http.post('/login',{
               email : $scope.loginForm.email,
               password : $scope.loginForm.password
             }).then( function onSuccess(sailsResponse){                
               $scope.userNotexist = '';
                //console.log(user.id);
                window.location = '/';
              }).catch(function onError(sailsResponse){
               // var notfoundUser = sailsResponse.status === 500;                 
                 //console.log($scope.loginForm.email);
                // console.log($scope.loginForm.password);
                 console.log(sailsResponse);
                if (sailsResponse.status === 500){
                    $scope.userNotexist = "Ooops not good !!!" ;
                    //window.location = '/login';
                    console.log('Votre mot de password est incorect');
                } 
                 
              }).finally(function eitheWay(){
                $scope.loginForm.location =false;
              })
        }

}]);


 