define(
    'helper',
[
    'microtemplates',
], function (
    tmpl
) {

    var Hepler = function () {
        this.createHtml = function (template, data) {
            path = 'text!view/' + template;
            var result = "";
            require(path, function (text) {
                result = tmpl(text, data);
            } )
            return result;
        }
    };


    return new Helper();
} );
