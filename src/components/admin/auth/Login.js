import React from 'react';
import {Form, FormGroup, Input, Button} from 'reactstrap';

const Login = () => {
  return (
    <div className='login-wrapper'>
        <main className='login-container'>
            <h4 className='mb-4'>Login</h4>
            <Form>
                <FormGroup className='form-group'>
                    <Input type='text' placeholder='Username' />
                </FormGroup>
                <FormGroup>
                    <Input type='password' placeholder='Password' />
                </FormGroup>
                <Button color="primary" block>Login</Button>
            </Form>
        </main>
    </div>
  )
}

export default Login