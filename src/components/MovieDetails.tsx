import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import  Icon  from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter'
import { CastItem } from './CastItem';

interface Props {
    MovieFull: MovieFull
    cast: Cast[]
}

export const MovieDetails = ({ MovieFull, cast }: Props) => {
     return (
         <>
            {/* Details */}
            <View style={{ marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon 
                        name  ="star-outline"
                        color ="grey"
                        size  = { 17 }
                    />
                    <Text> { MovieFull.vote_average } </Text>
                    <Text style = {{ marginLeft: 5 }}>
                        - { MovieFull.genres.map( genere => genere.name ).join(', ') }
                    </Text>
                </View>

                { /* History */}
                <Text style = {{ fontSize: 25, marginTop: 10, fontWeight: 'bold' }}>
                    Historia
                </Text>
                <Text style = {{ fontSize: 16}}>{MovieFull.overview}</Text>
                <Text style = {{ fontSize: 25, marginTop: 10, fontWeight: 'bold' }}>
                    Presupuesto
                </Text>
                <Text style = {{ fontSize: 16, fontStyle: 'italic' }}>
                    { currencyFormatter.format( MovieFull.budget, {code: 'USD'}) }
                </Text>
            </View>

            { /* Actors */}

            <View style = {{ marginTop: 10, marginBottom: 100 }}>
                <Text style = {{ fontSize: 25, marginTop: 10, fontWeight: 'bold', marginLeft: 20 }}>
                    Actores
                </Text>
                <FlatList  
                    data = { cast }
                    keyExtractor = { (item) => item.id.toString()}
                    renderItem = { ({item}) => <CastItem actor = {item} />}
                    horizontal = { true }
                    showsHorizontalScrollIndicator = { false }
                    style = {{ marginTop: 10, height: 70 }}
                />
            </View>
            
         </>
        
    )
}