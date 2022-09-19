import React from 'react';
import {Form, FormGroup, Input, Button, Label} from 'reactstrap';

const Login = () => {
  return (
    <div className='login-wrapper'>
        <main className='login-container'>
            <h2 className='mb-4'>Sign in</h2>
            <Form>
                <FormGroup className='form-group'>
                    <Label for="">Username</Label>
                    <Input type='text'/>
                </FormGroup>
                <FormGroup>
                    <Label for="">Password</Label>
                    <Input type='password'/>
                </FormGroup>
                <Button color="primary mt-4" block>Sign in</Button>
            </Form>
        </main>
    </div>
  )
}

export default Login