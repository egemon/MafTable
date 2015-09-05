define( 
    'Controller',
[
        'controller/Protocol',
], function (
        ProtocolController
) {
    var Controller = function (ProtocolController) {
        this.ProtocolController = ProtocolController;
    };

    return new Controller(ProtocolController);
});