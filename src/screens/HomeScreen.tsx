import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';

export const HomeScreen = () => {

    const { width } = Dimensions.get('window')

    const { nowPlaying, popular, topRated, upComing, isLoading } = useMovies()
    const { top } = useSafeAreaInsets();

    if ( isLoading ) {
        return ( 
            <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="red" size={ 50 } />
            </View>
        )
    }

    const navigation = useNavigation();
     return (

        <ScrollView>

            <View style={{ marginTop: top + 20 }}>

                {/* Main Carousel */}
                
                <View style = {{ height: 440 }}>
                    <Carousel 
                        data = { nowPlaying }
                        renderItem = { ( { item }: any ) => <MoviePoster movie = { item } />}
                        sliderWidth = { width }
                        itemWidth = { 300 }
                        inactiveSlideOpacity = {1} //Proyectos personales, quitarlo
                    /> 
                </View>

                {/* Popular Movie */}

                <HorizontalSlider title = "Popular" movies = { popular } />
                <HorizontalSlider title = "TopRated" movies = { topRated } />
                <HorizontalSlider title = "UpComing" movies = { upComing } />

            </View>

        </ScrollView>

    )
}