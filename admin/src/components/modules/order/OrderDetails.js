import BreadCrumb from "../../partials/BreadCrumb";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMsg from "../../utils/ErrorMsg";
import { axiosInstance } from "../../../AxiosInterceptor";
import Constants from "../../../Constants";
import Spinner from "../../utils/Spinner";
import Swal from "sweetalert2";
import CardHeader from "../../partials/miniComponent/CardHeader";

const OrderDetails = () => {
  const params = useParams();
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrderDetails = () => {
    setIsLoading(true);
    axiosInstance
      .get(`${Constants.BASE_URL}/order/${params.id}`)
      .then((res) => {
        setOrder(res.data.data);
        setIsLoading(false);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      <BreadCrumb title={"Order Details"} location={"Dashboard"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Order Details"}
                link={"/order"}
                icon={"fa-list"}
                button_text={"List"}
              />
            </div>
            <div className="card-body">
              <div className="row"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderDetails;
