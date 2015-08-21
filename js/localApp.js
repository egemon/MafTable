requirejs.config({
    "baseUrl": "js/",
    "paths": {
        'microtemplates': 'lib/microtemplates/index',
        'jquery': 'lib/jquery/dist/jquery',
    },
    // "shim":{
    //     'jquery': 'lib/jquery/dist/jquery',
    //     'microtemplates': 'lib/microtemplates/index'
    // }
});

requirejs(
    ['Model', 'View', 'Controller'
    ],
    function (Model,
     View, Controller) {
        console.log('localApp start working');

        console.log('Model', Model);
        console.log('View = ', View);
        console.log('Controller = ', Controller);

    }
);