import React from "react";

const FileUpload = () => {
  const fileUpload = (e) => {};

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
        Choisir un fichier
      </label>
    </div>
  );
};

export default FileUpload;
