import { useState } from "react";
import { Container, Form, Button, Image, Dropdown } from "react-bootstrap";
import { MdAttachFile, MdAddCircleOutline } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";

const AddItem = () => {
  const [searchQuery, setSearchQuery] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    city_id: "",
    stock: "",
    price: "",
    category_id: "",
    images: [],
  });
  const [error, setError] = useState({
    name: "",
    description: "",
    location: "",
    city_id: "",
    stock: "",
    price: "",
    category_id: "",
    images: "",
  });

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    if (e.target.name === "images") {
      // mengambil file yang diupload pada input file
      let filesImg = e.target.files;
      // console.log(filesImg);
      // console.log(filesImg.length);
      // console.log(typeof filesImg); // tipenya object

      // Cek file upload apakah ada ? apakah formatnya sesuai (jpeg/png) ?
      if (filesImg.length > 0) {
        let arrImg = [];

        for (const indexImg in filesImg) {
          if (
            filesImg[indexImg].type === "image/png" ||
            filesImg[indexImg].type === "image/jpeg" ||
            filesImg[indexImg].type === "image/jpg"
          ) {
            // jika semua syarat terpenuhi, buatlah urlnya lalu simpan di object dengan key filesImg[indexImg]
            arrImg.push(filesImg[indexImg]);
          }
        }

        setInput((prevState) => {
          return {
            ...prevState,
            [e.target.name]: [...prevState.images, ...arrImg],
          };
        });
      }
    } else if (e.target.name === "price" || e.target.name === "stock") {
      setInput((prevState) => {
        return { ...prevState, [e.target.name]: parseInt(e.target.value) };
      });
    } else {
      setInput((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    }
  };

  const validation = (input) => {
    const newError = {
      name: "",
      description: "",
      location: "",
      city_id: "",
      stock: "",
      price: "",
      category_id: "",
      images: "",
    };

    let newItem = {
      name: "",
      description: "",
      location: "",
      city_id: "",
      stock: "",
      price: "",
      category_id: "",
      images: [],
    };

    console.log("input", input);

    // name
    newItem.name = input.name.trim();
    if (newItem.name === "") {
      newError.name = "Please fill out this field";
    } else {
      newError.name = "";
    }

    // price
    newItem.price = input.price;
    if (newItem.price === "" || isNaN(newItem.price)) {
      newError.price = "Please fill out this field";
    } else if (newItem.price < 0) {
      newError.price = "can't be less than 0";
    } else {
      newError.price = "";
    }

    // city
    newItem.city_id = input.city_id;
    if (newItem.city_id === "") {
      newError.city_id = "Please fill out this field";
    } else {
      newError.city_id = "";
    }

    // category
    newItem.category_id = input.category_id;
    if (newItem.category_id === "") {
      newError.category_id = "Please fill out this field";
    } else {
      newError.category_id = "";
    }

    // stock
    newItem.stock = input.stock;
    if (newItem.stock === "" || isNaN(newItem.stock)) {
      newError.stock = "Please fill out this field";
    } else if (newItem.stock < 0) {
      newError.stock = "can't be less than 0";
    } else {
      newError.stock = "";
    }

    // img
    newItem.images = input.images;
    if (newItem.images.length < 4) {
      newError.images = "Please upload at least 4 image";
    } else {
      newError.images = "";
    }

    // location
    newItem.location = input.location.trim();
    if (newItem.location === "") {
      newError.location = "Please fill out this field";
    } else {
      newError.location = "";
    }

    // desc
    newItem.description = input.description.trim();
    if (newItem.description === "") {
      newError.description = "Please fill out this field";
    } else {
      newError.description = "";
    }

    // console.log(newItem);

    // jika semua newErrornya kosong, maka kirim data Item baru tersebut
    if (
      newError.name === "" &&
      newError.location === "" &&
      newError.category_id === "" &&
      newError.city_id === "" &&
      newError.price === "" &&
      newError.stock === "" &&
      newError.description === "" &&
      newError.images === ""
    ) {
      // reset error
      setError({
        name: "",
        description: "",
        location: "",
        city_id: "",
        stock: "",
        price: "",
        category_id: "",
        images: "",
        // images: [],
      });
      return newItem;
    } else {
      setError(newError);
      return "";
    }
  };

  const handleAddItem = useMutation(async (e) => {
    e.preventDefault();

    const newItem = validation(input);

    if (newItem !== "") {
      let formBody = new FormData();

      formBody.append("name", newItem.name);
      formBody.append("description", newItem.description);
      formBody.append("location", newItem.location);
      formBody.append("city_id", newItem.city_id);
      formBody.append("stock", newItem.stock);
      formBody.append("price", newItem.price);
      formBody.append("category_id", newItem.category_id);
      newItem.images.forEach((img) => {
        formBody.append("images", img);
      });

      // tambahkan Item data baru
      const response = await API.post("/items", formBody);
      // console.log(response.data);

      if (response.status === 201) {
        // reset input
        setInput({
          name: "",
          description: "",
          location: "",
          city_id: "",
          stock: "",
          price: "",
          category_id: "",
          images: [],
        });
        Swal.fire({
          icon: "success",
          title: "Item Added Successfully ",
        });
      }
    }
  });

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
  // const { data: categoryData } = useQuery("categoryDataCache", async (e) => {
  //   try {
  //     const response = await API.get("/categories");
  //     return response.data.data;
  //   } catch (err) {
  //     console.log(err.response.data.message);
  //   }
  // });

  // console.log(input);
  // console.log(error);

  return (
    <main
      style={{ backgroundColor: "#E5E5E5", marginTop: 100, marginBottom: 54 }}
      className="py-5 position-relative"
    >
      <Container>
        <h1>Add Item</h1>
        <Form className="p-4" onSubmit={handleAddItem.mutate}>
          {/* item subject */}
          <Form.Group className="mb-4" controlId="formTitle">
            <Form.Label className="h3 fw-bolder">Item Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Item Name"
              value={input.name}
              onChange={handleInputChange}
            />
            {error.name && (
              <Form.Text className="text-danger">{error.name}</Form.Text>
            )}
          </Form.Group>

          {/* category */}
          <Form.Group className="mb-4" controlId="formCategory">
            <Form.Label className="h3 fw-bolder">Category</Form.Label>
            <Form.Select
              name="category_id"
              value={input.category_id}
              onChange={handleInputChange}
            >
              <option value="">Category</option>
              <option value="1">Mobil</option>
              <option value="2">Motor</option>
              <option value="3">Kamera</option>
              <option value="4">Alat Camping</option>
              {/* {categoryData?.map((c) => {
                return <option value={c.id}>{c.category}</option>;
              })} */}
            </Form.Select>
            {error.category_id && (
              <Form.Text className="text-danger">{error.category_id}</Form.Text>
            )}
          </Form.Group>

          {/* location */}
          <Form.Group className="mb-4" controlId="formLocation">
            <Form.Label className="h3 fw-bolder">Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Enter Location"
              value={input.location}
              onChange={handleInputChange}
            />
            {error.location && (
              <Form.Text className="text-danger">{error.location}</Form.Text>
            )}
          </Form.Group>

          {/* city */}
          <Form.Group className="mb-4">
            <Form.Label className="h3 fw-bolder">City</Form.Label>
            {/* <label htmlFor="city_id">Kota</label> */}
            <Form.Control
              value={searchQuery}
              type="text"
              className="form-control"
              id="city_id"
              // name="city_id"
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

          {/* price */}
          <Form.Group className="mb-4" controlId="formPrice">
            <Form.Label className="h3 fw-bolder">Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter Price"
              value={input.price}
              onChange={handleInputChange}
            />
            {error.price && (
              <Form.Text className="text-danger">{error.price}</Form.Text>
            )}
          </Form.Group>

          {/* stock */}
          <Form.Group className="mb-4" controlId="formStock">
            <Form.Label className="h3 fw-bolder">Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              placeholder="Enter Stock"
              value={input.stock}
              onChange={handleInputChange}
            />
            {error.stock && (
              <Form.Text className="text-danger">{error.stock}</Form.Text>
            )}
          </Form.Group>

          {/* desc */}
          <Form.Group className="mb-4" controlId="formDescription">
            <Form.Label className="h3 fw-bolder">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Enter Item Description"
              style={{ height: "100px" }}
              value={input.description}
              onChange={handleInputChange}
            />
            {error.description && (
              <Form.Text className="text-danger">{error.description}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="h3 fw-bolder">Image</Form.Label>
            {error.images && (
              <Form.Text className="text-danger d-block">
                {error.images}
              </Form.Text>
            )}
            <Form.Control
              type="file"
              name="images"
              id="img-AddItem"
              size="lg"
              className="d-none"
              multiple
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* <div
            className="py-2 px-2 text-success fs-5 fw-bold border border-2 rounded-3 d-flex justify-content-between align-items-center d-inline-block"
            style={{
              backgroundColor: "whitesmoke",
              cursor: "pointer",
              width: "25%",
            }}
            onClick={() => {
              document.getElementById("img-AddItem").click();
            }}
          >
            <p className="p-0 m-0">Add Attachment Here</p>
            <MdAttachFile className="" />
          </div> */}

          {input.images.length > 0 ? (
            <div className="d-flex justify-content-start flex-wrap">
              {input.images.map((img, i) => {
                return (
                  <Image
                    src={URL.createObjectURL(img)}
                    style={{ width: 250, height: 250, marginRight: 10 }}
                    className="my-2"
                    key={i}
                  />
                );
              })}
              <div
                className="my-2 text-success fs-3 fw-bold border border-2 rounded-3 d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "whitesmoke",
                  cursor: "pointer",
                  width: 250,
                  height: 250,
                }}
                onClick={() => {
                  document.getElementById("img-AddItem").click();
                }}
              >
                <MdAddCircleOutline className="fs-1" />
                <p className="p-0 m-0">Add More Image</p>
              </div>
            </div>
          ) : (
            <div
              className="py-2 px-2 text-success fs-5 fw-bold border border-2 rounded-3 d-flex justify-content-between align-items-center d-inline-block"
              style={{
                backgroundColor: "whitesmoke",
                cursor: "pointer",
                width: "25%",
              }}
              onClick={() => {
                document.getElementById("img-AddItem").click();
              }}
            >
              <p className="p-0 m-0">Add Attachment Here</p>
              <MdAttachFile className="" />
            </div>
          )}

          <div className="d-flex justify-content-center mt-3">
            {handleAddItem.isLoading ? (
              <Button
                variant="success"
                type="submit"
                className="px-5 text-white fs-5 fw-bolder"
                disabled
              >
                Adding Item...
              </Button>
            ) : (
              <Button
                variant="success"
                type="submit"
                className="px-5 text-white fs-5 fw-bolder"
              >
                Add Item
              </Button>
            )}
          </div>
        </Form>
      </Container>
    </main>
  );
};

export default AddItem;
