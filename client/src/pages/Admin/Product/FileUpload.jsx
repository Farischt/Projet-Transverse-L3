import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const FileUpload = ({ product, setProduct }) => {
  const [imagesLoading, setImagesLoading] = useState(false);

  const fileUpload = (e) => {
    const files = e.target.files;
    const previousImagesState = product.images;
    if (files) {
      setImagesLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(`${process.env.REACT_APP_API_URL}/uploadimages`, {
                image: uri,
              })
              .then((res) => {
                setImagesLoading(false);
                previousImagesState.push(res.data);
                setProduct({ ...product, images: previousImagesState });
              })
              .catch((err) => {
                setImagesLoading(false);
                toast.error("Image upload failed");
              });
          },
          "base64"
        );
      }
    }
  };

  return (
    <div className="custom-file mb-2">
      <input
        onChange={fileUpload}
        className="custom-file-input"
        type="file"
        id="customFile"
        multiple
        accept="images/*"
      />
      <label className="custom-file-label" htmlFor="customFile">
        {imagesLoading ? (
          <div className="text-center">
            {" "}
            <Spinner animation="border" variant="primary" />{" "}
          </div>
        ) : (
          "Choisir des images"
        )}
      </label>
    </div>
  );
};

export default FileUpload;
