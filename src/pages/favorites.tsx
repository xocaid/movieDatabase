import dynamic from 'next/dynamic'
import useFavorite from "@/hooks/useFavorite";
import MovieCard from "./movieCard";
import styles from '../styles/movieHome.module.css';
import Link from 'next/link';

const Favorites = () => {
    const { getFavorites } = useFavorite();

    return (
        <div className={styles.home_div}>
            <Link
                className={styles.button}
                href='/'>
                Return to Home
            </Link>
            <div className={styles.movieCardGrid}>
                {
                    getFavorites().map((favorite, index) => {
                        return (
                            <MovieCard key={index} movieInfo={favorite} />
                        )
                    })
                }
            </div>
        </div>

    )
}

// https://stackoverflow.com/a/57173209
export default dynamic(() => Promise.resolve(Favorites), {
    ssr: false,
});