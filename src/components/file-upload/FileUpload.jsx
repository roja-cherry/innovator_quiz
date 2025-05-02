import { useState } from "react";
import "./FileUpload.scss";

const FileUpload = ({ handleFileChange, file }) => {

  const handleChange = (e) => {
    handleFileChange(e);
  };

  return (
    <>
      <p className="form-label">Upload File :</p>
      <label htmlFor="file" className="file-upload-container rounded">
        <div className="box">
          <svg
            width="26"
            height="28"
            viewBox="0 0 26 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.25 1.36047H14.5909C18.6674 1.36047 20.7057 1.36047 22.1212 2.35777C22.5267 2.64351 22.8868 2.98238 23.1904 3.36409C24.25 4.69631 24.25 6.61467 24.25 10.4514V13.6332C24.25 17.3372 24.25 19.1891 23.6638 20.6683C22.7215 23.0462 20.7286 24.9219 18.202 25.8088C16.6305 26.3605 14.6627 26.3605 10.7273 26.3605C8.47844 26.3605 7.35402 26.3605 6.45597 26.0452C5.01224 25.5384 3.87344 24.4666 3.33495 23.1078C3 22.2626 3 21.2043 3 19.0877V13.8605"
              stroke="#3276E8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M24.25 13.8605C24.25 16.1617 22.3845 18.0272 20.0833 18.0272C19.2511 18.0272 18.27 17.8814 17.4608 18.0982C16.7419 18.2908 16.1803 18.8524 15.9877 19.5713C15.7708 20.3805 15.9167 21.3616 15.9167 22.1939C15.9167 24.4951 14.0512 26.3605 11.75 26.3605"
              stroke="#3276E8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.75 6.36047L1.75 6.36047M6.75 1.36047V11.3605"
              stroke="#3276E8"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <p>Click To Upload</p>
        </div>
        <input
          onChange={handleChange}
          type="file"
          name="file"
          id="file"
          accept=".csv, .xlsx"
          style={{ visibility: "hidden" }}
        />
      </label>
      <div className="file-name-file-condition">
        {file?.name && (
          <div>
            <p>{file?.name}</p>
          </div>
        )}
        <div className="file-type-size">
          <span>EXCEL</span>
          <span>10 MB</span>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
