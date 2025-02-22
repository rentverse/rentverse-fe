import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

const MyItem = () => {
  const navigate = useNavigate();

  const { data: itemData, refetch: refetchItem } = useQuery(
    "itemDataCache",
    async () => {
      try {
        const response = await API.get("/items/owned");
        return response.data.data;
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
  );

  return (
    <main
      style={{ backgroundColor: "#E5E5E5", marginTop: 100, marginBottom: 54 }}
      className="py-5 position-relative"
    >
      <img
        src="./img/hibiscus.png"
        alt="Bunga"
        style={{ top: -75 }}
        className="position-absolute end-0"
      />
      <img
        src="./img/palm.png"
        alt="Rumput"
        style={{ top: "30%" }}
        className="position-absolute start-0"
      />

      <Container>
        <Row>
          <Col lg={12}>
            <div className="mt-3 d-flex justify-content-between">
              <h1>My Items</h1>
              <Button
                variant="success"
                className="text-light fw-bold py-0 px-5 fs-5"
                onClick={() => {
                  navigate("/additem");
                }}
              >
                Add Item
              </Button>
            </div>
            <Row g={0}>
              {itemData?.map((el, i) => {
                return (
                  <Col lg={4} className="p-3" key={i}>
                    <Card
                      className="d-flex flex-column justify-content-center p-3"
                      onClick={() => {
                        navigate(`/my-item/detail/${el.id}`);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div id="img-group" className="position-relative">
                        <Card.Img
                          variant="top"
                          src={el.item_images[0]?.image_url}
                          className="img-fluid"
                        />
                      </div>
                      <Card.Body className="p-0">
                        <Card.Title>
                          {el.name.length > 27
                            ? `${el.name.slice(0, 26)} . . .`
                            : el.name}
                        </Card.Title>
                        {/* </Link> */}
                        <div className="d-flex justify-content-between">
                          <p className="text-success mb-0 fw-bolder">
                            Rp {el.price?.toLocaleString()},-
                          </p>
                          <p className="text-secondary mb-0">{el.city?.name}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default MyItem;
