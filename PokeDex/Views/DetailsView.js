import * as React from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';

import {useAsyncStorage} from '../hooks/useAsyncStorage'
import AnimatedBar from '../components/AnimatedBar';


const DetailsView = ({route}) => {
    const {name} = route.params;
    const {detailsSource, setDetailsSource} = useAsyncStorage(
        `@pokeDex_details_${name}`,
    );
    if (!detailsSource) return <ActivityIndicator />;
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: detailsSource.sprites.front_shiny,
                }}
                style={styles.image}
                />
            <Text>{name}</Text>
            {detailsSource.stats.map((item, index) => (
                <View key={index} style={styles.statsContainer}>
                    <Text style={styles.statsText}>{`${item.stat.name}: ${item.base_stat}`}</Text>
                    <AnimatedBar value={item.base_stat} index={index}></AnimatedBar>
                </View>
            ))}  
        </View>
    );
};


const styles = {
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      image: {
          width: 150,
          height: 150
      },
      text: {
        fontSize: 20,
        fontWeight: '100',
        color: 'purple'
      },
      statsContainer: {
          flexDirection: 'row',
          alignItems: 'center'
      },
      statsText: {
          marginRight: 4
      },
      button: {
        justifyContent: 'center',
        padding: 8,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
      },
      disabledItem: {
        backgroundColor: 'grey'
      }
}


export default DetailsView;

