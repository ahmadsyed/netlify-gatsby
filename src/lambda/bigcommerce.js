require('dotenv').config();
const axios = require('axios');
const cookie = require('cookie');
const setCookie = require('set-cookie-parser');
import _ from 'lodash';

// only log in development mode
const devModeLog = str => process.env !== 'production' && console.log(str);

export function handler(event, context, callback) {
  devModeLog(' ');
  devModeLog(' ');
  devModeLog(' ');
  devModeLog('-----------------------');
  devModeLog('----- New Request -----');
  devModeLog('-----------------------');

  // Get env var values we need to speak to the BC API
  const API_STORE_HASH = process.env.API_STORE_HASH;
  const API_CLIENT_ID = process.env.API_CLIENT_ID;
  const API_TOKEN = process.env.API_TOKEN;
  const API_SECRET = process.env.API_SECRET;
  const CORS_ORIGIN = process.env.CORS_ORIGIN;
  // Set up headers
  const REQUEST_HEADERS = {
    'X-Auth-Client': API_CLIENT_ID,
    'X-Auth-Token': API_TOKEN,
    'X-Client-Type': 'Gatsby',
    'X-Client-Name': 'gatsby-bigcommerce-netlify-cms-starter',
    'X-Plugin-Version': '1.0.0',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const CORS_HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': CORS_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS'
  };
  // Get endpoint value from query string
  const ENDPOINT_QUERY_STRING = event.queryStringParameters.endpoint;

  // Parse out cookies and change endpoint to include cartId for certain cart requests
  const cookies = setCookie.parse(event.headers.cookie, {
    decodeValues: true, // default: true
    map: true // default: false
  });
  const hasCartIdCookie = cookies.hasOwnProperty('cartId');
  devModeLog(`- hasCartIdCookie? ${hasCartIdCookie.toString()} -`);

  // Assemble BC API URL
  const constructURL = () => {
    let ROOT_URL ='';
    let values = ['validate','orders'];
    console.log("ENDPOINT_QUERY_STRING---",ENDPOINT_QUERY_STRING);
    if(_.some(values, (el) => _.includes(ENDPOINT_QUERY_STRING, el))){
      ROOT_URL = `https://api.bigcommerce.com/stores/${API_STORE_HASH}/v2/`;
    }else{
      ROOT_URL = `https://api.bigcommerce.com/stores/${API_STORE_HASH}/v3/`;
    }
    console.log("ROOT_URL---",ROOT_URL);
    if (ENDPOINT_QUERY_STRING === 'carts/items') {
      if (hasCartIdCookie) {
        if (typeof event.queryStringParameters.itemId != 'undefined') {
          return `${ROOT_URL}carts/${cookies.cartId.value}/items/${event.queryStringParameters.itemId}?include=redirect_urls`;
        } else {
          return `${ROOT_URL}carts/${cookies.cartId.value}/items?include=redirect_urls`;
        }
      } else {
        // If there is no cartId cookie when adding cart items, resort to creating the cart
        return `${ROOT_URL}carts?include=redirect_urls`;
      }
    } else if (ENDPOINT_QUERY_STRING === 'carts') {
      if (hasCartIdCookie) {
        return `${ROOT_URL}carts/${cookies.cartId.value}?include=redirect_urls`;
      } else {
        return `${ROOT_URL}carts?include=redirect_urls`;
      }
    } else {
      return ROOT_URL + ENDPOINT_QUERY_STRING;
    }
  };
  // Function to determine return cookie header that should be returned with response
  const setCookieHeader = (responseType, response) => {
    let cookieHeader = null;

    devModeLog('(in setCookieHeader function) responseType: ', responseType);
    devModeLog(
      '(in setCookieHeader function) ENDPOINT_QUERY_STRING: ',
      ENDPOINT_QUERY_STRING
    );
    devModeLog('(in setCookieHeader function) response: ', response)
    if(response){
      const statusCode = response.status;
      const body = response.data;

    if (ENDPOINT_QUERY_STRING === 'carts' && statusCode === 404) {
      cookieHeader = {
        'Set-Cookie': cookie.serialize('cartId', '', {
          maxAge: -1
        })
      };
      devModeLog('- Expiring cardId cookieHeader: -');
      devModeLog(cookieHeader);
    }else if(body.success){
      cookieHeader = {
        'Set-Cookie': cookie.serialize('user', 1000, {
          maxAge: 60 * 60 * 24 * 28 // 4 weeks
        })
      };
      devModeLog('- Assigning cookieHeader: -');
      devModeLog(cookieHeader);
    }
     else if (responseType === 'response') {
      if (!hasCartIdCookie  && body && body.data && body.data.id ) {
        cookieHeader = {
          'Set-Cookie': cookie.serialize('cartId', body.data.id, {
            maxAge: 60 * 60 * 24 * 28 // 4 weeks
          })
        };
        devModeLog('- Assigning cookieHeader: -');
        devModeLog(cookieHeader);
      }
    }
    }

    return cookieHeader;
  };

  // Here's a function we'll use to define how our response will look like when we callback
  const pass = (response, cookieHeader) =>
    callback(null, {
      statusCode: response?response.status:200,
      body: response?JSON.stringify(response.data):response.data,
      headers: { ...CORS_HEADERS, ...cookieHeader }
    });

  // Process POST
  const post = body => {
    axios
      .post(constructURL(), body, { headers: REQUEST_HEADERS })
      .then(response => {
        console.log('resp',response);
        const cookieHeader = setCookieHeader('response', response);
        pass(response, cookieHeader);
      })
      .catch(err => {
        console.log('err response---',err)
        pass(err.response)
      }
        );
  };
  if (event.httpMethod === 'POST') {
    devModeLog('--------');
    devModeLog('- POST -');
    devModeLog('--------');
    post(JSON.parse(event.body));
  }

  // Process GET
  const get = () => {
    axios
      .get(constructURL(), { headers: REQUEST_HEADERS })
      .then(response => {
        console.log('resp in get',response);
        const cookieHeader = setCookieHeader('response', response);

        pass(response, cookieHeader);
      })
      .catch(err => {
        const cookieHeader = setCookieHeader('error', err.response);

        pass(err.response, cookieHeader);
      });
  };
  if (event.httpMethod === 'GET') {
    devModeLog('-------');
    devModeLog('- GET -');
    devModeLog('-------');
    get();
  }

  // Process PUT
  const put = body => {
    axios
      .put(constructURL(), body, { headers: REQUEST_HEADERS })
      .then(response => {
        pass(response);
      })
      .catch(err => pass(err.response));
  };
  if (event.httpMethod === 'PUT') {
    devModeLog('-------');
    devModeLog('- PUT -');
    devModeLog('-------');
    put(JSON.parse(event.body));
  }

  // Process DELETE
  const del = () => {
    axios
      .delete(constructURL(), { headers: REQUEST_HEADERS })
      .then(response => {
        pass(response);
      })
      .catch(err => pass(err.response));
  };
  if (event.httpMethod === 'DELETE') {
    devModeLog('----------');
    devModeLog('- DELETE -');
    devModeLog('----------');
    del();
  }
}
