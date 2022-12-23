import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { Form, Button, Container, } from 'react-bootstrap'
import { FaUserPlus } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa'
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '', password2: '' });
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);

    const [addUser] = useMutation(ADD_USER);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [verifyPassError, setVerifyPassError] = useState('');
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            if (formState.password === formState.password2) {
                const mutationResponse = await addUser({
                    variables: {
                        email: formState.email,
                        password: formState.password,
                        username: formState.username
                    },
                });
                const token = mutationResponse.data.addUser.token;
                const username = mutationResponse.data.addUser.user.username;
                setUsernameError('');
                setEmailError('');
                setPasswordError('');
                Auth.login(token, username);
            } else {
                setVerifyPassError('Passwords must match!')
            }
        } catch (err) {
            setUsernameError('');
            setEmailError('');
            setPasswordError('');
            setVerifyPassError('');
            if (!formState.username) {
                setUsernameError('Unique username is required!')
            }
            if (!formState.email) {
                setEmailError('Unique email is required!')
            }
            if (!formState.password) {
                setPasswordError('Password is required!')
            } else if (!formState.password.length < 8) {
                setPasswordError('Password must be at least 8 characters in length!')
            }
        }

    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <Container className='w-auto d-flex justify-content-center'>
            <Form className='text-center w-50 d-flex flex-wrap align-items-center flex-column log-form' onSubmit={handleFormSubmit}>
                <Form.Text>
                    <h1 className="text-center mb-3 log-header"><FaUserPlus /> Signup</h1>
                </Form.Text>

                <Form.Group className="mb-3 w-auto">
                    <Form.Label className='log-text'>Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" id="username" name="username" onChange={handleChange} />
                </Form.Group>
                <p style={{ color: "#DFA420" }}>{usernameError}</p>

                <Form.Group className="mb-3 w-auto">
                    <Form.Label className='log-text'>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id="email" name="email" onChange={handleChange} />
                </Form.Group>
                <p style={{ color: "#DFA420" }}>{emailError}</p>

                <Form.Group className="mb-3 w-auto">
                    <Form.Label className='log-text'>Password</Form.Label>
                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" name="password" id="pwd" onChange={handleChange} />
                </Form.Group>
                <p style={{ color: "#DFA420" }}>{passwordError}</p>

                <Form.Group className="mb-3 w-auto">
                    <Form.Label className='log-text'>Verify Password</Form.Label>
                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Verify Password" name="password2" id="pwd2" onChange={handleChange} />
                    <FaEye style={{ color: "white" }} onClick={togglePassword}>Show Password</FaEye>
                </Form.Group>
                <p style={{ color: "#DFA420" }}>{verifyPassError}</p>

                <Button className="w-auto" id='log-button' type="submit">
                    Submit
                </Button>
                <Form.Text className="text-muted">
                    <div className="lead mt-2 w-auto">
                        <p className='mb-0 log-text'>
                            Have an account?
                        </p>
                        <Link className="log-goto" to="/login">← Go to Login</Link>
                    </div>
                </Form.Text>
            </Form>
        </Container >
    );
}

export default Signup;