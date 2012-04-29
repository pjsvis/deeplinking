angular.module('project', ['mongolab'])
    .config(function($routeProvider) {
        $routeProvider.
            when('/list', {controller:ListCtrl, template:'../templates/list.html'})
            .when('/edit/:projectId', {controller:EditCtrl, template:'../templates/detail.html'})
            .when('/new', {controller:CreateCtrl, template:'../templates/detail.html'})
            .when('/about', {controller:AboutCtrl, template:'../templates/about.html'})
            .when('/test', {controller:TestCtrl, template:'../templates/test.html'})
            .otherwise({redirectTo:'/list'});
    });


function AboutCtrl($scope, Project){
}

function TestCtrl($scope, Project){
}

function ListCtrl($scope, Project) {
    $scope.projects = Project.query();
}


function CreateCtrl($scope, $location, Project) {
    $scope.save = function() {
        Project.save($scope.project, function(project) {
            $location.path('/edit/' + project._id.$oid);
        });
    }
}


function EditCtrl($scope, $location, $routeParams, Project) {
    var self = this;

    Project.get({id: $routeParams.projectId}, function(project) {
        self.original = project;
        $scope.project = new Project(self.original);
    });

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.project);
    }

    $scope.destroy = function() {
        self.original.destroy(function() {
            $location.path('/list');
        });
    };

    $scope.save = function() {
        $scope.project.update(function() {
            $location.path('/list');
        });
    };
}