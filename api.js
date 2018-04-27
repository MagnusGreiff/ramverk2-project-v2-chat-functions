"use strict";

exports.getInformation = (postId) => {
    return fetch('http://localhost:3000/posts/' + postId)
        .then((response) => response.json())
        .then((responseJson) => {
            let jsonInfo = responseJson.json;
            let information;

            try {
                let info = {
                    title: jsonInfo.items[0].title,
                    link: jsonInfo.items[0].link
                };

                information = info;
            } catch (e) {
                console.error('\x1b[41m', 'Undefined map item', '\x1b[0m');
            }
            // console.log("outsude");
            // console.log(information);
            return information;
        })
        .catch((error) => {
            console.error(error);
        });
};

exports.getUserInformation = (userId) => {
    return fetch('http://localhost:3000/users/' + userId)
        .then((response) => response.json())
        .then((responseJson) => {
            let jsonInfo = responseJson.json;
            let information;

            try {
                let info = {
                    name: jsonInfo.items[0].display_name,
                    link: jsonInfo.items[0].link
                };

                information = info;
            } catch (e) {
                console.error('\x1b[41m', 'Undefined map item', '\x1b[0m');
            }

            return information;
        })
        .catch((error) => {
            console.error(error);
        });
};
