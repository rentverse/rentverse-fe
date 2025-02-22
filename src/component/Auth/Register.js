import { useState } from "react";
import { Button, Modal, Form, Spinner, Dropdown } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import Swal from "sweetalert2";

const Register = ({ registerForm, setRegisterForm, setLoginForm }) => {
  const [searchQuery, setSearchQuery] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const { data: cityData, isLoading: cityDataIsLoading } = useQuery(
    ["cityDataCache", searchQuery],
    async (e) => {
      try {
        const response = await API.get(
          `/cities?page=1&limit=100&city_name=${searchQuery}`
        );
        return response.data.data;
      } catch (err) {
        console.log(err);
      }
    }
  );

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    city_id: "",
    phone_number: "",
    address: "",
    username: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    city_id: "",
    phone_number: "",
    address: "",
    username: "",
  });

  // fungsi untuk menghandle saat terjadi perubahan pada input form
  const handleInputChange = (e) => {
    setInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const validation = (inputItem) => {
    const newError = {
      name: "",
      email: "",
      password: "",
      city_id: "",
      phone_number: "",
      address: "",
      username: "",
    };

    // console.log("inputItem", inputItem);

    // Validasi name
    let name = inputItem.name?.trim();
    if (name === "") {
      newError.name = "Name must be fill !";
    } else {
      newError.name = "";
    }

    // Validasi username
    let username = inputItem.username.trim();
    if (username === "") {
      newError.username = "username must be fill !";
    } else {
      newError.username = "";
    }

    // Validasi Email
    let email = inputItem.email.trim();
    if (email === "") {
      newError.email = "Email must be fill !";
    } else {
      newError.email = "";
    }

    // Validasi Password
    let password = inputItem.password.trim();
    if (password === "") {
      newError.password = "Password must be fill !";
    } else if (/[A-Z]/.test(password) === false) {
      newError.password =
        "The password must be a combination of uppercase, lowercase, and numbers!!";
    } else if (/[a-z]/.test(password) === false) {
      newError.password =
        "The password must be a combination of uppercase, lowercase, and numbers!!";
    } else if (/[0-9]/.test(password) === false) {
      newError.password =
        "The password must be a combination of uppercase, lowercase, and numbers!!";
    } else {
      newError.password = "";
    }

    // Validasi City
    let city_id = inputItem.city_id;
    if (city_id === "") {
      newError.city_id = "City must be choosed !";
    } else {
      newError.city_id = "";
    }

    // Validasi Phone
    let phone_number = inputItem.phone_number.trim();
    if (phone_number === "") {
      newError.phone_number = "Phone must be fill !";
    } else if (parseInt(phone_number) < 0) {
      newError.phone_number = "can't be less than 0";
    } else if (phone_number.length < 10) {
      newError.phone_number =
        "Please insert at least 10 digit number phone_number";
    } else if (phone_number.length > 13) {
      newError.phone_number = "Please insert max 13 digit number phone_number";
    } else {
      newError.phone_number = "";
    }

    // Validasi Address
    let address = inputItem.address.trim();
    if (address === "") {
      newError.address = "Address must be fill !";
    } else {
      newError.address = "";
    }

    if (
      newError.name === "" &&
      newError.email === "" &&
      newError.password === "" &&
      newError.phone_number === "" &&
      newError.address === ""
    ) {
      // console.log("valid");
      // reset error
      setError({
        name: "",
        email: "",
        password: "",
        gender: "",
        phone_number: "",
        address: "",
      });
      return true;
    } else {
      // console.log("tidak valid");
      setError(newError);
      return false;
    }
  };

  // fungsi untuk menghandle saat form di-submit
  const handleSubmitForm = useMutation(async (e) => {
    e.preventDefault();

    // console.log("validation(input)", validation(input));
    if (validation(input)) {
      // kirim data user baru
      try {
        // Configuration Content-type
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        // Data body
        const body = JSON.stringify(input);

        // Insert data user to database
        const response = await API.post("/register", body, config);

        // console.log(response);

        // Notification
        if (response.status === 201) {
          // reset input
          setInput({
            name: "",
            email: "",
            password: "",
            city_id: "",
            phone_number: "",
            address: "",
            username: "",
          });

          // tutup form register dan buka form login
          setRegisterForm(false);
          Swal.fire({
            title: "Register Success",
            // text: "Now, check and verify your email",
            text: "Now, you can login",
            icon: "info",
          });
          setLoginForm(true);
        }
      } catch (e) {
        Swal.fire({
          title: "Register Failed",
          text: e.response.data.message,
          icon: "error",
        });
      }
    }
  });

  return (
    <Modal
      show={registerForm}
      centered
      id="register-modal"
      onHide={() => {
        setRegisterForm(false);
      }}
      style={{
        display: "block",
        position: "fixed",
        top: "0",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        // backgroundColor: "rgba(255,255,255,0.5)",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      className="rounded-0"
    >
      <img
        src="/img/hibiscus-modals.png"
        alt="Bunga"
        className="position-absolute top-0 end-0 rounded-top"
      />
      <img
        src="/img/palm-modals.png"
        alt="Rumput"
        className="position-absolute top-0 start-0 rounded-top"
      />
      <Modal.Title className="display-5 fw-bold mx-auto p-4">
        Register
      </Modal.Title>

      <Form className="p-4" onSubmit={handleSubmitForm.mutate}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label className="h3 fw-bolder">Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={input.name}
            onChange={handleInputChange}
          />
          {error.name && (
            <Form.Text className="text-danger">{error.name}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label className="h3 fw-bolder">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter Username"
            value={input.username}
            onChange={handleInputChange}
          />
          {error.username && (
            <Form.Text className="text-danger">{error.username}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="h3 fw-bolder">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={input.email}
            onChange={handleInputChange}
          />
          {error.email && (
            <Form.Text className="text-danger">{error.email}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="h3 fw-bolder">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={handleInputChange}
          />
          {error.password && (
            <Form.Text className="text-danger">{error.password}</Form.Text>
          )}
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formCity">
          <Form.Label className="h3 fw-bolder">City</Form.Label>
          <Form.Select
            value={input.city}
            name="city"
            onChange={handleInputChange}
          >
            <option value="">City</option>
            {cityData &&
              cityData.map((city) => {
                return <option value="Male">{city.name}</option>;
              })}
          </Form.Select>
          {error.city && (
            <Form.Text className="text-danger">{error.city}</Form.Text>
          )}
        </Form.Group>  */}
        <Form.Group className="mb-3">
          <Form.Label className="h3 fw-bolder">City</Form.Label>
          {/* <label htmlFor="city_id">Kota</label> */}
          <Form.Control
            value={searchQuery}
            type="text"
            className="form-control"
            id="city_id"
            name="city_id"
            placeholder="Kota"
            onChange={(e) => {
              // console.log("CHANGE", e.target.value);
              setSearchQuery(e.target.value);
            }}
            onFocus={() => {
              setIsOpen(true);
            }}
            onBlur={() => {
              !searchQuery && setIsOpen(false);
            }}
          />
          <Dropdown show={isOpen} onToggle={() => {}}>
            <Dropdown.Menu
              className="mt-0 w-100"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {cityDataIsLoading ? (
                <Dropdown.Item disabled>Loading...</Dropdown.Item>
              ) : cityData ? (
                cityData.map((el) => {
                  return (
                    <Dropdown.Item
                      key={el.id}
                      onClick={(e) => {
                        e.stopPropagation(); // Menghentikan peristiwa klik dari menyebar ke elemen input
                        setIsOpen(false);
                        setSearchQuery(el.name);
                        // setSelectedOpt(el);
                        setInput((prevState) => {
                          return { ...prevState, city_id: el.id };
                        });
                      }}
                    >{`${el.name} - ${el.province?.name}`}</Dropdown.Item>
                  );
                })
              ) : (
                <Dropdown.Item disabled>Data Not Found</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label className="h3 fw-bolder">Phone</Form.Label>
          <Form.Control
            type="number"
            name="phone_number"
            placeholder="Enter Your Phone Number"
            value={input.phone_number}
            onChange={handleInputChange}
          />
          {error.phone_number && (
            <Form.Text className="text-danger">{error.phone_number}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label className="h3 fw-bolder">Address</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            placeholder="Enter Your Address"
            style={{ height: "100px" }}
            onChange={handleInputChange}
            value={input.address}
          />
          {error.address && (
            <Form.Text className="text-danger">{error.address}</Form.Text>
          )}
        </Form.Group>

        {handleSubmitForm.isLoading ? (
          <Button
            variant="warning"
            type="submit"
            className="w-100 text-white fs-4 fw-bolder"
            disabled
          >
            <Spinner animation="border" variant="light" />
          </Button>
        ) : (
          <Button
            variant="warning"
            type="submit"
            className="w-100 text-white fs-4 fw-bolder"
          >
            Register
          </Button>
        )}
      </Form>
    </Modal>
  );
};

export default Register;
