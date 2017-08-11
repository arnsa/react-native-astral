class API {
  static URL = null;

  static setUrl(url) {
    API.URL = url;
  }

  static setHeader(key, value) {
    API.headers[key] = value;
  }

  static sendRequest(endpoint, method, data = null) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(`${API.URL}/${endpoint}`, {
        method,
        headers: API.headers,
        body: data,
      });

      if (!response.ok) {
        reject(response);
      } else {
        const returnResponse = await response.json();

        resolve(returnResponse);
      }
    });
  }

  static get(endpoint) {
    return API.sendRequest(endpoint, 'get');
  }

  static delete(endpoint) {
    return API.sendRequest(endpoint, 'delete');
  }

  static post(endpoint, data) {
    API.sendData(endpoint, 'post', data);
  }

  static put(endpoint, data) {
    API.sendData(endpoint, 'put', data);
  }
}

export default API;
