import axios from "axios";
import config from "../config/config";

type ListProductApi = {
  query?: Record<string, any>;
};

const searchContact = (args?: ListProductApi) => {
  let url = config.BACKEND_BASE + "contacts/";

  let query = args?.query || {};
  return axios.get(url, {
    params: query,
  });
};

export { searchContact };
