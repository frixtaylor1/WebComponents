class APICallController {
//public:
  constructor(api = 'https://api.seasystem.pm:3000') {
    this.#api = api;
  }

  async call(url, method, data, jwt = null, headers = {}) {
    if (jwt) {
      headers.auth = `Bearer ${jwt}`;
    } else if (sessionStorage.getItem('token-sea') !== null || sessionStorage.getItem('token-sea') !== undefined) {
      headers.auth = `Bearer ${sessionStorage.getItem('token-sea')}`;
    }

    
    return await fetch(this.#api + url, {
      method: method == 'GET' ? 'GET' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers ?? {}
      },
      body: JSON.stringify(data) ?? null
    });
  }

//private:
  #api = undefined;
};

export { APICallController };