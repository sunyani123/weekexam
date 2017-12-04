app.controller('main',['$scope','$http',function($scope,$http){//注入$http和$scope
    $http({
        url:'http://localhost:8080/datajson'//匹配路径跨域获取数据
    }).then(function(result){
        $scope.data=result;//$scope.data接收数据
    },function(erroe){
        return -1;
    })
}]);