import {
  Row,
  Col,
  Container,
  Modal,
  Carousel,
  Image,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";

const MyItemDetail = () => {
  // mengambil id trip dari url
  const { idItem } = useParams();

  // carousel modals
  const [indexCarousel, setIndexCarousel] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndexCarousel(selectedIndex);
  };
  const [showImage, setShowImage] = useState(false);

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
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        className="rounded-0"
        dialogClassName="carousel-modals"
      >
        <Carousel activeIndex={indexCarousel} onSelect={handleSelect}>
          {itemDetailData?.item_images.length > 0 &&
            itemDetailData?.item_images.map((el, i) => {
              return (
                <Carousel.Item key={i}>
                  <Image
                    className="d-block w-100"
                    src={el.image_url}
                    alt="Item Image"
                  />
                  <Carousel.Caption>
                    {/* <h3>Item Name</h3> */}
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
                src={itemDetailData?.item_images[1].image_url}
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
                src={itemDetailData?.item_images[2].image_url}
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
                  src={itemDetailData?.item_images[3].image_url}
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
    </main>
  );
};

export default MyItemDetail;
