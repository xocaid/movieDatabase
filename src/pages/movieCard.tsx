import React from "react";

interface Props {
    movieInfo: {
        Poster: string,
        Title: string,
        imdbRating: string,
        Year: string,
        Plot: string
    }
}

const MovieCard = ({ movieInfo }: Props) => {
    return (
        <div>
            One Div Box for One Entry
            <div>
                Poster
                <img src={movieInfo.Poster} alt={movieInfo.Title} className="movie_poster"></img>
                <div>
                    Title
                    <h1>{movieInfo.Title}</h1>
                    <div>
                        IMDB Rating - place next to year
                        <h3>{movieInfo.imdbRating}</h3>
                        <div>
                            Year - place next to imdb rating
                            {movieInfo.Year}
                            <div>
                                Plot - brief plot & add a see more... to see the entire plot
                                <p>{movieInfo.Plot}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MovieCard;