import { API_URL } from "./environment";

export const API = async (url, method = "get", body = null) => {
  const token = "7|KCf2rqfqa9e8ovkT6XFIQlNWu9sQSXDaCVlTcsAxa622a54a";
  let req;
  if (method == "get") {
    req = await fetch(API_URL + url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  } else {
    req = await fetch(API_URL + url, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  }
  return { data: await req.json(), status: req.status };
};
