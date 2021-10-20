
import { Disclosure } from '@headlessui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, FormControl, Button } from 'react-bootstrap'


export default function NavBar({ handleSubmit, handleChange, handleClickLogOut }) {

    const userLoggedIn = useSelector((state) => {
        return state.userLoggedIn.username
    })

    return (
        <div className='navBar'>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="relative flex items-center justify-between h-16">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                </div>
                                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex-shrink-0 flex items-center">
                                        <Link className='linkLogo' to='/'>
                                            <img
                                                className="block lg:hidden h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                                alt="Workflow"
                                            />
                                        </Link>
                                        <Link className='linkLogo' to='/'>
                                            <img
                                                className="hidden lg:block h-8 w-auto "
                                                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                                alt="Workflow"
                                            />
                                            <text className='logoText'>movies</text>
                                        </Link>
                                    </div>
                                    <div className="hidden sm:block sm:ml-6">
                                        <Form className="d-flex formSearchMovie" onSubmit={handleSubmit}>
                                            <FormControl
                                                type="search"
                                                placeholder="Search movie by title"
                                                className="mr-2"
                                                aria-label="Search"
                                                onChange={handleChange}
                                            />
                                            <Button variant="outline-success">Search</Button>
                                        </Form>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {!userLoggedIn ? <div><Link to='/login'> <Button className='LogInButton'> Log In </Button></Link> <Link to='/register'> <Button className='LogOutButton'>Register</Button> </Link></div>
                                        : <div className='ButtonsLog'>
                                            <div>
                                                <Link className='signed' to='/users'>{<Button className='LogInButton'>{`Signed in as: ${userLoggedIn}`}</Button>}</Link>
                                            </div>
                                            <div>
                                                <Button className='LogoutButton' onClick={handleClickLogOut}>Log Out</Button>
                                            </div>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Disclosure>
        </div>
    )
}
