class Requests {
  static setHeader(key, value) {
    Requests.headers[key] = value;
  }

  static sendRequest(url, method, data = null) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        method,
        headers: Requests.headers,
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

  static get(url) {
    return Requests.sendRequest(url, 'get');
  }

  static delete(url) {
    return Requests.sendRequest(url, 'delete');
  }

  static post(url, data) {
    Requests.sendData(url, 'post', data);
  }

  static put(url, data) {
    Requests.sendData(url, 'put', data);
  }
}

export default Requests;
