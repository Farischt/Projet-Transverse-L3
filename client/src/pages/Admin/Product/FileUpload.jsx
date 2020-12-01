import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import Figure from "react-bootstrap/Figure";
import Badge from "react-bootstrap/Badge";

const FileUpload = ({ product, setProduct }) => {
  const [loading, setLoading] = useState(false);
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

  const handleImageDelete = async (public_id) => {
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/removeimage`, {
        public_id,
      });
      let filteredImages = product.images.filter((item) => {
        return item.public_id !== public_id;
      });
      setProduct({ ...product, images: filteredImages });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  return (
    <>
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
      <div>
        {product.images &&
          product.images.map((image) => {
            return (
              <Figure key={image.public_id}>
                {loading ? (
                  <div className="text-center">
                    {" "}
                    <Spinner animation="border" variant="primary" />{" "}
                  </div>
                ) : (
                  <>
                    <Figure.Caption>
                      <Badge
                        onClick={() => handleImageDelete(image.public_id)}
                        className="btn btn-danger rounded-circle"
                        style={{ cursor: "pointer" }}
                      >
                        x
                      </Badge>
                    </Figure.Caption>
                    <Figure.Image
                      className="m-3 rounded"
                      src={image.url}
                      width={150}
                      height={150}
                      rounded
                    />
                  </>
                )}
              </Figure>
            );
          })}
      </div>
    </>
  );
};

export default FileUpload;
