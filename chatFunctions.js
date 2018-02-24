"use strict";

const api = require('./api');

let returnText = (connecting, disconnecting, timeStr, id, tex, me) => {

    let text;

    if (connecting) {
        text = "(" + timeStr + ") " + id + tex;
    } else if (disconnecting) {
        text = "(" + timeStr + ") <b>" + id + tex + "</b>";
    } else if (me) {
        text = "(" + timeStr + ") <b>" + tex + "</b>";
    } else {
        text = "(" + timeStr + ") <b>" + id + " said</b>: " + tex + "<br>";
    }

    return text;
};

let checkProtocol = async (event, protocol, state) => {
    let msg, parsedMsg, time, timeStr, connecting, disconnecting, id, text, me;

    // consol.log(state);

    if (protocol == "json") {
        msg = JSON.parse(event.data);
        parsedMsg = JSON.parse(msg.data);
        time = new Date(parsedMsg.date);
        timeStr = time.toLocaleTimeString();
        connecting = parsedMsg.connect;
        disconnecting = parsedMsg.disconnect;
        id = parsedMsg.id;
        me = parsedMsg.me;
        text = await checkText(parsedMsg.text, state, id);
    } else {
        msg = JSON.parse(event.data);
        time = new Date(msg.date);
        timeStr = time.toLocaleTimeString();
        connecting = msg.connect;
        disconnecting = msg.disconnect;
        id = msg.id;
        me = msg.me;
        text = await checkText(msg.text, state, id);
    }

    text = returnText(connecting, disconnecting, timeStr, id, text, me);

    return text;
};

/* TODO: Fix insert to database bug. Make it insert only if text is not undefined. */

let checkText = async (text, insert = false, id = false) => {
    let rePost = new RegExp(/\[post\](\d+)\[\/post\]/g);
    let reUser = new RegExp(/\[user\](\d+)\[\/user\]/g);
    let reMe = new RegExp(/^\/me/);
    let matchPost = rePost.exec(text);
    let matchUser = reUser.exec(text);
    let matchMe = reMe.exec(text);

    if (matchUser !== null) {
        while (matchUser !== null) {
           let getInformation = await api.getUserInformation(parseInt(matchUser[1]));

           if (getInformation !== undefined) {
               text = text.replace('[user]' + matchUser[1] + '[/user]', "<a href='" +
                   getInformation.link + "' target='_blank'>" +
                   getInformation.name + "</a>");
               matchUser = await reUser.exec(text);
           } else {
               text = undefined;
               return text;
           }
       }
    }

    if (matchPost !== null) {
        while (matchPost !== null) {
            let getInformation = await api.getInformation(matchPost[1]);

            if (getInformation !== undefined) {
                text = text.replace('[post]' + matchPost[1] + '[/post]', "<a href='" +
                    getInformation.link + "' target='_blank'>" +
                    getInformation.title + "</a>");
                matchPost = await rePost.exec(text);
            } else {
                text = undefined;
                return text;
            }
        }
    }

    while (matchMe !== null) {
        text = text.replace("/me", "");
        text = "* " + id + text;
        matchMe = null;
    }


    return text;
};

let setSubProtocol = (protocol) => {
    return protocol;
};

/**
 * Log output to web browser.
 *
 * @param  {string} message to output in the browser window.
 *
 * @return {void}
 */
let outputLog = async (text, t = null, output) => {
    let time;
    let now;
    let timestamp;

    if (t !== null) {
        time = new Date(t);
        timestamp = time.toLocaleTimeString();
    } else {
        now = new Date();
        timestamp = now.toLocaleTimeString();
    }


    let message = await checkText(text);

    if (message !== undefined) {
        output.innerHTML += `<div class="chat_output">
         <p class="chat_time">${timestamp}</p> <p class="chat_message">${message}</p><br></div>`;
        output.scrollTop = output.scrollHeight;
    }
};


module.exports = {
    checkText: checkText,
    setSubProtocol: setSubProtocol,
    checkProtocol: checkProtocol,
    outputLog: outputLog
};
