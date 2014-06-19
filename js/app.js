var app = angular.module("stateFairFood", ["ngRoute"]);
var urlBase = "http://localhost:1337";

app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "views/list.html",
	})
	.when("/vendor/:id", {
		templateUrl: "views/vendor.html"
	})
	.otherwise({
		redirectTo: "/"
	});
});

app.controller("ListController", function($http) {
	var vendors;
	var that = this;
		
	this.loadList = function() {
		$http.get(urlBase+"/vendor/find", {timeout: 1000}).success(function(data) {
			that.vendors = data;
			localStorage.setItem("vendorList", JSON.stringify(data));
			console.log("Online");
		}).error(function() {
			that.vendors = JSON.parse(localStorage.getItem("vendorList"));
			// Could make recursive to try again if error
			console.log("Offline");
		});
	};
	
	this.loadList();
});

app.controller("VendorController", function($http) {
	
});