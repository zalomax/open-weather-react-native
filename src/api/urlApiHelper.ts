import cfg from "../config/cfg";

const urlApiHelper = (uri: string, params?: any, isAbsoluteUrl = false) => {
  let finalUrl = '';

  if (!isAbsoluteUrl) {
    finalUrl += cfg.API_URL;
  }

  finalUrl += uri;

  if (params) {
    const searchParamsString = new URLSearchParams(params).toString();

    finalUrl = `${finalUrl}?${searchParamsString}`;
  }

  return finalUrl;
};


export default urlApiHelper;
