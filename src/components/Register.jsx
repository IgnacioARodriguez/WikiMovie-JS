import React from 'react'
import { Form, Button } from 'react-bootstrap'

export const Register = ({ handleSubmitRegister, handleChangeUserRegister, handleChangeEmailRegister, handleChangePasswordRegister }) => {
    return (
        <div className='minContainer'>
            <div className='containerRegisterForm'>
                <Form onSubmit={handleSubmitRegister} method="post" className='RegisterForm'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <h1><Form.Label>Sign Up!</Form.Label></h1>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Registrate con tu Email" onChange={handleChangeEmailRegister} />
                        <Form.Text className="text-muted">
                            Nosotros nunca compartiremos tu Email con nadie.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control placeholder="Crea tu usuario" onChange={handleChangeUserRegister} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Crea tu contrasena" onChange={handleChangePasswordRegister} />
                        <Form.Text className="text-muted">
                            Tu contrasena estara encriptada.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}