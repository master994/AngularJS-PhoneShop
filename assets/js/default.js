var webShop = angular.module('webShop', ['ngAnimate'])
.directive('productList', function ()
{
    return {
        templateUrl: 'assets/partials/product_partial.html',
        restrict: 'E'
    };
})
.directive('shoppingCart', function ()
{
    return {
        templateUrl: 'assets/partials/shoppingCart_partial.html',
        restrict: 'E'
    };
});

webShop.controller("ProductsCtrl", ['$scope', '$log', function ($scope, $log)
{

    $log.info("Products loaded!");

    $scope.products = [
	{
	    'name': 'Nexus S',
	    'description': 'Fast just got faster with Nexus S.', 'price': '100'
	},
	{
	    'name': 'Galaxy SIII',
	    'description': 'Fast just got faster with Galaxy S.', 'price': '200'
	},
	{
	    'name': 'Nexus S',
	    'description': 'Fast just got faster with Nexus S.', 'price': '100'
	},
    ];


}]);

webShop.controller("ShoppingCartCtrl", ['$rootScope', '$log','$scope', function ($rootScope, $log,$scope)
{

    $rootScope.cart = [];
    $rootScope.checkedIndexes = [];

    $scope.checkedIndex = function (item)
    {
        if ($rootScope.checkedIndexes.indexOf(item) === -1)
        {
            $rootScope.checkedIndexes.push(item);
            $log.info($rootScope.checkedIndexes);
        }
        else
        {
            $rootScope.checkedIndexes.splice($rootScope.checkedIndexes.indexOf(item), 1);
            $log.info($rootScope.checkedIndexes);
        }
    }

    $scope.deleteRows = function()
    {
        angular.forEach($rootScope.checkedIndexes, function (value, index)
        {
            var index = $rootScope.cart.indexOf(value);
            $log.info("Delete from index" + index);
            $rootScope.cart.splice(index, 1);
        });
        
    };

    $scope.addToCart = function (product)
    {
        $log.info("Click function in " + product.name);

        var isIn = false;

        for (i = 0; i < $rootScope.cart.length; i++)
        {
            $log.info($scope.cart[i]);
            if ($rootScope.cart[i].name == product.name)
            {
                isIn = true;
                $rootScope.cart[i].count = $rootScope.cart[i].count + 1;
                $log.info("Products already buyed. Counter increased.");
                break;
            }
        }

        if (!isIn)
        {
            $log.info("Products not in your list. We will add.");

            $rootScope.cart.push(
			{
			    name: product.name,
			    count: 1,
                checked : false
			});
        }
        $log.info("Shopping cart count " + $rootScope.cart.length);
        return;
    };

}]);

