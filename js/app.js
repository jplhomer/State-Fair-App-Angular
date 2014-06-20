var app = angular.module("stateFairFood", ["ngRoute"]);
var urlBase = "http://localhost:1337";

app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "views/list.html",
		})
		.when("/vendor/:id", {
			templateUrl: "views/vendor.html",
		})
		.otherwise({
			redirectTo: "/"
		});
});

app.controller("ListController", function($http) {
	var vendors;
	var that = this;

	this.loadList = function() {
		$http.get(urlBase + "/vendor/find", {
			timeout: 1000
		}).success(function(data) {
			that.vendors = data;
			localStorage.setItem("vendorList", JSON.stringify(data));

			console.log("Online");

		}).error(function() {
			that.vendors = JSON.parse(localStorage.getItem("vendorList"));
			// Could make recursive to try again if error
			console.log("Offline");
		});
	};


	function geoSorter(position) {
		var lat = position.coords.latitude;
		var long = position.coords.longitude;

		console.log(lat, long);
	}

	function geoErrHandle(err) {
		console.log("Error");
	}

	navigator.geolocation.getCurrentPosition(geoSorter, geoErrHandle, {
		enableHighAccuracy: false,
		// Could actually fail if gps is turned off because it won't try wifi/cellular
		// Not true in every device
	});


	this.loadList();
});

app.controller("VendorController", function($routeParams, $http) {
	var vendorId = $routeParams.id;
	var that = this;
	var vendor;

	this.getDetails = function() {
		$http.get(urlBase + "/vendor/" + vendorId, {
			timeout: 1000
		}).success(function(data) {
			that.vendor = data;

			console.log(data);

		}).error(function() {
			vendorId = vendorId - 1;
			var offlineData = JSON.parse(localStorage.getItem("vendorList"))[vendorId];

			that.vendor = offlineData;
		});
	};


	this.getDetails();
});
