define(
    'helper',
[
    'microtemplates',
    'appConfig'
], function (
    tmpl,
    appConfig
) {
return {
    createHtml: function (template, data) {
        path = 'text!templates/' + template;
        var result = "";
        require(path, function (text) {
            result = tmpl(text, data);
        });
        return result;
    },

    $makeRequest: function (url, type, data, doneCallback, errorCallback, alwaysCallback) {
        return $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            data: data,
        })
        .done(doneCallback)
        .fail(errorCallback)
        .always(alwaysCallback);
    },
    $makeSyncRequest: function (data, doneCallback, errorCallback, alwaysCallback) {
        this.$makeRequest(
            appConfig.serverUrls.syncUrl,
            'GET',
            'json',
            data,
            doneCallback,
            errorCallback,
            alwaysCallback
        );
    }
};
} );
