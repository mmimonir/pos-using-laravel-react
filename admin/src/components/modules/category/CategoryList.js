import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import CategoryPhotoModal from "../../partials/modals/CategoryPhotoModal";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const getCategories = () => {
    axiosInstance.get(`${Constants.BASE_URL}/category`).then((res) => {
      setCategories(res.data.data);
    });
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <BreadCrumb title={"Category List"} location={"Dashboard"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Category List"}
                link={"/category/create"}
                icon={"fa-add"}
                button_text={"Add"}
              />
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="my-table table table-hover table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Name / Slug</th>
                      <th>Serial / Status</th>
                      <th>Photo</th>
                      <th>Created By</th>
                      <th>Date Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                      <tr key={index}>
                        <td>{++index}</td>
                        <td>
                          <p className={"text-theme"}>Name: {category.name}</p>
                          <p className={"text-success"}>
                            Slug: {category.slug}
                          </p>
                        </td>
                        <td>
                          <p className={"text-theme"}>
                            Serial: {category.serial}
                          </p>
                          <p className={"text-success"}>
                            Status: {category.status}
                          </p>
                        </td>
                        <td>
                          <img
                            onClick={() => setModalShow(true)}
                            src={category.photo}
                            alt={category.name}
                            className={"img-thumbnail"}
                            width={"70px"}
                          />
                        </td>
                        <td>{category.created_by}</td>
                        <td>
                          <p className={"text-theme"}>
                            <small>Created: {category.created_at}</small>
                          </p>
                          <p className={"text-success"}>
                            <small>Updated: {category.updated_at}</small>
                          </p>
                        </td>
                        <td>Action</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <CategoryPhotoModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
