const jwt = require("jsonwebtoken");
let MB_EMBEDDING_SECRET_KEY = "f892003b6a523213a77829a0a7e6431b20b0a7729bb01098aad08aa31afc1255";
let MB_SITE_URL = "https://data.starlinke.cn/metabase";
const signedToken = jwt.sign(unsignedToken, MB_EMBEDDING_SECRET_KEY);
const iframeUrl = `${MB_SITE_URL}/embed/question/${signedToken}`;
console.log(iframeUrl)