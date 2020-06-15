import React from "react";

const Error = () => {
  return (
    <div className="p-5">
      <p className="flex flex-col justify-center items-center text-red-700 text-sm font-bold">
        Something Went Wrong!
        <span className="text-red-500 text-xs font-light">
          If you are on chrome, Allow 'Insecure Content' in site settings which
          can be found by clicking the lock icon in address bar.
        </span>
      </p>
    </div>
  );
};

export default Error;
