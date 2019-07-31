import { FETCH_VTCS, NEW_VTC, DELETE_VTC, EDIT_VTC, SELECT_VTC } from './types';
import { message } from 'antd';

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNTY0NjEwMTYyLCJwcml2IjoiZnVsbCIsInJhbmQiOiJYcDh2dFhvMiIsInVzZXJfbmFtZSI6ImFkbWluIn0.sAYte2lY1ddSAHGbPnQUIPjR0h-NFgrQVduk5EyYTtw";

export const fetchVTCS = () => dispatch => {
    fetch('https://localhost:3004/api/vtcs?offset=0&limit=1000&fields=*&filter=&related=*', {
        method: 'GET',
        headers: {
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        }
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: FETCH_VTCS,
            payload: data.resource
        }))
        .catch(error => {
            message.error("VTCs not fetched. " + error.toString());
        });
};

export const createVTC = (requestData) => dispatch => {
    fetch('https://localhost:3004/api/vtcs?fields=*&related=*', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        },
        body: "{\"" + "resource" + "\"" + " : [" + JSON.stringify(requestData) + "] }"
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: NEW_VTC,
            payload: data.resource[0] //Remember that .resource is an array of VTCs
        }))
        .catch(error => {
            message.error("VTC not created. " + error.toString());
        });
};

export const editVTC = (requestData) => dispatch => {
    fetch('https://localhost:3004/api/vtcs?fields=*&related=*', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        },
        body: "{\"" + "resource" + "\"" + " : [" + JSON.stringify(requestData) + "] }"
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: EDIT_VTC,
            payload: data.resource[0] //Remember that .resource is an array of VTCs
        }))
        .catch(error => {
            message.error("VTC not updated. " + error.toString());
        });
};

export const deleteVTC = (requestData) => dispatch => {
    fetch('https://localhost:3004/api/vtcs?fields=*&related=*', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        },
        body: "{\"" + "resource" + "\"" + " : [" + JSON.stringify(requestData) + "]}"
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: DELETE_VTC
        }))
        .catch(error => {
            message.error("VTC not deleted. " + error.toString());
        });
};

export const selectVTC = (selected_vtc_id) => dispatch => {
    fetch('https://localhost:3004/api/vtcs/' + selected_vtc_id + '?fields=*&related=*', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        },
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: SELECT_VTC,
            payload: data.resource[0] //Remember that .resource is an array of VTCs
        }))
        .catch(error => {
            message.error("VTC not selected. " + error.toString());
        });
};

