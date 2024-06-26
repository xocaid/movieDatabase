import React from "react";
import styles from '../styles/movieCard.module.css';
import FavButton from "./favbtn";
import no_img from '../imgs/no_img.jpeg';

export interface MovieInfo {
    Poster: string,
    Title: string,
    Type: string,
    Year: string,
    Plot: string,
    imdbID: string
}

interface Props {
    movieInfo: MovieInfo;
}

const MovieCard = ({ movieInfo }: Props) => {
    return (
        <div className={styles.movieCardDiv}>
            <div className={styles.movieCardPoster}>
                <img src={movieInfo.Poster == 'N/A'? no_img.src: movieInfo.Poster} alt={movieInfo.Title} />
            </div>
            <div className={styles.movieCardSumm}>
                <div className={styles.movieCardTitle}>
                    <h1>{movieInfo.Title}</h1>
                </div>
                <div>
                    <h4>{movieInfo.Type[0].toUpperCase() + movieInfo.Type.slice(1)}</h4>
                </div>
                <div>
                    <h4>{movieInfo.Year}</h4>
                </div>
            </div>
            <div>
                <FavButton movieLiked={movieInfo}/>
            </div>
        </div>
    )
}
export default MovieCard;