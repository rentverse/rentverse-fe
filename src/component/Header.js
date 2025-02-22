import { Container, InputGroup, Form } from "react-bootstrap";

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header
      style={{
        height: 750,
        backgroundImage: `url(${"./img/bg-header.png"})`,
        backgroundSize: "cover",
        position: "relative",
        zIndex: 1,
      }}
      className="w-100"
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <Container className="h-100 d-flex flex-column justify-content-evenly">
          <div className="text-white">
            <h1 className="display-1 fw-bolder">Rent anything</h1>
            <h1 className="display-1">everywhere easily</h1>
          </div>
          <div className="text-white">
            <h5 className="fw-normal">Find great item to rent</h5>

            <InputGroup className="mb-3" size="lg">
              <Form.Control
                placeholder="Input What You Want"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </InputGroup>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
