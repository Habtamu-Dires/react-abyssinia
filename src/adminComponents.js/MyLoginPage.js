import * as React from 'react';
import {useState} from 'react';
import { userLogin, useNotify, Notification, useSafeSetState, useLogin, required } from 'react-admin';
import { Modal,ModalHeader, ModalBody, ModalFooter ,FormGroup,  } from 'reactstrap';
//import { baseUrl } from '../shared/baseUrl';

const baseUrl = process.env.REACT_APP_BASE_URL;

const MyLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = e => {
        e.preventDefault();
        // will call authProvider.login({email, password})
        login({username, password}).catch(()=> 
            notify('Invalid username or password')
        );
    }; 
    //forget password
    const [modal, setModal] = useState(false);
    
    const toggle = () =>{
        setModal(!modal)
    }

    const sendRestRequest = () => {
        toggle();
        const email = document.getElementById('email').value;
        console.log(email)
        const apiUrl =  baseUrl + 'users/forgetPassword';
        fetch(apiUrl, {           
            method: 'POST',
            headers: { 
                'Content-Type':'application/json' 
            },
            body: JSON.stringify({
                email: email
            }),
           
        })
        .then(response => response.json())
        .then(response => {
            notify(response.status)
            console.log(response)
        })
        .catch(err => console.log(err))

    }

    const ForgetPassword = () => {
        return(
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Forget Passsword </ModalHeader>
                <ModalBody>
                    <form onSubmit={sendRestRequest}>
                        <FormGroup className='row'>
                            <label htmlFor='email' className='col-3'>Email</label>
                            <input id='email' name='email' className='col-6' type='email'  
                                   required/>
                        </FormGroup> 
                        <FormGroup className='row mt-5'>
                            <div className='col-12 d-flex justify-content-center'>
                                <input className='btn btn-primary' type='submit' value="Send Request"></input>
                            </div>                           
                        </FormGroup>      
                    </form>
                </ModalBody>
            </Modal>
        );
        
    }

    return (
        <div className='container'>            
            <Modal isOpen={true} >
                <ModalHeader className='row'>
                    <div className='col-12 d-flex justify-content-center'>
                        <h3>Abyssinia Admin</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <FormGroup className='row'>
                            <label htmlFor='username' className='col-3'>Username</label>
                            <input name='username' className='col-6' type='text' value ={username} 
                                onChange={e => setUsername(e.target.value)} required/>
                        </FormGroup>
                        <FormGroup className='row'>
                            <label htmlFor='password' className='col-3'>Password</label>
                            <input name='password' className='col-6' type='password' value={password}
                                onChange={e => setPassword(e.target.value)} required/>
                        </FormGroup>
                        <FormGroup className='row mt-5'>
                            <div className='col-12 d-flex justify-content-center'>
                                <input className='btn btn-success' type='submit' value="Login"></input>
                            </div>                           
                        </FormGroup>                                                
                    </form>
                </ModalBody>
                <ModalFooter>
                    <div>
                        <a  onClick={toggle} href='#'>Forget Password</a>
                    </div>
                </ModalFooter>
            </Modal> 
            <div>
                {<ForgetPassword />}
            </div>                          
        </div>        
    )
}

export default MyLoginPage;