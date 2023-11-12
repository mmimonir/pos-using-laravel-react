import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import $ from "jquery";
import Swal from "sweetalert2";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import { useParams } from "react-router-dom";

function AddProductPhoto() {
  const params = useParams();
  const [photos, setPhotos] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePhotoUpload = () => {
    setIsLoading(true);
    axiosInstance
      .post(`${Constants.BASE_URL}/product-photo-upload/${params.id}`, photos, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          setProgress(percent);
        },
      })
      .then((res) => {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.msg,
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
        // navigate("/brand");
        // console.log(res.data);
      });
  };

  const handlePhotoUploadInput = (e) => {
    let images = e.target.files;
    for (let i = 0; i < images.length; i++) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prevState) => ({
          ...prevState,
          [i]: {
            ...prevState[i],
            photo: reader.result,
            ...prevState[i],
            is_primary: i === 0 ? 1 : 0,
          },
        }));
      };
      reader.readAsDataURL(images[i]);
    }
  };

  const handlePrimaryPhoto = (key) => {
    setPhotos((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        is_primary: 1,
      },
    }));
    Object.keys(photos).map((photo) => {
      if (photo !== key) {
        setPhotos((prevState) => ({
          ...prevState,
          [photo]: {
            ...prevState[photo],
            is_primary: 0,
          },
        }));
      }
    });
  };

  const handlePhotoInputField = () => {
    $("#photo_input").trigger("click");
  };

  useEffect(() => {
    console.log(photos);
  }, [photos]);

  return (
    <>
      <BreadCrumb title={"Add Product Photo"} location={"Dashboard"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Add Product Photo"}
                link={"/product"}
                icon={"fa-list"}
                button_text={"List"}
              />
            </div>
            <div className="card-body">
              <div className="photo-upload-container">
                <div className="icon" onClick={handlePhotoInputField}>
                  <i className="fa-solid fa-camera fa-2x" />
                </div>
              </div>
              <input
                id={"photo_input"}
                type="file"
                className={"d-none"}
                multiple={true}
                accept={"image/png, image/jpeg, image/jpg, image/webp"}
                onChange={handlePhotoUploadInput}
              />
              <div className="row">
                {Object.keys(photos).map((key) => (
                  <div className="col-md-2 my-2" key={key}>
                    <img
                      onClick={() => handlePrimaryPhoto(key)}
                      src={photos[key].photo}
                      className={
                        photos[key].is_primary === 1
                          ? "primary-photo img-thumbnail preview-photo"
                          : "img-thumbnail preview-photo"
                      }
                      alt={"Photo Preview"}
                    />
                  </div>
                ))}
                <div className="row align-content-center">
                  <div className="col-md-9">
                    <div
                      className="progress"
                      style={{ display: `${progress < 1 ? "none" : "block"}` }}
                    >
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                        style={{ width: `${progress}%` }}
                      >
                        {`${progress}%`}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 text-end">
                    <button
                      className={"btn theme-button"}
                      disabled={isLoading}
                      onClick={handlePhotoUpload}
                      dangerouslySetInnerHTML={{
                        __html: isLoading
                          ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...'
                          : "Upload Photo",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProductPhoto;
