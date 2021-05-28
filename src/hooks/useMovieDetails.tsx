import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import movieDB from '../api/movieDB';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/movieInterface';

interface MovieDetails {
    isLoading: boolean
    MovieFull?: MovieFull
    cast: Cast[]
}

export const useMovieDetails = ( movieId: number ) => {

    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        MovieFull: undefined,
        cast: []
    })

    const getMovieDetails = async () => {
        const movieDetailsPromise = await movieDB.get<MovieFull>(`/${movieId}`)
        const castPromise         = await movieDB.get<CreditsResponse>(`/${movieId}/credits`)
        
        const [ movieDetailsResponse, castPromiseResponse ] = await Promise.all([ movieDetailsPromise, castPromise ])
        
        setState({ 
            isLoading: false,
            MovieFull: movieDetailsResponse.data,
            cast: castPromiseResponse.data.cast
        })
    }


    useEffect(() => {
        getMovieDetails()
    }, [])

    return {
        ...state
    }
}