import { Image } from "cloudinary-react";

import React from "react";

const CertificatePreview = () => {
  return (
    <div className="bg-white h-[13rem] p-4 relative rounded-lg overflow-hidden shadow-md">
      <Image
        style={{
          position: "absolute",
          top: "0",
          left: "0", 
          right: "0",
        }}
        accessibility= "darkmode"
        cloudName="dqe0i0gwp"
        publicId="http://res.cloudinary.com/dqe0i0gwp/image/upload/v1694530659/ev4y38opvbiulyb5c3li.jpg"
      >
      </Image>
    </div>
  );
};

export default CertificatePreview;
