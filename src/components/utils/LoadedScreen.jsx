import React from "react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const LoadedScreen = ({ loadStatus, children }) => {
  let mainBody = null;
  if (loadStatus === 1) {
    mainBody = (
      <div className="mt-20 mx-auto">
        <Loader w={100} addCls="mx-auto" />
        <p className="text-center text-gray-500 italic text-sm">
          Loading, Please Wait....
        </p>
      </div>
    );
  } else if (loadStatus === 2) {
    mainBody = children;
  } else if (loadStatus === 3 || loadStatus === 4) {
    mainBody = (
      <ErrorMessage title="Failed To Load Data">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde tenetur
        sunt suscipit porro quos fugit libero dignissimos, earum tempora animi
        temporibus expedita similique accusantium accusamus rem fuga optio
        repudiandae officia alias recusandae aliquid deserunt et repellat! Atque
        dolorum sint alias.
        <br />
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste eligendi
        est volup exercitationem, pariatur quisquam nemo tempore, quis ad autem
        tempora animi perspiciatis amet?
      </ErrorMessage>
    );
  }
  return mainBody;
};

export default LoadedScreen;
