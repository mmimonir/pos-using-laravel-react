import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import CategoryPhotoModal from "../../partials/modals/CategoryPhotoModal";
import Pagination from "react-js-pagination";

const CategoryList = () => {
  const [input, setInput] = useState({});
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const [categories, setCategories] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalPhoto, setModalPhoto] = React.useState("");

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getCategories = (pageNumber) => {
    axiosInstance
      .get(`${Constants.BASE_URL}/category?page=${pageNumber}`)
      .then((res) => {
        console.log(res.data.data);
        setCategories(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setTotalItemsCount(res.data.meta.total);
        setStartFrom(res.data.meta.from);
        setActivePage(res.data.meta.current_page);
      });
  };
  const handlePhotoModal = (photo) => {
    console.log("Photo", photo);
    setModalPhoto(photo);
    setModalShow(true);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <BreadCrumb title={"Category List"} location={"Dashboard"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-header">
              <CardHeader
                title={"Category List"}
                link={"/category/create"}
                icon={"fa-add"}
                button_text={"Add"}
              />
            </div>
            <div className="card-body">
              <div className="search-area mb-4">
                <div className="row">
                  <div className="col-md-3">
                    <label className="w-100">
                      <p>Search</p>
                      <input
                        className="form-control form-control-sm"
                        type="search"
                        name="search"
                        placeholder="Search"
                        value={input.search}
                        onChange={handleInput}
                      />
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="w-100">
                      <p>Order By</p>
                      <select
                        className="form-select form-select-sm"
                        name="order_by"
                        value={input.order_by}
                        onChange={handleInput}
                      >
                        <option value="name">Name</option>
                        <option value="created_at">Created at</option>
                        <option value="updated_at">Updated at</option>
                        <option value="serial">Serial</option>
                        <option value="status">Status</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
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
                        <td>{startFrom + index}</td>
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
                            onClick={() =>
                              handlePhotoModal(category.photo_full)
                            }
                            src={category.photo}
                            alt={category.name}
                            className={"img-thumbnail table-image"}
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
                  title={"Category Photo"}
                  size={""}
                  photo={modalPhoto}
                />
              </div>
            </div>
            <div className="card-footer">
              <nav className={"pagination-sm"}>
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={totalItemsCount}
                  pageRangeDisplayed={2}
                  onChange={getCategories}
                  itemClass="page-item"
                  linkClass="page-link"
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
