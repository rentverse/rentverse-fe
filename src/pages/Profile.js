import {
  Card,
  Col,
  Container,
  Image,
  Row,
  Alert,
  Spinner,
  Button,
} from "react-bootstrap";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { QRCodeSVG } from "qrcode.react";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import moment from "moment-timezone";
import Swal from "sweetalert2";

const Profile = () => {
  const {
    data: userProfile,
    refetch: refetchUserProfile,
    isLoading: userProfileIsLoading,
  } = useQuery("userProfileCache", async () => {
    const response = await API.get("/users/profile");
    return response.data.data;
  });

  const {
    data: transactionSuccess,
    isLoading: transactionSuccessIsLoading,
    refetch: refetchTransaction,
  } = useQuery("transactionSuccessCache", async () => {
    try {
      const response = await API.get("/transactions/out");

      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  });

  const handleCancelOrder = useMutation(async (id) => {
    try {
      let payload = {
        status_id: 2,
      };
      const response = await API.patch(`/transactions/${id}`, payload);
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire("Canceled!", "Transaction has been canceled.", "success");
        refetchTransaction();
      }
    } catch (e) {
      console.log(e);
    }
  });

  const CancelTransactionButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger mx-2",
    },
    buttonsStyling: false,
  });

  return (
    <main
      style={{ backgroundColor: "#E5E5E5", marginTop: 100, marginBottom: 54 }}
      className="py-5 position-relative"
    >
      <Container>
        {userProfileIsLoading ? (
          <Row>
            <Col>
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{
                  minHeight: "25vh",
                }}
              >
                <Spinner animation="border" variant="warning" size="lg" />{" "}
                &nbsp; Loading...
              </div>
            </Col>
          </Row>
        ) : (
          <Card className="w-75 mx-auto px-4 py-3">
            <Row>
              <Col lg={7}>
                <h1>Personal Info</h1>
                <div className="d-flex flex-column mt-4">
                  <div className="d-flex flex-row align-items-center my-1">
                    <IoPersonCircleSharp className="display-2 text-secondary me-3" />
                    <div>
                      <h5 className="m-0">{userProfile?.name}</h5>
                      <p className="text-secondary m-0">Fullname</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center my-1">
                    <MdEmail className="display-2 text-secondary me-3" />
                    <div>
                      <h5 className="m-0">{userProfile?.email}</h5>
                      <p className="text-secondary m-0">Email</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center my-1">
                    <MdPhone className="display-2 text-secondary me-3" />
                    <div>
                      <h5 className="m-0">{`${userProfile?.phone_number?.slice(
                        0,
                        4
                      )}-${userProfile?.phone_number?.slice(
                        4,
                        8
                      )}-${userProfile?.phone_number?.slice(8)}`}</h5>
                      <p className="text-secondary m-0">Mobile phone</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center my-1">
                    <MdLocationOn className="display-2 text-secondary me-3" />
                    <div>
                      <h5 className="m-0">{userProfile?.address}</h5>
                      <p className="text-secondary m-0">Address</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={5} className="pt-3">
                <Image
                  src="/img/profile-undefined.png"
                  alt="profile"
                  className="w-100"
                />
              </Col>
            </Row>
          </Card>
        )}

        <h1 className="mt-5">History</h1>
        {transactionSuccessIsLoading ? (
          <Container>
            <Row>
              <Col>
                <div
                  className="d-flex justify-content-center align-items-center w-100"
                  style={{
                    minHeight: "25vh",
                  }}
                >
                  <Spinner animation="border" variant="warning" size="lg" />{" "}
                  &nbsp; Loading...
                </div>
              </Col>
            </Row>
          </Container>
        ) : (
          transactionSuccess?.map((trx) => {
            return (
              // trx.status === "approve" && (
              <Container className="mb-5" key={trx.transaction_number}>
                <Card
                  className="bg-white py-4"
                  style={{ border: "2px solid rgba(108,117,125,0.7)" }}
                >
                  {trx?.transaction_status?.status === "New" &&
                  handleCancelOrder.isLoading ? (
                    <Button
                      variant="danger"
                      className="mt-2 me-2 position-absolute top-0 end-0 text-center d-flex flex-column justify-content-center rounded-circle text-light"
                      disabled
                    >
                      <Spinner animation="border" variant="light" />
                    </Button>
                  ) : (
                    trx?.transaction_status?.status === "New" && (
                      <Button
                        variant="danger"
                        className="mt-2 me-2 position-absolute top-0 end-0 text-center d-flex flex-column justify-content-center rounded-circle text-light"
                        onClick={() => {
                          CancelTransactionButtons.fire({
                            title: "Are you sure to cancel ?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                            reverseButtons: true,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleCancelOrder.mutate(trx.id);
                            } else if (
                              /* Read more about handling dismissals below */
                              result.dismiss === Swal.DismissReason.cancel
                            ) {
                              CancelTransactionButtons.fire(
                                "Cancelled",
                                "Transaction still waiting for your approval",
                                "error"
                              );
                            }
                          });
                        }}
                        disabled={handleCancelOrder.isLoading}
                      >
                        <p className="m-0 fw-bolder">X</p>
                      </Button>
                    )
                  )}
                  <Row className="px-3 pb-3">
                    <Col lg={4}>
                      <Image src="/img/payment-icon.png" alt="rentverse" />
                    </Col>
                    <Col
                      lg={{ span: 4, offset: 4 }}
                      className="d-flex justify-content-center ps-lg-4"
                    >
                      <div
                        className="d-flex flex-column align-items-end w-75"
                        // style={{ width: "64%" }}
                      >
                        <h1>Booking</h1>
                        <h5 className="text-secondary">
                          {moment
                            .tz(trx.created_at, "Asia/Jakarta")
                            .format("DD MMMM YYYY (HH:mm)")}
                        </h5>
                      </div>
                    </Col>
                  </Row>
                  <Row className="px-4">
                    <Col
                      lg={5}
                      className="d-flex flex-column justify-content-between"
                    >
                      <div>
                        <h2>{trx.item.name}</h2>
                      </div>
                      <div id="img-group" className="position-relative w-50">
                        <Card.Img
                          variant="top"
                          src={trx?.item.item_images[0]?.image_url}
                          className="img-fluid"
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <Row g={0}>
                        <Col lg={6} className="pb-5">
                          <h4>Category</h4>
                          <h5 className="text-secondary">
                            {trx.item?.category?.category}
                          </h5>
                        </Col>
                        <Col lg={6} className="pb-5">
                          <h4>Location</h4>
                          <h5 className="text-secondary">
                            {trx.item?.city?.name}
                          </h5>
                          {/* <h5 className="text-secondary">{`${trx.trip?.day} Day ${trx.trip?.night} Night`}</h5> */}
                        </Col>
                        <Col lg={6} className="pb-5">
                          <h4>Start</h4>
                          <h5 className="text-secondary">
                            {moment
                              .tz(trx.start, "Asia/Jakarta")
                              .format("DD MMMM YYYY (HH:mm)")}
                          </h5>
                        </Col>
                        <Col lg={6} className="pb-5">
                          <h4>End</h4>
                          <h5 className="text-secondary">
                            {moment
                              .tz(trx.end, "Asia/Jakarta")
                              .format("DD MMMM YYYY (HH:mm)")}
                          </h5>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg={3}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <QRCodeSVG value={trx.transaction_number} />,
                      <p className="mt-2">
                        {trx.transaction_number.toUpperCase()}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      lg={{ span: 2, offset: 7 }}
                      className="text-center fw-bold"
                    >
                      <p className="my-0 text-start">Total</p>
                      <p className="my-0 text-start">Status</p>
                    </Col>
                    <Col className="text-start ps-5 fw-bold">
                      <p className="my-0 text-danger">
                        <span className="px-3 me-3 text-black">:</span>IDR.
                        &nbsp;
                        {trx.total.toLocaleString()}
                      </p>
                      <p className="my-0 text-danger">
                        <span className="px-3 me-3 text-black">:</span>
                        &nbsp;
                        <Alert
                          variant="success"
                          className="d-inline-block p-1 px-3"
                        >
                          {trx.transaction_status.status}
                        </Alert>
                      </p>
                    </Col>
                  </Row>
                </Card>
              </Container>
            );
            // );
          })
        )}
      </Container>
    </main>
  );
};

export default Profile;
