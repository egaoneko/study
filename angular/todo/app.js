var todoList = [{done: true, title : "AngularJS 독서"},
    {done: false, title: "AngularJS 공부하기"},
    {done: false, title: "개인 프로젝트 구성"}
];

function todoCtrl($scope) {
    $scope.name = "AngularJS TODO APP";
    $scope.todoList = todoList;
    $scope.addNewTodo = function(newTitle) {
        todoList.push({done:false, title:newTitle});
        $scope.newTitle = '';
    }

    $scope.archive = function() {
        for (var i = $scope.todoList.length - 1; i >= 0; i--) {
            if($scope.todoList[i].done) {
                $scope.todoList.splice(i,1);
            }
        }
    };

    $scope.remain = function() {
        var remainCount = 0;
        angular.forEach($scope.todoList, function(value, key){
            if(value.done == false) {
                remainCount++;
            }
        });
        return remainCount;
    }
};
