import axios from "axios";

const url = "https://apischool.sidneycardoso.tech";

export default axios.create({
  baseURL: url,
});
