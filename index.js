const cf = require('./chatFunctions');


exports.checkProtocol = async (event, protocol) => {
    return cf.checkProtocol(event, protocol);
};

exports.setSubProtocol = (protocol) => {
    return cf.setSubProtocol(protocol);
};

exports.checkText = async (text) => {
    return cf.checkText(text);
};

exports.outputLog = async (text, t=null, output) => {
    return cf.outputLog(text, t, output)
};
