import axios from "axios";

export const apiCall = async ({
  endPoint,
  method,
  payload,
  params
}) => {
  try {
    const result = await axios({
      method,
      url: endPoint,
      data: payload,
      params
    });
    return {
      response: result,
      error: null
    };
  } catch (e) {
    return {
      response: null,
      error: e.request
    };
  }
};
