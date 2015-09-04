requirejs.config({
    "baseUrl": "js/",
    "paths": {
        'microtemplates': 'lib/microtemplates/index',
        'jquery': 'lib/jquery/dist/jquery',
        'fs': 'lib/fs/dist/fs',
        'text': 'lib/text/text',
    },
    'waitSeconds': 90
    // "shim":{
    //     'jquery': 'lib/jquery/dist/jquery',
    //     'microtemplates': 'lib/microtemplates/index'
    // }
});

requirejs(
    ['Model', 'Controller'],
    function (Model, Controller) {
        // requirejs(['text!/view/mainForm.html!strip'], function (html) {
        //     console.log('html = ', html);
        // });
    }
);