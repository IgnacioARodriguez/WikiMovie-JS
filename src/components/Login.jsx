import React from 'react'

import { Form, Button } from 'react-bootstrap'

export const Login = ({ handleSubmitLogin, handleChangeEmailLogin, handleChangePasswordLogin }) => {
    return (
        <div className='minContainerLogin'>
            <div className='containerRegisterFormLogin'>
                <Form onSubmit={handleSubmitLogin} method="post" className='RegisterFormLogin'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <h1><Form.Label>Log In!</Form.Label></h1>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Registrate con tu Email" onChange={handleChangeEmailLogin} />
                        <Form.Text className="text-muted">
                            Nosotros nunca compartiremos tu Email con nadie.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Crea tu contrasena" onChange={handleChangePasswordLogin} />
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