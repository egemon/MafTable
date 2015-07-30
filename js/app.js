require(
    ['Model'
    // , 'View', 'Controller', 'jquery'
    ],
    function (Model, View, Controller, $) {
        console.log('module loaded');
        console.log('Model', Model);
        Model.startGame();
    }
);