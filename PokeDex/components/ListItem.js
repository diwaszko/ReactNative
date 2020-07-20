import { Text, View, Alert, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import { fetchPokemonsDetails } from "../apiService";
import React, { useState, useEffect } from "react";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import AsyncStorage from "@react-native-community/async-storage";
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
const AbortController = window.AbortController;




export const ListItem = ({item, index, isRefreshing, navigation}) => {
    const [details, setDetails] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        (async () => {
            const response = await fetchPokemonsDetails(item.url, signal);
            setDetails(response);
        })();
        return () => controller.abort();
    },[item.url]);

    const renderDetails = () => {
        if(details.length === 0){
            return <ActivityIndicator size="small" />;
        }
        return (
            <>
                <Image source={{ uri: details.sprites.front_default }} style={ styles.imageSize } />
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{details.id}</Text>
            </>
        );
    };


    return (
        <View>
        <TouchableOpacity 
            onPress={() => navigation.navigate('Details', { name: item.name })}
            // onPress={() => Alert.alert(item.name, item.url)}
            key={index}
            style={[styles.itemContainer, isRefreshing && styles.disableItemContainer]}>
            {renderDetails()}
        </TouchableOpacity>
        </View>
    );
}; 

const styles = StyleSheet.create({
    text: {
      fontSize: 20,
      fontWeight: '100',
      color: 'purple',
    },
    disableItemContainer: {
        backgroundColor: '#eee',
    },
    itemContainer: {
        padding: 8,
    },
    imageSize: {
        width: 75,
        height: 75
    }
  });























// export const ListItem = ({item, index, isRefreshing}) => {
//     const [details, setDetails] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [detailsSource, setDetailsSource] = useAsyncStorage(
//         `@pokeDex_details_${item.name}`,
//     );
//     useEffect(() => {
//         // const controller = new AbortController();
//         // const signal = controller.signal;

//         (async () => {
//             // setIsLoading(true);
//             const pokemonDetails = await AsyncStorage.getItem(
//                 `@pokeDex_details_${item.name}`,
//             );
//             if (pokemonDetails == null) {
//                 const response = await fetchPokemonsDetails(item.url);
//                 setDetails(response);            
//             }
//             setDetails(detailsSource);
//             setIsLoading(false);
//         })();
//         // return () => controller.abort();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     },[detailsSource]);

//     const isActive = !isLoading && details != null;

//     const renderDetails = () => {
//         if(!isActive){
//             return <ActivityIndicator size="small" />;
//         }
//         return (
//             <>
//                 <Image source={{ uri: details.sprites.front_default }} style={ styles.imageSize } />
//                 <Text style={styles.text}>{item.name}</Text>
//                 <Text style={styles.text}>ID: {details.id}</Text>
//             </>
//         );
//     };


//     return (
//         // <View>
//         <TouchableOpacity 
//             onPress={() => navigation.navigate('Details', { name: item.name })}
//             // onPress={() => Alert.alert(item.name, item.url)}
//             disabled={!isActive}
//             key={item.index}
//             style={[styles.itemContainer, item.isRefreshing && styles.disableItemContainer]}>
//             {renderDetails()}
//         </TouchableOpacity>
//         // </View>
//     );
// }; 

// const styles = StyleSheet.create({
//     text: {
//       fontSize: 20,
//       fontWeight: '100',
//       color: 'purple',
//     },
//     disableItemContainer: {
//         backgroundColor: '#eee',
//     },
//     itemContainer: {
//         padding: 8,
//     },
//     imageSize: {
//         width: 75,
//         height: 75
//     }
//   });