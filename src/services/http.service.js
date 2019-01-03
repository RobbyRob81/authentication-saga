import axios from 'axios';

class HttpService {
  constructor(props){
    this.httpClient = axios.create();
  }

  onError = error => (
    Promise.reject(error.response)
  )

  onSuccess = response => {
    if(response.data.status !== 'error') {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data.error);
    }
  }

  sendGet = (path, params, baseUrl) => {
    const apiPath = process.env.React_APP_API_URL;
    const absoluteUrl = baseUrl ? baseUrl + path : apiPath + path;

    let options = {
      url: absoluteUrl,
      method: 'get',
      responseType: 'json'
    }

    if (params) {
      options.params = params;
    }

    return this.httpClient(options)
        .then(this.onSuccess)
        .catch(this.onError)
  }

  sendPost = (path, payload, baseUrl) => {
    const apiPath = process.env.React_APP_API_URL;
    const absoluteUrl = baseUrl ? baseUrl + path : apiPath + path;
    
     let options = {
      url: absoluteUrl,
      method: 'post',
      data: payload,
      responseType: 'json'
    }

    return this.httpClient(options)
            .then(this.onSuccess)
            .catch(this.onError)
  }
}

export default HttpService;

