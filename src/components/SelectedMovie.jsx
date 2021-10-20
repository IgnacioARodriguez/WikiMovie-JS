import React from 'react'
import { Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { ListGroupItem, ListGroup } from 'react-bootstrap'

export const SelectedMovie = ({ addToFavourites, removeFromFavourites }) => {
    const selectedMovie = useSelector((state) => {
        return state.selectedMovie
    })

    return (
        <div className='selectedMovie'>
            <Card.Img variant="to" src={selectedMovie.Poster} className='imgSelectedMovie' />
            <Card className='selectedCard' >
                <Card.Body className='cardBodySelectedMovie'>
                    <Card.Title><h1>{selectedMovie.Title}</h1></Card.Title>
                    <Card.Text>
                        {selectedMovie.Plot}
                    </Card.Text>
                    <div className='selectedMovieButtons'>
                        <Button variant="primary" onClick={() => { addToFavourites() }} >Add to favourites</Button>
                        <Button variant="primary" onClick={() => { removeFromFavourites() }} >Remove from favourites</Button>
                    </div>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Actors: <h5>{selectedMovie.Actors}</h5></ListGroupItem>
                    <ListGroupItem>Genre: <h5>{selectedMovie.Genre}</h5></ListGroupItem>
                    <ListGroupItem>Awards: <h5>{selectedMovie.Awards}</h5></ListGroupItem>
                    <ListGroupItem>Producer: <h5>{selectedMovie.Production}</h5></ListGroupItem>
                    <ListGroupItem>Writer: <h5>{selectedMovie.Writer}</h5></ListGroupItem>
                </ListGroup>
            </Card>
        </div>
    )
}


export default SelectedMovie