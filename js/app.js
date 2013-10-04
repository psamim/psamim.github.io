wikiApp = angular.module('wiki',['ngRoute','ngAnimate']);

var homeTemplate =
	'<span class="search"><input id="search" type="search" placeholder="Search" ng-model="search" />' +
	'<span ng-show="clearButton()" ng-click="clearSearch()"><i class="icon-cancel"></i></span>' +
	'<span ng-show="!clearButton()" ng-click="clearSearch()"><i class="icon-search"></i></span>' +
	'</span>' +
	'<ul class="tags">' +
	'<li  ng-repeat="tag in tags | orderBy:\'weight\':true" class="tag" style="font-size:{{tag.weight}}%" >' +
	'<a ng-href="#/tag/{{tag.name}}" ng-click="tagFilter()">{{ tag.name }}</a>' +
	'</ili>' +
	'</ul>' +
	'<ul class="posts" > <li class="reveal-animation" ng-repeat="post in posts | filter:search"> » <a href="{{ post.url }}">{{ post.title }}</a> </li> </ul>';


 wikiApp.value('$anchorScroll', angular.noop);
 wikiApp.config( function($routeProvider) {
	$routeProvider.when('/tag/:name', {
		controller: PostCtrl,
		template: homeTemplate
     }).when('/', {
		controller: PostCtrl,
		template: homeTemplate
     });
 });

function PostCtrl($scope, $routeParams, $http) {
	$http.get('/js/posts.json?6', {cache:true}).success( function(data) {
		data.tags.splice(0,1);
		data.posts.splice(0,1);
		$scope.tags = data.tags;
		$scope.posts = data.posts;
	});

	$scope.search = $routeParams.name;
	console.log($routeParams);
	$scope.tagFilter = function() {
		$scope.search = $routeParams.name;
	};

	$scope.clearButton = function () {
		return !( $scope.search == null || $scope.search == '');
	};

	$scope.clearSearch = function() {
		$scope.search = '';
	};
}
