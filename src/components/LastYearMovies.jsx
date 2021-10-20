import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';


const LastYearMovies = ({ handleClick, handleClickFavourites }) => {
    const movies = useSelector((state) => {
        return state.movies.Search
    })
    const searchedUser = useSelector((state) => {
        return state.searchedUser.id
    })
    return (
        <div className='divSearchedMovies'>
            {!movies ? <Carousel className='carousel'>
                {movieSlider.map((movie) => {
                    return <Carousel.Item interval={2000} className='carouselItem'>
                        <img
                            key={movie}
                            className="d-block w-100"
                            src={movie}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                })}
            </Carousel> : null}
            <div className='searchedMovies'>
                {movies ? movies.map((movie) => {
                    return (<Card key={movie.imdbID} className='individualSearchedMovie'>
                        <Link to={`/movie/${movie.imdbID}`}>
                            <Card.Img onClick={() => { handleClick(movie.imdbID) }} variant="top" src={movie.Poster} />
                        </Link>
                        <Card.Body>
                            <Card.Title>{movie.Title}</Card.Title>
                            <Card.Text>
                                {movie.Year}
                            </Card.Text>
                            <Link to={`/movie/${movie.imdbID}`}>
                                <Button onClick={() => { handleClick(movie.imdbID) }} color="primary">See More</Button>
                            </Link>
                        </Card.Body>
                    </Card>)
                }) : null}
            </div>
        </div>
    )
}

let movieSlider = ["https://cnnespanol.cnn.com/wp-content/uploads/2019/04/avengers-endgame-poster-records.jpg?quality=100&strip=info",
    'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/4f69c26f52e0f09529acc227deec289d1767f8cf59b7df2a6af6c1f2016da7cf._RI_V_TTW_.jpg',
    "https://wallpaperaccess.com/full/267247.jpg",
    'https://www.xtrafondos.com/descargar.php?id=4518&resolucion=2560x1440',
    'https://images3.alphacoders.com/809/thumb-1920-809706.jpg',
    'https://fondosmil.com/fondo/42183.png',
    'https://i0.wp.com/www.mexmads.com/wp-content/uploads/2021/02/nowayhome.jpg?fit=1920%2C1080',
    'https://seriestation.com/wp-content/uploads/Temporada-2-de-OBX-fecha-de-lanzamiento-trailer-reparto-y.jpg',
    'https://www.xtrafondos.com/descargar.php?id=4664&resolucion=2560x1440',
    'https://s1.1zoom.me/b5050/958/Clone_trooper_Star_Wars_Movies_Helmet_518354_1920x1080.jpg',
    'https://fondosmil.com/fondo/55692.jpg',
    'https://fondosmil.com/fondo/32254.jpg'
]
export default LastYearMovies;
