requirejs.config({
    baseUrl: "js/",
    paths: {
        'microtemplates': 'lib/microtemplates/index',
        'jquery': 'lib/jquery/dist/jquery',
        'fs': 'lib/fs/dist/fs',
        'text': 'lib/text/text',
    },
    optimizeAllPluginResources: true,
    waitSeconds: 90
    // "shim":{
    //     'jquery': 'lib/jquery/dist/jquery',
    //     'microtemplates': 'lib/microtemplates/index'
    // }
});

requirejs(
    ['Model', 'Controller'],
    function (Model, Controller, View) {
        console.log('[localApp] init: ', Model, Controller)

    }
);