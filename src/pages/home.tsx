import { useState } from "react";
import MovieCard from "./movieCard";

const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    //{}: empty object & only empty object
    //object: with anything inside of it
    //union(|): value can be of type object or null
    const [movieRes, setMovieRes] = useState<object | null>(null);
    return (
        <div>
            <input className= 'search_bar' placeholder="Search for Movie..."></input>
            {/* <MovieCard movieInfo={}/> */}

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