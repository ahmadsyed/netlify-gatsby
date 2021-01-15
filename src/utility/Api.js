import axios from 'axios';
export function getBaseUrl() {
	return 'http://localhost:3000'; // local
}

export function getApiData(where, useToken = false) {
	var url = getBaseUrl() + where[0].url;
	if (where[0].urlParms) {
		url = url + where[0].urlParms;
	}
	var headers = {
		Accept: 'application/json',
	};

	if (where[0].where) {
		headers.filter = JSON.stringify(where[0].where);
	}
	return axios({
		url: url,
		method: 'get',
		headers: headers,
	});
}

export function postApiData(where, form, useToken = false) {
	var url = getBaseUrl() + where[0].url;
	if (where[0].plaid) {
		url = where[0].url;
	}
	if (where[0].urlParms) {
		url = url + '/' + where[0].urlParms;
	}

	var headers = {
		Accept: 'application/json',
	};

	return axios({
		url: url,
		method: 'post',
		headers: headers,
		data: form,
	});
}

export function isValidPassword(input) {
    var reg = /^[^%\s]{7,}/;
    var reg2 = /[a-zA-Z]/;
    var reg3 = /[0-9]/;
    return reg.test(input) && reg2.test(input) && reg3.test(input);
}