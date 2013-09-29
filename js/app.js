 wikiApp = angular.module('wiki',['ngRoute']).config( function($routeProvider) {
 $routeProvider.when('/tag/:name', {
 		        controller: PostCtrl,
 	 			template: '<div></div>'
 		           });
 });

function PostCtrl($scope, $routeParams, $http) {
	$http.get('/js/posts.json?5').success( function(data) {
		data.tags.splice(0,1);
		data.posts.splice(0,1);
		$scope.tags = data.tags;
		$scope.posts = data.posts;
	});
	$scope.search = $routeParams.name;
	console.log($routeParams);
	$scope.tagFilter = function() {
		$scope.search = $routeParams.name;
	}

}
