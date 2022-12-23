import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { Form, Button, Container, } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa';
import "../App.css"

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      const username = mutationResponse.data.login.user.username;
      Auth.login(token, username);
    } catch (e) {
      console.log(e);
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
          <h1 className="text-center mb-3 log-header"><FaUser /> Login</h1>
        </Form.Text>
        <Form.Group className="mb-3 w-auto">
          <Form.Label className='log-text'>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id="email" name="email" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3 w-auto">
          <Form.Label className='log-text'>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" id="pwd" onChange={handleChange} />
        </Form.Group>
        <Form.Text className="text-muted">
          {error ? (
            <div>
              <p className="error-text">Could not find an account with those credentials</p>
            </div>
          ) : null}
        </Form.Text>
        <Button className="w-auto" id='log-button' type="submit">
          Submit
        </Button>
        <Form.Text className="text-muted">
          <div className="lead mt-2 w-auto">
            <p className="mb-0 log-text">
              No Account?
            </p>
            <Link className="log-goto" to="/signup">← Go to Signup</Link>
          </div>
        </Form.Text>
      </Form>
    </Container >
  );
}

export default Login;