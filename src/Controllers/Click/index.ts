import unirest from "unirest";

import Fetch from "@Utils/Fetch";

import { CF_URL } from "@Config/Firebase";

function linkWasClicked({ req, res, remoteAddress, linkID }) {
  const fetch = new Fetch(CF_URL);

  const apiCall = unirest(
    "GET",
    "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
  );

  apiCall.headers({
    "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    useQueryString: true,
  });

  apiCall.end((result: any) => {
    if (res.error) throw new Error(result.error);

    fetch.post("/click/linkWasClicked", {
      linkID: "",
      country: result.body.country,
      comeFrom: "",
    });

    res.send();
  });
}

export default linkWasClicked;
