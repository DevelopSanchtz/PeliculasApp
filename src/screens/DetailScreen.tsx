import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Movie } from '../interfaces/movieInterface';
import { RootStackParams } from '../navigation/NavigationScreen';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

const heightDimension = Dimensions.get('screen').height

export const DetailScreen = ({ route, navigation }: Props) => {

    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const { isLoading, MovieFull, cast  } = useMovieDetails( movie.id )

     return (
         <ScrollView>

            <View style={styles.imageContainer}>
                <View style={styles.imageBorder}>
                    <Image 
                        source = {{ uri }}
                        style = {styles.posterImage}
                    />
                </View>
            </View>

            <View style={styles.marginContainer}>
                <Text style = {styles.subtitle}>{ movie.original_title }</Text>
                <Text style = {styles.title}>{ movie.title }</Text>
            </View>

                {
                    isLoading
                    ? <ActivityIndicator size = { 35 } color = "grey" style = {{ marginTop: 20 }} />
                    : <MovieDetails MovieFull = { MovieFull! } cast = { cast } />
                }
                
            {/* Button back */} 

            <View style = {styles.backButton}>
                <TouchableOpacity>
                    <Icon 
                        color = "red"
                        name = "arrow-back-outline"
                        size = {50}
                    /> 
                </TouchableOpacity>
            </View>  

         </ScrollView>
    )
}

const styles = StyleSheet.create({
    posterImage: {
        flex: 1,
        
    },
    imageContainer: {
        width: '100%',
        height: heightDimension * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        
        elevation: 10,
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25
        
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },

    subtitle: {
        fontSize: 16,
        opacity: 0.6
    },
    title: {
        fontSize: 18, 
        fontWeight: 'bold'
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25
    },
    backButton: {
        position: 'relative',
        elevation: 9, //Android
        bottom: 600,
        left: 20 
    }
})