import { Form, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { EditText, EditTextarea } from 'react-edit-text';
import { Link, useParams, useNavigate} from 'react-router-dom';
import { Redirect } from 'react-router';
import AddAgent from './AddAgent';
import 'react-edit-text/dist/index.css';


const EditAgent = props => {
    const { id } = useParams();
    let heading = 'Edit Agent';
    let navigate = useNavigate();

    let [name, setName] = useState('');
    let [role, setRole] = useState('');
    let [facebook, setFacebook] = useState('');
    let [instagram, setInstagram] = useState('');
    let [twitter, setTwitter] = useState('');
    let [linkedIn, setLinkedIn] = useState('');
    let [image,setImage]=useState('');
    let [url, setUrl] = useState("");

    const uploadImage = () => {
       
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "RealEstate")
        data.append("cloud_name", "doud75rhx")

        fetch(" https://api.cloudinary.com/v1_1/doud75rhx/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)

                
                
            })
            
            .catch(err => console.log(err))
        console.log("Cloudinary called");
        console.log(data.url);
       
        
    }

    

    useEffect(() => {
        axios.get("http://localhost:4000/teamMembers/edit-teamMember/" + id)
            .then((res) => {
                setName(res.data.name);
                setRole(res.data.role);
                setFacebook(res.data.facebook);
                setInstagram(res.data.instagram);
                setTwitter(res.data.twitter);
                setLinkedIn(res.data.linkedIn);
               // setImage(res.data.url);
            })
            .catch((err) => alert(err));
    }, id);

    

    function submit(event) {
     
    // above
      
        event.preventDefault();

        const Agent = {
            image: props.image,
            name: name,
            role: role,
            facebook: facebook,
            instagram: instagram,
            twitter: twitter,
            linkedIn: linkedIn,
        }
        console.log("Submit called");

        axios.put("http://localhost:4000/teamMembers/edit-teamMember/" + id, Agent)
            .then(res => { alert("Agent updated Successfully"); })
            .catch(res => alert("An unexpected error occured, occured make sure you filled all fields " + res.data));
        navigate("/Admin/TeamMembers", { replace: true });
    }

    


    return (
        <div className=' ps-5 pt-5 pb-5 me-5 mb-5 bg-white rounded'>
            <div>
                <h3 className='text-primary text-center mb-4 mt-3 mb-5'><strong> {heading}</strong></h3>

                <Form onSubmit={submit}>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm={{ span: 3, offset: 1 }}>
                            <strong>
                                Name:
                            </strong>
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm={{ span: 3, offset: 1 }}>
                            <strong>
                                Role:
                            </strong>
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                type="text"
                                placeholder="Enter role"
                                defaultValue={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm={{ span: 3, offset: 1 }}>
                            <strong>
                                Facebook Profile:
                            </strong>
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                type="text"
                                placeholder="Paste facebook profile link"
                                defaultValue={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm={{ span: 3, offset: 1 }}>
                            <strong>
                                Instagram Profile:
                            </strong>
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                type="text"
                                placeholder="Paste instagram profile link"
                                defaultValue={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm={{ span: 3, offset: 1 }}>
                            <strong>
                                Twitter Profile:
                            </strong>
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                type="text"
                                placeholder="Paste twitter profile link"
                                defaultValue={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm={{ span: 3, offset: 1 }}>
                            <strong>
                                LinkedIn Profile:
                            </strong>
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                type="text"
                                placeholder="Paste linkedin profile link"
                                defaultValue={linkedIn}
                                onChange={(e) => setLinkedIn(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                   
            
        

                    <div className='text-center mt-5 mb-3'>
                        <Button  className='btn btn-primary btn-md ms-2 ps-3 pe-3' type="submit">
                            Update
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}


export default EditAgent;
