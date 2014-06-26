var disqus_shortname = 'psamim';
//var disqus_developer = true ? 1 : 0;
//
var wikiApp = angular.module('wiki',['ngRoute','ngAnimate','ngSanitize']);
//
var waitTemplate = '<div ng-show="wait" class="loading"><div id="movingBallG"><div class="movingBallLineG"></div>' +
					'<div id="movingBallG_1" class="movingBallG"></div></div></div>';

var homeTemplate =
	'<h1 class="title"><a href="/#/">Personal Wiki</a></h1>' +
	'<section id="main"><span class="search"><input id="search" type="search" placeholder="Search" ng-model="search" />' +
	'<span ng-show="clearButton()" ng-click="clearSearch()"><i class="icon-cancel"></i></span>' +
	'<span ng-show="!clearButton()" ng-click="clearSearch()"><i class="icon-search"></i></span>' +
	'</span>' +
	waitTemplate +
	'<ul class="tags">' +
	'<li ng-repeat="tag in tags | orderBy:\'weight\':true" class="tag" style="font-size:{{tag.weight}}%" >' +
	'<a ng-href="#/tag/{{tag.name}}" ng-click="tagFilter()">{{ tag.name }}</a>' +
	'</ili>' +
	'</ul>' +
	'<ul class="posts" > <li class="repeat-item" ng-repeat="post in posts | filter:search"> » ' +
	'<a href="/#/post{{ post.url }}">{{ post.title }}</a> </li> </ul></sectioni>';

var postTemplate = '<section id="main" ><div class="view" ng-animate ng-bind-html="content"></div><div id="disqus_thread"></div></section>';

var notFoundTemplate = '<section id="main"><div class="not-found">404</div></section>';

//

 /*wikiApp.value('$anchorScroll', angular.noop);*/
 wikiApp.config( function($routeProvider) {
	$routeProvider.when('/tag/:name', {
		controller: HomeCtrl,
		template: homeTemplate
     }).when('/post/:url*', {
		controller: PostCtrl,
		template: postTemplate
     }).when('/:url*',{
		controller: PostCtrl,
		template: postTemplate
     }).otherwise( {
		controller: HomeCtrl,
		template: homeTemplate
     });
 });

function HomeCtrl($scope, $routeParams, $http) {
		$scope.wait = true;
	$http.get('/js/posts.json?11', {cache:true}).success( function(data) {
		data.tags.splice(0,1);
		data.posts.splice(0,1);
		$scope.tags = data.tags;
		$scope.posts = data.posts;
		$scope.wait = false;
	});

	$scope.search = $routeParams.name;
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

function PostCtrl($scope, $routeParams, $http, $sce) {
	$scope.url = $routeParams.url == 'about' ? '2013/09/24/about-me' : $routeParams.url;
	console.log($scope.url);
	$scope.content = waitTemplate;
	$http.get( '/' +  $scope.url + '.html', {cache:true}).success( function(data) {
		$scope.content = $sce.trustAsHtml(data);
		DISQUS.reset({
  			reload: true,
  			config: function () {
    			this.page.identifier = $scope.url;
    			this.page.url = 'http://www.psam.im/#!/post/' + $scope.url;
  			}
		});
	}).error(function() {
		$scope.content = notFoundTemplate;
	});
}

 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-44987148-1', 'psam.im');
  ga('send', 'pageview');
