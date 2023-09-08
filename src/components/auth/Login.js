import React, { useContext, useEffect, useState } from 'react';
import {Form, FormGroup, Input, Button, Label} from 'reactstrap';
import { auth } from '../../config/firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {

const [error, setError] = useState(false)
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const navigate = useNavigate()

const {dispatch} = useContext(AuthContext)

const handleLogin = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User signed in:", user);
        dispatch({type:"LOGIN", payload:user})
        navigate('/admin')
    })
    .catch((error) => {
        console.error("Error signing in:", error);
        setError(true)
    });
}


  return (
    <div className='login-wrapper'>
        <main className='login-container'>
            <h2 className='mb-4'>Sign in</h2>
            <Form onSubmit={handleLogin}>
                <FormGroup className='form-group'>
                    <Label for="">Email</Label>
                    <Input type='email' onChange={e=>setEmail(e.target.value)}/>
                    {error && 
                        <div className='text-danger small'>Please enter a valid email</div>
                    }
                </FormGroup>
                <FormGroup>
                    <Label for="">Password</Label>
                    <Input type='password' onChange={e=>setPassword(e.target.value)}/>
                    {error &&
                        <div className='text-danger small'>Please enter a valid password</div>
                    }
                </FormGroup>
                <Button type='submit' color="primary mt-4" block>Sign in</Button>
            </Form>
        </main>
    </div>
  )
}

export default Login