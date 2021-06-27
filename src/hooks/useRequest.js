import { useState } from "react";
import { server } from "../configs";

const configs = server;

async function sendRequest(data) {
  let response;
  if (data.method === "GET") {
    data.params = typeof data.params === "undefined" ? "" : data.params;
    response = await fetch(configs.URL + data.route + "?" + data.params);
  } else if (data.method === "POST") {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.body),
    };
    response = await fetch(configs.URL + data.route, init);
  }
  if (response.ok) {
    const resObj = await response.json();
    return resObj;
  } else {
    throw new Error("Response is not ok");
  }
}

/*
Status:
    0 ----> not sent
    1 -----> request sent, waiting for reply
    2 ----> response received successfully
    3 ----> response is ok but resObj is bad
    4 ----> request failed
*/

const initialReqData = {
  status: 0,
  resObj: null,
};

export default function useRequest() {
  const [reqData, setReqData] = useState(initialReqData);

  function sendReq(data) {
    setReqData({ status: 1, resObj: null });
    sendRequest(data)
      .then((resObj) => {
        let statusCode;
        if (resObj.status === 200) {
          statusCode = 2;
        } else {
          statusCode = 3;
        }
        setReqData({ status: statusCode, resObj: resObj });
      })
      .catch((error) => {
        setReqData({ status: 4, resObj: error });
      });
  }

  return [reqData, sendReq];
}

export const defaultFeedbackElements = {
  0: <p className="text-gray-500 italic">Request has not been initiated</p>,
  1: <p className="text-gray-600 italic">Loading....</p>,
  2: <p className="text-green-600 italic">Success: The request succeded</p>,
  3: (
    <p className="text-red-600 italic">Request is good but resObject is bad</p>
  ),
  4: <p className="text-red-600 italic">Network: Request failed</p>,
};

export function mapFeedback(reqData, feedbackEls = defaultFeedbackElements) {
  const Feedback = feedbackEls[reqData.status];
  if (Feedback !== undefined) {
    if (typeof Feedback === "function") {
      return <Feedback resObj={reqData.resObj} />;
    } else {
      return Feedback;
    }
  } else {
    return null;
  }
}

export function combineLoadStatus(statusArray) {
  if (statusArray.includes(3) || statusArray.includes(4)) {
    return 3;
  } else if (statusArray.includes(0)) {
    return 0;
  } else if (statusArray.includes(1)) {
    return 1;
  } else {
    return 2;
  }
}
