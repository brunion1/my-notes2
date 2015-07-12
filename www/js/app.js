var app = angular.module('my-notes', ['ionic', 'mynotes.notestore']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('list', {
    templateUrl : 'templates/list.html',
    url : '/list'
  });
  
  $stateProvider.state('add',{
    templateUrl : 'templates/edit.html',
    url : '/add',
    controller : 'AddCtrl'
  })
  $stateProvider.state('edit', {
    url : '/edit/:noteId',
    templateUrl : 'templates/edit.html',
    controller : 'EditCtrl'
  })
  
  $urlRouterProvider.otherwise('/list');
})

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


app.controller('ListCtrl', function($scope, NoteStore){
  $scope.notes = NoteStore.list();
});

app.controller('EditCtrl', function($scope, $state, NoteStore){
  $scope.note = angular.copy(NoteStore.get(($state.params.noteId)));
  $scope.noteId = $state.params.noteId;
  $scope.save = function(){
    NoteStore.update($scope.note);
    $state.go('list');
  }
});

app.controller('AddCtrl', function($scope, $state, NoteStore){
  $scope.note = {
    id: new Date().getTime().toString(),
    title : '',
    description : ''
  }

  $scope.save = function(){
    NoteStore.create($scope.note);
    $state.go('list');
  }
});
