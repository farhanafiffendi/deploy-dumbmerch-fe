import React, { useContext, useState } from 'react';
import cssModule from '../../css/register.module.css'
import { UserContext } from '../../context/userContext';
import 'bootstrap/dist/css/bootstrap.min.css'
// import LogoBesar from '../images/logoBesar.png';
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Alert } from 'react-bootstrap';

// Import useMutation from react-query here ...
import { useMutation } from 'react-query';

// Get API config here ...
import { API } from '../../config/api';

function FormRegister() {

    let navigate = useNavigate();
    console.log(navigate);

    const [state, dispatch] = useContext(UserContext);
    console.log(state);
    console.log(dispatch);

    const [message, setMessage] = useState(null);

    // Create variabel for store data with useState here ...
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    //timeout spinner

    const { name, email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Create function for handle insert data process with useMutation here ...

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration Content-type
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            // Data body
            const body = JSON.stringify(form);

            // Insert data user to database
            const response = await API.post('/register', body, config);

            console.log(response);

            if (response.data.status === "success...") {

                const alert = (
                    <Alert variant="success" className="py-1">
                        Register Success
                    </Alert>
                );
                setMessage(alert)
                setForm({
                    name: '',
                    email: '',
                    password: '',
                })
            } else {
                const alert = (
                    <Alert variant="danger" className="py-1">
                        Failed
                    </Alert>
                );
                setMessage(alert)
            }
            // Handling response here
        } catch (error) {
            if (error.response.data.message === "Email Already Exist!!!") {
                console.log(error.response.data.message);
                const alertEmail = (
                    <Alert variant="danger" className="py-1">
                        Email sudah terdaftar
                    </Alert>
                );
                setMessage(alertEmail);
            } else if (error.response.data.message === "\"email\" is not allowed to be empty") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Email tidak boleh kosong
                    </Alert>
                );
                setMessage(email);
            } else if (error.response.data.message === "\"password\" length must be at least 6 characters long") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Password minimal 6 karakter
                    </Alert>
                );
                setMessage(email);
            } else if (error.response.data.message === "\"name\" is not allowed to be empty") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Nama tidak boleh kosong
                    </Alert>
                );
                setMessage(email);
            } else if (error.response.data.message === "\"password\" is not allowed to be empty") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Password tidak boleh kosong
                    </Alert>
                );
                setMessage(email);
            } else if (error.response.data.message === "\"name\" length must be at least 3 characters long") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Nama minimal 6 karakter
                    </Alert>
                );
                setMessage(email);
            } else if (error.response.data.message === "\"email\" length must be at least 6 characters long") {
                const email = (
                    <Alert variant="danger" className="py-1">
                        Email minimal 6 karakter
                    </Alert>
                );
                setMessage(email);
            }
        }
    });

    return (
        <div className="container mt-5 text-light">
            <div className="col-lg-12 d-flex justify-content-end">
                <div className="row">
                    <div className="d-flex justify-content-end">
                        <div className={cssModule.containerRegister}>
                            <form onSubmit={(e) => handleSubmit.mutate(e)}>
                                {message && message}
                                <h2>Register</h2>
                                <label>Name</label>
                                <input type="text" placeholder="Name" value={name} name="name" onChange={handleChange} />
                                <label>Email</label>
                                <input type="email" placeholder="Email" value={email} name="email" onChange={handleChange} />
                                <label>Password</label>
                                <input type="password" placeholder="Password" value={password} name="password" onChange={handleChange} />
                                <button> Click to register </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default FormRegister
