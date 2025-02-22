import {
  Row,
  Col,
  Container,
  Button,
  Modal,
  Carousel,
  Image,
  Spinner,
  Form,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { MyContext } from "../store/Store";
import Swal from "sweetalert2";
// import Calendar from "react-calendar"; // Import a calendar component
import "react-calendar/dist/Calendar.css"; // Import calendar styles

const DetailItem = ({ setRegisterForm }) => {
  const { loginState } = useContext(MyContext);

  // mengambil id item dari url
  const idItem = useParams().idItem;

  // carousel modals
  const [indexCarousel, setIndexCarousel] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndexCarousel(selectedIndex);
  };
  const [showImage, setShowImage] = useState(false);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [availableDates, setAvailableDates] = useState([]);
  // const [showCalendar, setShowCalendar] = useState(false);
  // const [checkingAvailability, setCheckingAvailability] = useState(false);
  // const [availabilityError, setAvailabilityError] = useState("");

  const { data: itemDetailData, isLoading: itemDetailDataIsLoading } = useQuery(
    "itemDetailCache",
    async () => {
      try {
        const response = await API.get(`/items/${idItem}`);
        return response.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  );

  const handlePayNewTransaction = useMutation(async () => {
    let trxData = {
      status: "new",
      itemId: itemDetailData.id,
      startDate: startDate,
      endDate: endDate,
    };

    try {
      const response = await API.post("/transactions", trxData);

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          text: "Booking successful!",
        });
        setStartDate("");
        setEndDate("");
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: "error",
        title: "Error while booking transaction",
        text: e.response.data.message,
      });
    }
  });

  // const checkAvailability = async () => {
  //   setCheckingAvailability(true);
  //   setAvailabilityError("");

  //   try {
  //     const response = await API.get(
  //       `/transactions/check-availability?itemId=${idItem}`
  //     );

  //     if (response.data.success) {
  //       setAvailableDates(response.data.data);
  //       setAvailabilityError("");
  //     } else {
  //       setAvailabilityError(response.data.message);
  //     }
  //   } catch (e) {
  //     setAvailabilityError("Failed to check availability. Please try again.");
  //   } finally {
  //     setCheckingAvailability(false);
  //   }
  // };

  return (
    <main
      style={{ backgroundColor: "#E5E5E5", marginTop: 100, marginBottom: 54 }}
      className="py-5 position-relative"
    >
      <img
        src="/img/hibiscus.png"
        alt="Bunga"
        style={{ top: -75 }}
        className="position-absolute end-0"
      />
      <img
        src="/img/palm.png"
        alt="Rumput"
        style={{ top: "30%" }}
        className="position-absolute start-0"
      />
      {/* carousel modals */}
      <Modal
        show={showImage}
        centered
        onHide={() => {
          setShowImage(false);
        }}
        style={{
          display: "block",
          position: "fixed",
          top: "0",
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        className="rounded-0"
        dialogClassName="carousel-modals"
      >
        <Carousel activeIndex={indexCarousel} onSelect={handleSelect}>
          {itemDetailData?.item_images?.length > 0 &&
            itemDetailData?.item_images?.map((el, i) => {
              return (
                <Carousel.Item key={i}>
                  <Image
                    className="d-block w-100"
                    src={el.image_url}
                    alt="Trip Image"
                  />
                  <Carousel.Caption>
                    {/* <h3>Trip Title</h3> */}
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </Modal>
      {itemDetailDataIsLoading ? (
        <Container>
          <Row>
            <Col>
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{
                  minHeight: "75vh",
                }}
              >
                <Spinner animation="border" variant="warning" size="lg" />{" "}
                &nbsp; Loading...
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <h1 className="display-4 fw-bold">{itemDetailData?.name}</h1>
          <h3 className="text-secondary">{itemDetailData?.city?.name}</h3>
          <Row>
            <Col xs={12} className="py-2">
              <img
                src={itemDetailData?.item_images[0]?.image_url}
                alt="Card 1"
                className="img-fluid w-100 rounded"
                style={{
                  height: 500,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowImage(true);
                  setIndexCarousel(0);
                }}
              />
            </Col>
            <Col lg={4} className="py-2 d-none d-lg-block">
              <img
                src={itemDetailData?.item_images[1]?.image_url}
                alt="Card 2"
                className="img-fluid w-100 rounded"
                style={{
                  height: 250,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowImage(true);
                  setIndexCarousel(1);
                }}
              />
            </Col>
            <Col lg={4} className="py-2 d-none d-lg-block">
              <img
                src={itemDetailData?.item_images[2]?.image_url}
                alt="Card 3"
                className="img-fluid w-100 rounded"
                style={{
                  height: 250,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowImage(true);
                  setIndexCarousel(2);
                }}
              />
            </Col>
            <Col lg={4} className="py-2 d-none d-lg-block">
              <div
                style={{ cursor: "pointer" }}
                className="position-relative"
                onClick={() => {
                  setShowImage(true);
                  setIndexCarousel(3);
                }}
              >
                <img
                  src={itemDetailData?.item_images[3]?.image_url}
                  alt="Card 4"
                  className="img-fluid w-100 rounded"
                  style={{ height: 250, objectFit: "cover" }}
                />
                <div
                  className={`position-absolute top-0 w-100 h-100 text-white d-flex justify-content-center align-items-center ${
                    itemDetailData?.item_images.length <= 4 && "d-none"
                  }`}
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                >
                  <h1>+{itemDetailData?.item_images.length - 4}</h1>
                </div>
              </div>
            </Col>
          </Row>

          <h2 className="mt-5">Description</h2>
          <p style={{ textAlign: "justify" }}>{itemDetailData?.description}</p>

          <div className="d-flex flex-wrap justify-content-center justify-content-lg-between mt-5">
            <div>
              <h1 className="d-inline-block text-success">
                IDR. {itemDetailData?.price.toLocaleString()}
              </h1>
              <h1 className="d-inline-block text-black">&nbsp;/ Day</h1>
            </div>
            <div className="d-flex justify-content-end">
              {/* <Button
                variant="primary"
                className="text-white fs-3 fw-bolder rounded-3 px-5 me-2"
                onClick={checkAvailability}
              >
                Check Availability
              </Button> */}
              <Button
                variant="success"
                className="text-white fs-3 fw-bolder rounded-3 px-5"
                onClick={() => {
                  loginState.isLogin
                    ? setShowModal(true)
                    : setRegisterForm(true);
                }}
              >
                BOOK NOW
              </Button>
            </div>
          </div>

          <hr className="text-secondary mt-5 mb-0" />
          <h2 className="mt-1 mb-3">Review</h2>
          {itemDetailData?.item_reviews?.length > 0 &&
            itemDetailData?.item_reviews?.map((el) => {
              return (
                <div className="bg-light w-50 p-2 rounded border border-secondary border-5">
                  <h3>{el?.review}</h3>- Anonymous
                </div>
              );
            })}
        </Container>
      )}

      {/* Date Selection Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Dates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              handlePayNewTransaction.mutate();
              setShowModal(false);
            }}
            disabled={!startDate || !endDate}
          >
            Book Now
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Calendar for Available Dates */}
      {/* <Modal show={showCalendar} onHide={() => setShowCalendar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Available Dates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {checkingAvailability ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Calendar
              tileClassName={({ date }) => {
                const dateString = date.toISOString().split("T")[0];
                return availableDates.includes(dateString) ? "available" : null;
              }}
              onChange={(date) => {
                const selectedDate = date.toISOString().split("T")[0];
                if (availableDates.includes(selectedDate)) {
                  setStartDate(selectedDate);
                  setEndDate(selectedDate); // Assuming single day booking for simplicity
                  setShowModal(true);
                  setShowCalendar(false);
                }
              }}
            />
          )}
          {availabilityError && (
            <p className="text-danger mt-3">{availabilityError}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCalendar(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </main>
  );
};

export default DetailItem;
