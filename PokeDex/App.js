/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {fetchPokemonsList} from './apiService';

const App = () => {
  const [data, setData] = useState([]);
  const barStyle = Platform.OS === 'ios' ? 'default' : 'light-content';

  useEffect(() => {
    (async () => {
      const response = await fetchPokemonsList();
      setData(response.results);
    })();
  }, [])
  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor="purple"/>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={({item, index, separator}) => (
              <TouchableOpacity 
              style={styles.button}
                onPress={() => console.log(item)}
                key={Date.now() + index}>
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
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
  }
});

export default App;
