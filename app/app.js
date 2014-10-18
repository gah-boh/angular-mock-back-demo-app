;(function() {

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'templates/home.html'
		})
		.state('search', {
			url: '/search?q',
			controller: 'SearchResultsCtrl as searchResultsCtrl',
			templateUrl: 'templates/search-results.html'
		})
		.state('userlist', {
			url: '/userlist',
			controller: 'UserListCtrl as userListCtrl',
			templateUrl: 'templates/user-list.html'
		})
		.state('user', {
			url: '/user/:id',
			controller: 'UserCtrl as userCtrl',
			templateUrl: 'templates/user.html'
		})
		.state('settings', {
			url: '/settings',
			controller: 'SettingsCtrl as settingsCtrl',
			templateUrl: 'templates/settings.html'
		});
});

app.controller('NavCtrl', function($state) {
	var navCtrl = this;

	navCtrl.searchQuery = "";
	navCtrl.search = function() {
		if(navCtrl.searchQuery === "") return;
		$state.go('search', {q: navCtrl.searchQuery}, {reload: true});
	};

});

app.controller('SearchResultsCtrl', function(userService, $stateParams) {
	var searchCtrl = this;

	searchCtrl.searchResults = null;

	userService.searchForUsers($stateParams.q)
		.then(function(searchResults) {
			searchCtrl.searchResults = searchResults;
		});
});

app.controller('UserCtrl', function(userService, $stateParams) {
	var userCtrl = this;
	userCtrl.user = null;

	userService.getUser($stateParams.id)
		.then(function(user) {
			userCtrl.user = user;
		});
});

app.service('userService', function($q, $http) {
	var userService = this;

	userService.getUser = function(query) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: '/user',
			data: {
				query: query
			}
		})
		.success(function(user) {
			deferred.resolve(user);
		});

		return deferred.promise;
	};

	userService.searchForUsers = function(query) {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: '/search',
			data: {
				query: query
			}
		})
		.success(function(searchResults) {
			deferred.resolve(searchResults);
		});

		return deferred.promise;
	};
});

app.controller('UserListCtrl', function(userListService) {
	var userListCtrl = this;
	userListCtrl.userlist = [];
	
	userListService.getList()
		.then(function(userlist){
			userListCtrl.userlist = userlist;
		});
});

app.service('userListService', function($q, $http) {
	var userListService = this;

	userListService.getList = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/userlist'
		})
		.success(function(userlist) {
			deferred.resolve(userlist);
		});

		return deferred.promise;
	};
});

app.controller('SettingsCtrl', function(settingsService) {
	var settingsCtrl = this;

	settingsCtrl.settings = null;

	settingsService.getSettings()
		.then(function(settings) {
			settingsCtrl.settings = settings;
		});
});

app.service('settingsService', function($q, $http) {
	var settingsService = this;

	settingsService.getSettings = function() {
		var deferred = $q.defer();

		$http({
			method: 'GET',
			url: '/settings',
		})
		.success(function(settings) {
			deferred.resolve(settings);
		});

		return deferred.promise;
	};
});

}());

