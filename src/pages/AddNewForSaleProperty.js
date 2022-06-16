import React, { useState } from "react";
import { Form, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
import { useLocation, render, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style.css';
import { WithContext as ReactTags } from 'react-tag-input';


export default function AddNewForSaleProperty(props) {
    let navigate = useNavigate();

    let [PropertyTitle, setPropertyTitle] = useState("");
    let [PropertyTagline, setPropertyTagline] = useState("");
    let [Address, setAddress] = useState("");
    let [City, setCity] = useState("");
    let [Price, setPrice] = useState("");
    let [DatePosted, setDatePosted] = useState("");
    let [Description, setDescription] = useState("");
    let [PropertyMapLocation, setPropertyMapLocation] = useState("");

    let [MainImage, setMainImage] = useState("");
    let [Images, setImages] = useState("");

    let [Bedrooms, setBedrooms] = useState("");
    let [Livingrooms, setLivingrooms] = useState("");
    let [TypeOfProperty, setTypeOfProperty] = useState("");
    let [Bathrooms, setBathrooms] = useState("");
    let [TotalRooms, setTotalRooms] = useState("");
    let [YearBuilt, setYearBuilt] = useState("");
    let [Kitchens, setKitchens] = useState("");
    let [AreaSqFt, setAreaSqFt] = useState("");
    let [Owner, setOwner] = useState("");

    let [Amenities, setAmenities] = useState([]);

    let [Places, setPlaces] = useState([]);
    let [PopularTags, setPopularTags] = useState([]);
    const [url, setUrl] = useState("");

    const delimiters = [13, 188];

    const uploadImage = () => {
    
        const data = new FormData()
        data.append("file", MainImage)
        data.append("upload_preset", "RealEstate")
        data.append("cloud_name", "doud75rhx")

        fetch(" https://api.cloudinary.com/v1_1/doud75rhx/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)
                console.log(data.url)
                
            })
            
            .catch(err => console.log(err))
    
    }


    function submit(event) {
        event.preventDefault();

        const property = {
            PropertyTitle: PropertyTitle,
            PropertyTagline: PropertyTagline,
            Address: Address,
            City: City,
            Price: Price,
            DatePosted: Date().toLocaleString(),
            Description: Description,
            PropertyMapLocation: PropertyMapLocation,

          //  MainImage: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            Images: 'Images',
            MainImage: url,

            Bedrooms: Bedrooms,
            Livingrooms: Livingrooms,
            TypeOfProperty: TypeOfProperty,
            Bathrooms: Bathrooms,
            TotalRooms: TotalRooms,
            YearBuilt: YearBuilt,
            Kitchens: Kitchens,
            AreaSqFt: AreaSqFt,
            Owner: Owner,

            Amenities: Amenities.map((a => a.text)),
            Places: Places.map((a => a.text)),
            PopularTags: PopularTags.map((a => a.text)),
        }

        console.log(property);
        axios.post('http://localhost:4000/ForSaleProperties/create-forSaleProperty', property)
            .then(res => {
                alert("Property added Successfully");
                navigate("/Admin/ForSaleProperties", { replace: true });
            })
            .catch(res => alert("An unexpected Error occured: " + res.data));

    }

    const handleDeleteTags = i => {
        setPopularTags(PopularTags.filter((tag, index) => index !== i));
    };

    const handleDeleteAmenities = i => {
        setAmenities(Amenities.filter((amenity, index) => index !== i));
    };

    const handleDeletePlaces = i => {
        setPlaces(Places.filter((place, index) => index !== i));
    };

    const handleAdditionTags = tag => {
        setPopularTags([...PopularTags, tag]);
    };

    const handleAdditionAmenities = amenity => {
        setAmenities([...Amenities, amenity]);
    };

    const handleAdditionPlaces = place => {
        setPlaces([...Places, place]);
    };

    const handleDragTags = (tag, currPos, newPos) => {
        const newTags = PopularTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setPopularTags(newTags);
    };

    const handleDragAmenities = (tag, currPos, newPos) => {
        const newTags = Amenities.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setAmenities(newTags);
    };

    const handleDragPlaces = (tag, currPos, newPos) => {
        const newTags = Places.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setPlaces(newTags);
    };

    return (
        <div className=' ps-5 pt-5 pb-5 me-5 mb-5 bg-white rounded'>
            <h3 className='text-primary text-center mt-3 mb-5'><strong>Add new Property</strong></h3>

            <Form onSubmit={submit}>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Title:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="text"
                            placeholder="Enter title for property"
                            defaultValue={PropertyTitle}
                            onChange={(e) => setPropertyTitle(e.target.value)}
                            autoFocus />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Tagline:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="text"
                            placeholder="Enter a tagline for property"
                            defaultValue={PropertyTagline}
                            onChange={(e) => setPropertyTagline(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Address:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="text"
                            placeholder="Enter property address"
                            defaultValue={Address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            City:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="text"
                            placeholder="Enter city of property"
                            defaultValue={City}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Price:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="number"
                            placeholder="Enter a property price"
                            defaultValue={Price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Area:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="number"
                            placeholder="Enter area in sqft"
                            defaultValue={AreaSqFt}
                            onChange={(e) => setAreaSqFt(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Map Location:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="text"
                            placeholder="Enter property location via google map link"
                            defaultValue={PropertyMapLocation}
                            onChange={(e) => setPropertyMapLocation(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Description:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="text"
                            placeholder="Enter property description"
                            defaultValue={Description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Number of Bedrooms:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="number"
                            placeholder="Enter number of bedrooms"
                            defaultValue={Bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Number of Living Rooms:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="number"
                            placeholder="Enter number of living rooms"
                            defaultValue={Livingrooms}
                            onChange={(e) => setLivingrooms(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Number of Bathrooms:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="number"
                            placeholder="Enter number of bathrooms"
                            defaultValue={Bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Number of Kitchens:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="number"
                            placeholder="Enter number of Kitchens"
                            defaultValue={Kitchens}
                            onChange={(e) => setKitchens(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Number of Total Rooms:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="number"
                            placeholder="Enter number of total rooms"
                            defaultValue={TotalRooms}
                            onChange={(e) => setTotalRooms(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Nature of Property:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="text"
                            placeholder="Enter nature of property"
                            defaultValue={TypeOfProperty}
                            onChange={(e) => setTypeOfProperty(e.target.value)}
                        />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Year Built:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="text"
                            placeholder="Enter year in which property was built"
                            defaultValue={YearBuilt}
                            onChange={(e) => setYearBuilt(e.target.value)}
                        />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Owner name:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="text"
                            placeholder="Enter property owner name"
                            defaultValue={Owner}
                            onChange={(e) => setOwner(e.target.value)}
                        />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Amenities:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <ReactTags
                            tags={Amenities}
                            delimiters={delimiters}
                            handleDelete={handleDeleteAmenities}
                            handleAddition={handleAdditionAmenities}
                            handleDrag={handleDragAmenities}
                            inputFieldPosition="top"
                            editable={true}
                            placeholder='Press enter to add new amenity'
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Places:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <ReactTags
                            tags={Places}
                            delimiters={delimiters}
                            handleDelete={handleDeletePlaces}
                            handleAddition={handleAdditionPlaces}
                            handleDrag={handleDragPlaces}
                            inputFieldPosition="top"
                            editable={true}
                            placeholder='Press enter to add new place'
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={{ span: 3, offset: 1 }}>
                        <strong>
                            Relevant Tags:
                        </strong>
                    </Form.Label>
                    <Col sm={6}>
                        <ReactTags
                            tags={PopularTags}
                            delimiters={delimiters}
                            handleDelete={handleDeleteTags}
                            handleAddition={handleAdditionTags}
                            handleDrag={handleDragTags}
                            inputFieldPosition="top"
                            editable={true}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm={{ span: 3, offset: 1 }}>
                    <strong>
                        Main Image :
                    </strong>
                </Form.Label>
                <Col sm={6}>
                    <Form.Control
                        type="file"
                        placeholder="Add image here"
                    
                        defaultValue={MainImage}
                        onChange={(e) => setMainImage((e.target.files[0]))}
                       
                    />
                   <button onClick={uploadImage} className='text-center mt-4 mb-5 ps-3 ' style={{
                position: 'relative',
                right: 5,
                
          }} >Save Image </button>
                   
                </Col>
                
                
            </Form.Group>

                <div className='text-center mt-5 mb-3'>
                    <Button className='btn btn-primary btn-md ms-2 ps-3 pe-3' type="submit">
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    )
}