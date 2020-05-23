import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NumberFormat from "react-number-format";
import axios from "axios";
import "./detail.css";
import Cartt from "./../cart/Test";
import { connect } from "react-redux";
import { beli } from "../actioncreators/cart";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_PRODUCT}/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        setData(data);
      });
  }, [id]);
  // const testimage = "https://i.imgur.com/tq4h23x.jpg";
  const showDetail = [data].map((item) => {
    const URL = "http://3.136.102.205/";
    return (
      <Container className="dark-grey-text mt-5 pt-5" fluid>
        <Row key={item.id}>
          <Col md={6} mb={4} className="d-flex justify-content-center mt-4">
            <Image
              src={`${process.env.REACT_APP_API_URL}${item.imageUrl}`}
              // src={testimage}
              alt="Gambar"
              // style={{height: "400px", justifyContent: "center"}}
              fluid
            />
          </Col>
          <Col md={6} mb={4} className="flex flex-row">
            <div className="p-4">
              <h2 className="mb-3">{data.name}</h2>
              <p className="lead">
                <NumberFormat
                  value={data.price}
                  displayType="text"
                  thousandSeparator={true}
                  prefix={"Rp "}
                />
              </p>
              <h6 className="text-muted">Remaining Stock : {data.quantity}</h6>
              <p className="lead font-weight-bold">Description</p>
              <p>{data.description}</p>
              <div className="d-flex justify-content-left">
                <Cartt key={data.id} cart={data} />
              </div>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <div class="col-md-6 text-center">
            <h4 class="my-4">Additional information</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              suscipit modi sapiente illo soluta odit voluptates, quibusdam
              officia. Neque quibusdam quas a quis porro? Molestias illo neque
              eum in laborum.
            </p>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-12 mb-4">
              <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/11.jpg"
                class="img-fluid"
                alt=""
              />
            </div>
            <div class="col-lg-4 col-md-6 mb-4">
              <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/12.jpg"
                class="img-fluid"
                alt=""
              />
            </div>
            <div class="col-lg-4 col-md-6 mb-4">
              <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg"
                class="img-fluid"
                alt=""
              />
            </div>
          </div>
        </Row>
      </Container>
    );
  });
  return <div>{showDetail}</div>;
};
const mapDispatchToProps = (dispatch) => {
  return {
    beli,
  };
};
export default connect(null, mapDispatchToProps)(Detail);
