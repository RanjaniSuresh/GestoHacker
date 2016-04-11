angular.module('foodController', [])

// inject the Food service factory into our controller
.controller('mainController', ['$scope', '$http', 'Foods', 'alertify', function($scope, $http, Foods, alertify) {
	$scope.formData = {};
	$scope.loading = true;
	$scope.total = 0;

	$scope.images = [
		'../../images/image_1.jpg',
		'../../images/image_2.jpg',
		'../../images/image_3.jpg',
		'../../images/image_4.jpg',
		'../../images/image_5.jpg',
		'../../images/image_6.jpg'
	];

	// GET =====================================================================
	// when landing on the page, get all foods and show them
	// use the service to get all the foods
	Foods.get()
		.success(function(data) {
			$scope.foods = data;
			$scope.loading = false;
		});

	Foods.total()
		.success(function(data) {
			console.log("Total = " + data);
			$scope.total = data;
			$scope.loading = false;
		});


	// CREATE ==================================================================
	// when submitting the add form, send the text to the node API
	$scope.createFood = function() {

		// validate the formData to make sure that something is there
		// if form is empty, nothing will happen
		if ($scope.formData.name != undefined) {
			if ($scope.formData.price == undefined)
				$scope.formData.price = 1;

			$scope.loading = true;

			// Create Food function call  
			Foods.create($scope.formData)
			// on successful creation, call our get function to get all the new foods
			.success(function(data) {
				Foods.total()
					.success(function(data) {
						$scope.total = data;
						$scope.loading = false;
						alertify.success('Successfully Added Food!');
					});
				$scope.formData = {}; // Emptying it to create a new one
				$scope.foods = data; // assign our new list of foods
			});

		}
	};

	// DELETE ==================================================================
	// food deletion
	$scope.deleteFood = function(id) {
		$scope.loading = true;
		// getting confirmation so as to delete food
		alertify.confirm('Do you really want to delete?', function () {
			Foods.delete(id)
				
				.success(function(data) {
					Foods.total()
						.success(function(data) {
							$scope.total = data;
							$scope.loading = false;
							alertify.error('Successfully deleted!');
						});

					$scope.foods = data; // assign our new list of foods
				});
		});
	};

	$scope.toggle = function(id) {

	};

}]);
