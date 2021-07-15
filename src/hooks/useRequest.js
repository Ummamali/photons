import { useState } from "react";
import { server } from "../configs";

const configs = server;

/*
useRequest Hook
  returns: [reqData, sendRequest, resetStatus, startLoading]
  Signatures:
    reqData: {status: 0|1|2|3|4, resObj: Object | Error}
    sendRequest: void function(data)
      data: determines the request to be sent
        > GET: *method, params, *route
        > POST: *method, *body (object not jsonified), *route
    resetStatus: void function(hard=false)
    startLoading: void function()

Status:
    0 ----> not sent
    1 -----> request sent, waiting for reply
    2 ----> response received successfully
    3 ----> response is ok but resObj is bad
    4 ----> request failed
*/

async function sendRequest(data) {
  let response;
  if (data.method === "GET") {
    // GET: *method, params, *route
    data.params = typeof data.params === "undefined" ? "" : data.params;
    response = await fetch(configs.URL + data.route + "?" + data.params);
  } else if (data.method === "POST") {
    // POST: *method, *body (object not jsonified), *route
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

const initialReqData = {
  status: 0,
  resObj: null,
};

export default function useRequest() {
  const [reqData, setReqData] = useState(initialReqData);

  function sendReq(data) {
    /* Returns a promise which resolves to resObject if the request succeeded at the network layer. The promise gets rejected to the same error*/
    return new Promise((resolve, reject) => {
      setReqData({ status: 1, resObj: null });
      sendRequest(data)
        .then((resObj) => {
          // the backend must return an internal status of 200 to indicate success. Any other status will be considered as bad.
          const statusCode = resObj.status === 200 ? 2 : 3;
          setReqData({ status: statusCode, resObj: resObj });
          resolve(resObj);
        })
        .catch((error) => {
          setReqData({ status: 4, resObj: error });
          reject(error);
        });
    });
  }

  function resetStatus() {
    /*
      This will just reset the status to 0. Resetting (cancelling) the request will be implemented later.    
    */
    setReqData({ status: 0, reqObject: null });
  }

  function startLoading() {
    // this function sets status to 1
    setReqData({ status: 1, resObj: null });
  }

  return [reqData, sendReq, resetStatus, startLoading];
}

export function hasResolved(reqStatus) {
  return reqStatus === 2 || (reqStatus === 3) | (reqStatus === 4);
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
      // it is a component
      return <Feedback resObj={reqData.resObj} />;
    } else if (typeof Feedback === "number") {
      // then it is a reference to another feedback key
      return feedbackEls[Feedback]; // if no feedback element found, its your fault ;)
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
