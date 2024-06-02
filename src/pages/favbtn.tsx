import useFavorite from "@/hooks/useFavorite";
import React, { useState } from "react";
import { MovieInfo } from "./movieCard";
import styles from '../styles/movieHome.module.css';

interface Props {
    movieLiked: MovieInfo
}

const FavButton = ({ movieLiked }: Props) => {
    // A state value that will be toggled to trigger a re-render so that
    // isInFavorites() can run after `likedMovie()` is executed
    const [renderHack, setRenderHack] = useState(false);
    const {
        isInFavorites,
        addToFavorites,
        removeFromFavorites
    } = useFavorite();

    const likedMovie = () => {
        if (isInFavorites(movieLiked.imdbID) == true) {
            removeFromFavorites(movieLiked.imdbID)
        } else {
            addToFavorites(movieLiked)
        }

        setRenderHack(!renderHack);
    }
    return (
        <button
            className={isInFavorites(movieLiked.imdbID) ? styles.button: styles.btn_like}
            onClick={likedMovie}>
                {isInFavorites(movieLiked.imdbID) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
    )
}

export default FavButton;