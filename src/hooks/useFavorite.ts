import { MovieInfo } from "@/pages/movieCard";

const useFavorite = () => {
    const getFavorites = (): MovieInfo[] => {
        //getItem --> Pulls from the favorites key in local storage
        const getLocal = localStorage.getItem('favorites');
        //storeLocal --> Checks if getLocal is null, if it is then it sets an empty array
        //Otherwise, it parses getLocal(info store in favorites) converts from strings into objects to be usable
        const storeLocal = (getLocal == null) ? [] : JSON.parse(getLocal);
        return storeLocal;
    };

    const saveFavorites = (favorites: MovieInfo[]) => {
        const toString = JSON.stringify(favorites);
        localStorage.setItem('favorites', toString)
    };

    //If movie has already in favorites --> it returns true and exits
    //If movie is not in favorites --> it needs to return false outside the for loop to not exit early
    //ID --> is the imbdID from the movie object
    //Comparing it to the saved favorites info
    const isInFavorites = (id: string) => {
        const favorites = getFavorites();
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].imdbID == id) {
                return true;
            }
        }
        return false;
    };
    
    const addToFavorites = (movie: MovieInfo) => {
        const favorites = getFavorites();
        favorites.push(movie);
        saveFavorites(favorites);
    };

    const removeFromFavorites = (id: string) => {
        const favorites = getFavorites();
        const filteredDelete = favorites.filter((movie) => movie.imdbID !== id);
        saveFavorites(filteredDelete);
    };

    return {
        getFavorites,
        isInFavorites,
        addToFavorites,
        removeFromFavorites,
    };
}
export default useFavorite;