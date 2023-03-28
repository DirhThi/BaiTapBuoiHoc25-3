import React, { useState, useEffect } from 'react';
import {Alert, View, Text, Button, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const App = () => {
  const [data, setdata] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const fetchData = () => {
    setLoading(true);

    fetch('https://testnets-api.opensea.io/api/v1/assets')
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert("successed  " );

        setdata(responseJson.assets);
        setLoading(false);

      })
      .catch((error) => {
        Alert.alert("failed  " );

        console.error(error);
        setLoading(false);
      });
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.image_url }} style={styles.image}/>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Load API" onPress={fetchData} />
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  item: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
  },

  image: {
    width: 200,
    height: 200,
    marginRight: 9,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;