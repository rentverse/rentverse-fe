import {
  Modal,
  Card,
  Row,
  Col,
  Alert,
  Image,
  Button,
  Spinner,
} from "react-bootstrap";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { API } from "../config/api";
import moment from "moment";

const Approvement = ({
  showApprovement,
  setShowApprovement,
  currentTransaction,
  refetchTransaction,
}) => {
  const handleRejectOrder = useMutation(async () => {
    try {
      let payload = {
        status_id: 4,
      };
      const response = await API.patch(
        `/transactions/${currentTransaction.id}`,
        payload
      );
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire("Rejected!", "Transaction has been rejected.", "success");
        refetchTransaction();
        setShowApprovement(false);
      }
    } catch (e) {
      console.log(e);
    }
  });

  const RejectTransactionButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger mx-2",
    },
    buttonsStyling: false,
  });

  const handleApproveOrder = useMutation(async () => {
    let payload = {
      status_id: 3,
    };
    try {
      const response = await API.patch(
        `/transactions/${currentTransaction.id}`,
        payload
      );
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire({
          title: "Transaction approved",
          icon: "success",
        });
        refetchTransaction();
        setShowApprovement(false);
      }
    } catch (e) {
      console.log(e);
    }
  });

  const handleOnGoingOrder = useMutation(async () => {
    let payload = {
      status_id: 5,
    };
    try {
      const response = await API.patch(
        `/transactions/${currentTransaction.id}`,
        payload
      );
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire({
          title: "Transaction On Going",
          icon: "success",
        });
        refetchTransaction();
        setShowApprovement(false);
      }
    } catch (e) {
      console.log(e);
    }
  });

  const handleCloseOrder = useMutation(async () => {
    let payload = {
      status_id: 6,
    };
    try {
      const response = await API.patch(
        `/transactions/${currentTransaction.id}`,
        payload
      );
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire({
          title: "Transaction closed",
          icon: "success",
        });
        refetchTransaction();
        setShowApprovement(false);
      }
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <Modal
      show={showApprovement}
      centered
      onHide={() => {
        setShowApprovement(false);
      }}
      style={{
        display: "block",
        position: "fixed",
        top: "0",
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      className="rounded-0"
      dialogClassName="approvement-modals"
    >
      <Card
        className="bg-white py-3"
        style={{ border: "2px solid rgba(108,117,125,0.7)" }}
      >
        <Row className="px-3 pb-3">
          <Col lg={4}>
            <Image src="/img/payment-icon.png" alt="rentverse" />
          </Col>
          <Col
            lg={{ span: 4, offset: 4 }}
            className="d-flex justify-content-center ps-lg-4"
          >
            <div className="d-flex flex-column align-items-end w-75">
              <h1>Booking</h1>
              <h5 className="text-secondary">
                {moment
                  .tz(currentTransaction.created_at, "Asia/Jakarta")
                  .format("DD MMMM YYYY (HH:mm)")}
              </h5>
            </div>
          </Col>
        </Row>
        <Row className="px-4">
          <Col lg={5} className="d-flex flex-column justify-content-between">
            <div>
              <h2>{currentTransaction.item?.name}</h2>
              {/* <h5 className="text-secondary">
                {currentTransaction.trip?.country.name}
              </h5> */}
            </div>
            <div id="img-group" className="position-relative w-50">
              <Card.Img
                variant="top"
                src={currentTransaction?.item.item_images[0]?.image_url}
                className="img-fluid"
              />
            </div>
          </Col>
          <Col lg={4}>
            <Row g={0}>
              <Col lg={6} className="pb-5">
                <h4>Category</h4>
                <h5 className="text-secondary">
                  {currentTransaction.item?.category?.category}
                </h5>
              </Col>
              <Col lg={6} className="pb-5">
                <h4>Location</h4>
                <h5 className="text-secondary">
                  {currentTransaction.item?.city?.name}
                </h5>
                {/* <h5 className="text-secondary">{`${currentTransaction.trip?.day} Day ${currentTransaction.trip?.night} Night`}</h5> */}
              </Col>
              <Col lg={6} className="pb-5">
                <h4>Start</h4>
                <h5 className="text-secondary">
                  {moment
                    .tz(currentTransaction.start, "Asia/Jakarta")
                    .format("DD MMMM YYYY (HH:mm)")}
                </h5>
              </Col>
              <Col lg={6} className="pb-5">
                <h4>End</h4>
                <h5 className="text-secondary">
                  {moment
                    .tz(currentTransaction.end, "Asia/Jakarta")
                    .format("DD MMMM YYYY (HH:mm)")}
                </h5>
              </Col>
            </Row>
          </Col>
          {/* <Col
            lg={3}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <h5>{currentTransaction.id}</h5>
          </Col> */}
        </Row>

        <hr
          style={{
            height: 3,
            backgroundColor: "gray",
            border: "none",
            opacity: "25%",
          }}
        />
        <Row>
          <Col lg={{ span: 2, offset: 7 }} className="text-center fw-bold">
            <p className="my-0 text-start">Total</p>
            <p className="my-0 text-start">Status</p>
          </Col>
          <Col className="text-start ps-5 fw-bold">
            <p className="my-0 text-danger">
              <span className="px-3 me-3 text-black">:</span>IDR. &nbsp;
              {currentTransaction.total.toLocaleString()}
            </p>
            <p className="my-0 text-danger">
              <span className="px-3 me-3 text-black">:</span>
              &nbsp;
              <Alert variant="success" className="d-inline-block p-1 px-3">
                {currentTransaction.transaction_status.status}
              </Alert>
            </p>
          </Col>
        </Row>
        {currentTransaction.transaction_status.status === "New" ? (
          <div className={`d-flex justify-content-end mt-4`}>
            {handleRejectOrder.isLoading ? (
              <Button
                variant="danger"
                className="text-white m-3 fs-5 fw-bold"
                style={{ width: 200 }}
                disabled
              >
                <Spinner animation="border" variant="light" />
              </Button>
            ) : (
              <Button
                variant="danger"
                className="text-white m-3 fs-5 fw-bold"
                style={{ width: 200 }}
                onClick={() => {
                  RejectTransactionButtons.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, reject this transaction!",
                    cancelButtonText: "No, cancel!",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleRejectOrder.mutate();
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      RejectTransactionButtons.fire(
                        "Cancelled",
                        "Transaction still waiting for your approval",
                        "error"
                      );
                    }
                  });
                }}
                disabled={
                  handleApproveOrder.isLoading || handleRejectOrder.isLoading
                }
              >
                Reject
              </Button>
            )}

            {handleApproveOrder.isLoading ? (
              <Button
                variant="success"
                className="text-white m-3 fs-5 fw-bold"
                style={{ width: 200 }}
                disabled
              >
                <Spinner animation="border" variant="light" />
              </Button>
            ) : (
              <Button
                variant="success"
                className="text-white m-3 fs-5 fw-bold"
                style={{ width: 200 }}
                onClick={handleApproveOrder.mutate}
                disabled={
                  handleApproveOrder.isLoading || handleRejectOrder.isLoading
                }
              >
                Approve
              </Button>
            )}
          </div>
        ) : currentTransaction.transaction_status.status === "Booked" ? (
          <div className={`d-flex justify-content-end mt-4`}>
            {handleOnGoingOrder.isLoading ? (
              <Button
                variant="success"
                className="text-white m-3 fs-5 fw-bold"
                style={{ width: 200 }}
                disabled
              >
                <Spinner animation="border" variant="light" />
              </Button>
            ) : (
              <Button
                variant="success"
                className="text-white m-3 fs-5 fw-bold"
                style={{ width: 200 }}
                onClick={handleOnGoingOrder.mutate}
                disabled={
                  handleOnGoingOrder.isLoading || handleRejectOrder.isLoading
                }
              >
                Start Rent
              </Button>
            )}
          </div>
        ) : (
          currentTransaction.transaction_status.status === "On Going" && (
            <div className={`d-flex justify-content-end mt-4`}>
              {handleCloseOrder.isLoading ? (
                <Button
                  variant="success"
                  className="text-white m-3 fs-5 fw-bold"
                  style={{ width: 200 }}
                  disabled
                >
                  <Spinner animation="border" variant="light" />
                </Button>
              ) : (
                <Button
                  variant="success"
                  className="text-white m-3 fs-5 fw-bold"
                  style={{ width: 200 }}
                  onClick={handleCloseOrder.mutate}
                  disabled={
                    handleCloseOrder.isLoading || handleRejectOrder.isLoading
                  }
                >
                  Close
                </Button>
              )}
            </div>
          )
        )}
      </Card>
    </Modal>
  );
};

export default Approvement;
