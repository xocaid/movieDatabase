import { ChangeEvent, useState } from "react";
import MovieCard, { MovieInfo } from "./movieCard";
import styles from '../styles/movieHome.module.css';
import Header from "./header";

const movieAPI = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMBD_API_KEY}&`

const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    //{}: empty object & only empty object
    //object: with anything inside of it
    //union(|): value can be of type object or null
    const [movieRes, setMovieRes] = useState<MovieInfo[] | null>(null);

    //Tracking updates to input field
    function searched(searchEvent: ChangeEvent<HTMLInputElement>) {
        setSearchInput(searchEvent.currentTarget.value)
    }

    //Submitting the searchInput and calling the API
    function submitSearch() {
        fetch(movieAPI + `s=${searchInput}`)
            .then(res => res.json())
            .then(data => setMovieRes(data.Search))

    }
    return (

        <div className={styles.home_div}>
            <div>
                <Header />
            </div>
            <div className={styles.search}>
                <input
                    className={styles.searchBar}
                    placeholder="Search for Movie..."
                    type='text'
                    onChange={searched}
                    value={searchInput}
                />
                <div className={styles.searchButtonContainer}>
                    <button className={styles.button} onClick={submitSearch}>Search</button>
                </div>
            </div>
            <div className={styles.movieCardGrid}>

                {movieRes && (
                    movieRes.map((movie, index) => {
                        return (
                            <MovieCard key={index} movieInfo={movie} />
                        )
                    })

                )
                }
            </div>

            {/*
input field - state to keep track of user input(controlled input)
button to fetch data - onClick 
        onClick --> makes the fetch request
        State --> save data from fetch

Render the movie card once you have the data fetched/completed
*/}
        </div>
    )
}
export default Home;