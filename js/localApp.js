requirejs(
[
    'controller/Protocol'
],
function (
    ProtocolC
) {
    console.log('[localApp] init: ', ProtocolC);
    ProtocolC.init();
}
);