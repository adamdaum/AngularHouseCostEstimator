var myApp = angular.module('myApp',[]);

 myApp.controller('myCtrl', function($scope, $http){
     $http.get("/api/project").success(function(data){
        $scope.projects = data.objects;
     });

     $scope.addProject = function(){
        $http.post("/api/project", {
            name: $scope.inputName,
            description: $scope.inputDescription,
            vendor: $scope.inputVendor,
            hours: $scope.inputHours,
            cost: $scope.inputCost,
            start: $scope.inputStart,
            finish: $scope.inputFinish
        }).success(function(data){
            $scope.projects.push(data);

        });
         $scope.inputName = '';
         $scope.inputDescription = '';
         $scope.inputVendor = '';
         $scope.inputHours = '';
         $scope.inputCost = '';
         $scope.inputStart = '';
         $scope.inputFinish = '';
     };

     $scope.deleteProject = function (project){
        $http.delete("/api/project/" + project.id).success(function(response) {
            $scope.projects.splice($scope.projects.indexOf(project), 1)
        })
    };

    $scope.editorEnabled = false;


    $scope.enableEditor = function(){
        $scope.editorEnabled = true;
    };

    $scope.disableEditor = function(){
        $scope.editorEnabled = false;
    };

    $scope.save = function(project){
        $http.put("/api/project/" + project.id, project);
        $scope.disableEditor(project);
    };



     $scope.getTotal = function(){
       var total = 0;
         for(var i=0; i < $scope.projects.length; i++){
             var project = $scope.projects[i];
             total += project.cost;
         }
         return total
     };

 });


