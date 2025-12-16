import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({ baseURL: process.env.REACT_APP_BACK_HOST, });

export default instance;
