import AsyncStorage from '@react-native-community/async-storage';
import {useState, useEffect} from 'react';
// import App from '../App';

export const useAsyncStorage = key => {
    const [storedValue, setValue] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const stringifiedValue = await AsyncStorage.getItem(key);
                const value = stringifiedValue != null ? JSON.parse(stringifiedValue) : null;
                setValue(value);
            } catch (error){
                console.error('Load error', error)
            }
        })();
    },[key]);

    const setStoredValue = async value => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
          } catch (error) {
            console.error('Store Value Error', error);
          }
    };
    return [storedValue, setStoredValue];
};
