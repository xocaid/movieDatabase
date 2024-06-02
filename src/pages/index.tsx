import { ChangeEvent, useState } from "react";
import MovieCard, { MovieInfo } from "./movieCard";
import styles from '../styles/movieHome.module.css';
import Link from "next/link";

const movieAPI = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMBD_API_KEY}&`

const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    //{}: empty object & only empty object
    //object: with anything inside of it
    //union(|): value can be of type object or null
    const [movieRes, setMovieRes] = useState<MovieInfo[] | null>(null);
    const PAGE_SIZE = 10;
    const [pageResults, setPageResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    //Tracking updates to input field
    function searched(searchEvent: ChangeEvent<HTMLInputElement>) {
        setSearchInput(searchEvent.currentTarget.value)
    }

    //Submitting the searchInput and calling the API
    //Default value of 1 for the first search, if you don't give it a number
    function submitSearch(pageNum: number = 1) {
        fetch(movieAPI + `s=${searchInput}&page=${pageNum}`)
            .then(res => res.json())
            .then(data => {
                if('Search' in data){
                    setMovieRes(data.Search)
                    setPageResults(Math.ceil(data.totalResults / data.Search.length));
                }else{
                    setMovieRes([]);
                    setPageResults(0);
                }
            })

    }
    //_ --> an existing value you can't ignore, but won't use
    const allPages = [...Array(pageResults)].map((_, i) => i + 1);
    const startSlice = Math.floor(currentPage / PAGE_SIZE) * PAGE_SIZE;
    const endSlice = startSlice + PAGE_SIZE;

    return (

        <div className={styles.home_div}>

            <div className={styles.search}>
                <input
                    className={styles.searchBar}
                    placeholder="Search for Movie..."
                    type='text'
                    onChange={searched}
                    value={searchInput}
                />

                <div className={styles.searchButtonContainer}>
                    <div>
                        <Link
                            className={styles.button}
                            href='/favorites'>
                            Favorites
                        </Link>
                    </div>
                    <div className={styles.buttonDiv}>
                        <button
                            className={styles.button}
                            onClick={() => submitSearch()}>
                            Search
                        </button>
                    </div>
                </div>

            </div>
            {movieRes === null && (
                <div className={styles.intro}>
                    <h1>Welcome to the Movie Database!</h1>
                    <p>
                        Look for your favorite TV series and movies. Get some quick info on
                        what you are searching for, it comes in handy for quick trivia questions!
                    </p>
                    <p>Start by entering the TV show or movie into the Search Bar and click Search!</p>
                    <p>Once you find what you are looking for, you can also add/remove to your Favorites by clicking the Add/Remove to Favorites button.
                        If you want to see all your Favorites, click on the Favorites button at the top of the page to see your list!
                    </p>

                </div>
            )}
            {movieRes?.length === 0 && (
                <div className={styles.intro}>
                    Sorry, no results.
                </div>
            )}

            <div className={styles.movieCardGrid}>
                {movieRes && (
                    movieRes.map((movie, index) => {
                        return (
                            <MovieCard key={index} movieInfo={movie} />
                        )
                    })
                )}
            </div>
            {(movieRes ?? []).length > 0 && (
                <div>
                    {currentPage == 1 ? '' :
                        <button className={styles.pg_btn}
                            onClick={() => {
                                submitSearch(currentPage - 1)
                                setCurrentPage(currentPage - 1)
                            }}>
                            Back
                        </button>
                    }
                    {
                        allPages.slice(startSlice,
                            Math.min(endSlice, pageResults)).map((pageNum) => (
                                <button
                                    className={`${styles.pg_btn} ${currentPage == pageNum ? styles.other : ''}`}
                                    onClick={() => {
                                        submitSearch(pageNum)
                                        setCurrentPage(pageNum);
                                    }}>
                                    {pageNum}
                                </button>
                            ))
                    }
                    {/* next button - ternary */}
                    {currentPage >= 1 && currentPage < pageResults ?
                        <button
                            className={styles.pg_btn}
                            onClick={() => {
                                submitSearch(currentPage + 1)
                                setCurrentPage(currentPage + 1)
                            }}>
                            Next
                        </button>
                        : ''
                    }
                </div>
            )}

        </div>
    )
}
export default Home;