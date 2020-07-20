/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {ListHeader} from '../components/ListHeader';
import {ListItem} from '../components/ListItem';
import {fetchPokemonsList} from '../apiService';
import {useDebounce} from '../hooks/useDebounce';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
 
const LIST = '@pokeDexList';
 

const HomeView = ({navigation}) => {
  const [data, setData] = useState([]);
  const [source, setSource] = useAsyncStorage('@pokeDexList');

  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  // const [storedData, storeData] = useAsyncStorage(LIST);



  useEffect(() => {
    (async () => {
      const list = await AsyncStorage.getItem('@pokeDexList');

      if (list == null) {
        const response = await fetchPokemonsList();
        setSource(response.results);
      } 

        setData(source);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  // const storeData = async value => {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await AsyncStorage.setItem('@pokedex_List', jsonValue);
  //   } catch (e) {
  //     console.error('Saving Error', e);
  //   }
  // }


  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@pokedex_List')
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     console.error('GetError', e);
  //   }
  // }


  const refreshPokemonsList = async () => {
    setIsRefreshing(true);
    const response = await fetchPokemonsList();
    await setSource(response.results);
    setData(source);
    setIsRefreshing(false);
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filterPokemons = useCallback(
    term =>
      source.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase()),
      ),
    [source],
  );

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredPokemons = filterPokemons(debouncedSearchTerm);
      setData(filteredPokemons);
    } else {
      setData(source);
    }
  }, [debouncedSearchTerm, source, filterPokemons]);

  // const filterPokemons = term => {
  //   if (term){
  //     const result = storedData.filter(item =>
  //       item.name.toLowerCase().includes(term.toLowerCase()),
  //     );
  //     console.log(result);
  //     setData(result);
  //   } else {
  //     setData(storedData);
  //   }

  //   data.filter(item => item.name.toLowerCase().includes(term.toLowerCase()));
  // };

  const barStyle = Platform.OS === 'ios' ? 'default' : 'light-content';
  const isLoading = data == null;


  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor="purple"/>
      <SafeAreaView style={styles.appContainer}>
        {isLoading? (
          <ActivityIndicator/>
        ) : (
           <FlatList
            onRefresh={refreshPokemonsList}
            refreshing={isRefreshing}
            ListHeaderComponent={<ListHeader onChange={setSearchTerm} />}
            data={data}
            scrollEnabled={!isRefreshing}
            keyExtractor={(item, index) => item.name + index}
            windowSize={5}
            renderItem={({item, index}) => {
              return (
                <>
                <ListItem item={item} name={item.name} index={index} isRefreshing={isRefreshing} url={item.url} navigation={navigation} />
                </>
               // <TouchableOpacity
                //   onPress={() => Alert.alert(item.name, item.url)}
                //   key={index}
                //   style={[styles.itemContainer, isRefreshing && styles.disabledItem]}>
                //   <Text style={styles.text}>{item.name}</Text>
                // </TouchableOpacity>
              );
            }}
            />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    backgroundColor: '#eee',
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: '100',
    color: 'purple',
  },
  button: {
    justifyContent: 'center',
    padding: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  disabledItem: {
    backgroundColor: 'grey'
  }
});

export default HomeView;
