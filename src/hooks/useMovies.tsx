import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { Movie, MovieDBMoviesResponse } from '../interfaces/movieInterface';

interface MovieState {
    nowPlaying: Movie[],
    popular: Movie[],
    topRated: Movie[],
    upComing: Movie[]
}

export const useMovies = () => {
    const [isLoading, setisLoading] = useState(true)
    const [moviesState, setMoviesState] = useState<MovieState>({
        nowPlaying: [],
        popular:    [],
        topRated:   [],
        upComing:   []
    })


    const getMovies = async () => {

        const nowPlayingPromise = movieDB.get<MovieDBMoviesResponse>('/now_playing')
        const popularPromise    = movieDB.get<MovieDBMoviesResponse>('/popular')
        const topRatedPromise   = movieDB.get<MovieDBMoviesResponse>('/top_rated')
        const upComingPromise   = movieDB.get<MovieDBMoviesResponse>('/upcoming')

        const response = await Promise.all([ 
            nowPlayingPromise, 
            popularPromise, 
            topRatedPromise, 
            upComingPromise
        ])

        setMoviesState ({
            nowPlaying: response[0].data.results,
            popular:    response[1].data.results,
            topRated:   response[2].data.results,
            upComing:   response[3].data.results,
        })

        setisLoading( false )
    }
 
    useEffect(() => {
        getMovies()
    }, []) 

     return {
         ...moviesState,
         isLoading
     }
    
}