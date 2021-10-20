import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { ListGroupItem, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Users = ({ handleClick }) => {
    const userLoggedInUsername = useSelector((state) => {
        return state.userLoggedIn.username
    })
    const userLoggedInEmail = useSelector((state) => {
        return state.userLoggedIn.email
    })
    const favMovies = useSelector((state) => {
        return state.favouriteMovies
    })

    return (
        <div className='selectedMovie'>
            <Card.Img variant="to" src='https://react.semantic-ui.com/images/avatar/large/matthew.png' className='imgSelectedMovie' />
            <Card className='selectedCard' >
                <Card.Body className='cardBodySelectedMovie'>
                    <Card.Title><h1>{`${userLoggedInUsername}'s collection`}</h1> Favourite movies</Card.Title>
                    <Card.Text className='ContainerImgFav'>
                        {favMovies.map((movie) => {
                            return <Link to={`/movie/${movie.imdbId}`}>
                                <Card.Img className='favouriteMoviesInUsers' onClick={() => { handleClick(movie.imdbId) }} variant="top" src={movie.link} />
                            </Link>
                        })}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem><h7>Email: </h7><h5>{userLoggedInEmail}</h5></ListGroupItem>
                </ListGroup>
            </Card>
        </div>
    )
}


export default Users