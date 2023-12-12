class APICallController {
//public:
  constructor(api) {
    this.#api = api;
  }

  async call(url, method, data, headers = {}) {
    return await fetch(this.#api + url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        headers
      },
      body: JSON.stringify(data)
    });
  }

//private:
  #api = undefined;
};