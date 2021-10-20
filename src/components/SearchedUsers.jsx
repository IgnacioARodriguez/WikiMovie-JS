import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { ListGroupItem, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from '@restart/ui/esm/Button'


export const SearchedUsers = ({ handleClick, handleClickFavSelected }) => {
    const searchedUser = useSelector((state) => {
        return state.searchedUser
    })
    const favouriteMoviesSelectedUser = useSelector((state) => {
        return state.favouriteMoviesSelectedUser
    })

    return (
        <div className='selectedMovie'>
            <Card.Img variant="to" src='https://react.semantic-ui.com/images/avatar/large/matthew.png' className='imgSelectedMovie' />
            <Card className='selectedCard' >
                <Card.Body className='cardBodySelectedMovie'>
                    <Card.Title><h1>{`${searchedUser.username}'s collection`}</h1> {<Button className='ButtonSelectedUser' onClick={handleClickFavSelected}>Favourite movies</Button>}</Card.Title>
                    <Card.Text className='ContainerImgFav'>
                        {favouriteMoviesSelectedUser.map((movie) => {
                            return <Link to={`/movie/${movie.imdbId}`}>
                                <Card.Img className='favouriteMoviesInUsers' onClick={() => { handleClick(movie.imdbId) }} variant="top" src={movie.link} />
                            </Link>
                        })}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem><h7>Email: </h7><h5>{searchedUser.email}</h5></ListGroupItem>
                </ListGroup>
            </Card>
        </div>
    )
}


export default SearchedUsers