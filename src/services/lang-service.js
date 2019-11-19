import config from '../config';
import TokenService from './token-service';

const LangService = {
  // prettier-ignore
  getLang() {
    return fetch (`${config.API_ENDPOINT}/language`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
};

export default LangService;
