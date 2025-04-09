"use client";

import { CldUploadWidget } from "next-cloudinary";
import React from "react";

const Page = () => {
  return (
    <div>
      <CldUploadWidget
        signatureEndpoint="/api/cloudinary-sign"
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      >
        {({ open }) => (
          <button onClick={() => open()}>
            Upload an Image
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default Page;
