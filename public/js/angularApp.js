var app = angular.module('personnelManagement', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });
    
  $stateProvider
    .state('list', {
      url: '/list/{filter}',
      templateUrl: '/list.html',
      controller: 'ListCtrl',
      resolve: {
        postPromise: ['personnelFactory', function(personnelFactory){
            return personnelFactory.getAll();
        }]
        }
    });    

  $stateProvider
    .state('about', {
      url: '/about',
      templateUrl: '/about.html',
      controller: 'AboutCtrl'
    });
    
  $stateProvider
    .state('create', {
      url: '/create',
      templateUrl: '/create.html',
      controller: 'CreateCtrl'
    });
    
  $stateProvider
    .state('view', {
      url: '/view/{id}',
      templateUrl: '/view.html',
      controller: 'ViewCtrl',
      resolve: {
            person: ['$stateParams', 'personnelFactory', function($stateParams, personnelFactory) {
                return personnelFactory.get($stateParams.id);
            }]
      }
    });
    
  $urlRouterProvider.otherwise('home');
}]);

app.factory('personnelFactory', ['$http', function($http){
    
        
    var o = {
        personnelFactory: []
    };
    
    o.getAll = function() {
        return $http.get('/list').success(function(data){
          angular.copy(data, o.personnelFactory);
        });
    };
    
    o.get = function(id) {
      return $http.get('/view/' + id).then(function(res){
        return res.data;
      });
    };
    
    o.create = function(person) {
        console.log('from create ' + person.firstName);
        return $http.post('/add', person).success(function(data){
            o.personnelFactory.push(data);
        });
    };
    
    o.update = function(person) {
      console.log('from update ' + person.firstName);
        return $http.put('/view/' + person._id + '/update', person)
    .success(function(data){
      person.firstName = "Updated!!!";
    });
    };
    
    /*
    o.create = function(post) {
        return $http.post('/add', post).success(function(data){
            o.posts.push(data);
        });
    };
    
    o.personnelFactory = [
        {firstName: "Ryan", 
        middleName: "Palacios", 
        lastName: "Salvador", 
        birthdate: "09/08/1983", 
        gender: "Male", 
        maritalStatus: "Married", 
        occupation: "Software Dev", 
        contactNumber: "09175138559"
        },
        {firstName: "Jay Alfred", 
        middleName: "Salazar", 
        lastName: "Montemayor", 
        birthdate: "10/20/1983", 
        gender: "Male", 
        maritalStatus: "Married", 
        occupation: "Tester", 
        contactNumber: "09159479110"
        }
    ]
    */
  return o;
}]);

app.controller('MainCtrl', ['$scope', 'personnelFactory', function($scope, personnelFactory){
  $scope.appTitle = 'Project Small Potato';
    
  $scope.personnel = personnelFactory.personnelFactory;
    
}]);

app.controller('ListCtrl', ['$scope', 'personnelFactory', function($scope, personnelFactory){
   
  $scope.personnel = personnelFactory.personnelFactory;
    
}]);

app.controller('AboutCtrl', ['$scope', function($scope){
  $scope.pageHeader = 'Project Small Potato About Page';
}]);

app.controller('CreateCtrl', ['$scope', 'personnelFactory', function($scope, personnelFactory) {
  $scope.pageHeader = 'Add Patient';
    
    $scope.personnel = personnelFactory.personnelFactory;
    
    
    $scope.addPatient = function(){
      personnelFactory.create({
          firstName: $scope.firstName, 
          middleName: $scope.middleName, 
          lastName: $scope.lastName, 
          birthdate: $scope.birthdate, 
          gender: $scope.gender, 
          maritalStatus: $scope.maritalStatus, 
          occupation: $scope.occupation, 
          contactNumber: $scope.contactNumber
      });        
        
      $scope.firstName = "";
      $scope.middleName = "";
      $scope.lastName = "";
      $scope.birthdate = "";
      $scope.gender = "";
      $scope.maritalStatus = "";
      $scope.occupation = "";
      $scope.contactNumber = "";
      
    };
}]);

app.controller('ViewCtrl', ['$scope', 'personnelFactory', 'person', function($scope, personnelFactory, person) {
    $scope.pageHeader = 'View Patient Details';
    
    $scope.personnelFactory = personnelFactory;
    
    $scope.person = person;
    
    $scope.updatePerson = function(person){ 
      personnelFactory.update(person);        
    };
      
}]);