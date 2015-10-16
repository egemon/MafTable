requirejs.config({
    // name: 'localApp',
    baseUrl: "js/",
    paths: {
        'microtemplates': 'lib/microtemplates/index',
        'jquery': 'lib/jquery/dist/jquery',
        'jquery-ui': 'lib/jquery-ui/jquery-ui.min',
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
