import axios from "axios";
import { server } from "../../redux/store";

export const getAllProductsApi = () => {
  return axios.get(`${server}/products`, {
    withCredentials: true,
  });
};
