import { LOGIN, LOGOUT } from './types';
import { message } from 'antd';
var AUTH_TOKEN = "";

export const appLogin = (requestData) => dispatch => {
    fetch('https://localhost:3004/api/admin/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: "follow",
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then(data => {
            console.log(data)
            dispatch({
                type: LOGIN,
                payload: data
            })

        })
        .catch(error => {
            console.log(error)
            message.error(error.toString() + " ");
        });



    //     response.json())
    //         .then(data => dispatch({
    //         type: LOGIN,
    //         payload: data
    //     }))
    //     .catch(error => {
    //         message.error(error.error.toString() + " " + error.message.toString());
    //     });
};



