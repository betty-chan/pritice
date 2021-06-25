import jwt from "jsonwebtoken"

var METABASE_SITE_URL = "https://data.starlinke.cn/metabase";
var METABASE_SECRET_KEY = "f892003b6a523213a77829a0a7e6431b20b0a7729bb01098aad08aa31afc1255";

var payload = {
    resource: { question: 517 },
    params: {},
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
};
var token = jwt.sign(payload, METABASE_SECRET_KEY);

var iframeUrl = METABASE_SITE_URL + "/embed/question/" + token + "#bordered=true&titled=true";
console.log(iframeUrl)