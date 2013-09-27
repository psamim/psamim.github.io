posts = [

	{title:'Quickly open a tmux pane in Vim' ,
	url: '/2013/09/24/Using-tmux-and-vim.html',
	tags: [
		
			'vim',
		
			'tmux',
		
		]},

	{title:'First Post' ,
	url: '/2013/09/24/First-Post.html',
	tags: [
		
			'story',
		
			'jekyll',
		
			'yaml',
		
			'note taking',
		
		]},

	{title:'Detect print action in Javascript' ,
	url: '/2013/09/24/Detect-print-action-with-JS.html',
	tags: [
		
			'javascript',
		
			'print',
		
		]},

];

tags = [
	
	{name:'javascript',weight:12},
	
	{name:'print',weight:12},
	
	{name:'story',weight:12},
	
	{name:'jekyll',weight:12},
	
	{name:'yaml',weight:12},
	
	{name:'note taking',weight:12},
	
	{name:'vim',weight:12},
	
	{name:'tmux',weight:12},
	
];


 wikiApp = angular.module('wiki',['ngRoute']).config( function($routeProvider) {
 $routeProvider.when('/tag/:name', {
 		        controller: PostCtrl,
 	 			template: '<div></div>'
 		           });
 });

function PostCtrl($scope,  $routeParams) {
	console.log($routeParams);
	$scope.search = $routeParams.name;
	console.log($scope.search);
	$scope.posts = posts;
	$scope.tags = tags;
	$scope.args = arguments;
	$scope.tagFilter = function() {
	}
}
