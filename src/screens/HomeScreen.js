import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomeScreen = () => {
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const handleItemClick = () => {
    setItemCount(itemCount + 1);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <TouchableOpacity style={styles.cardButton} onPress={handleItemClick}>
        <Text style={styles.cardButtonText}>Click to Count</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>Item Click Count: {itemCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardButton: {
    marginTop: 10,
    backgroundColor: '#226b94',
    padding: 10,
    borderRadius: 5,
  },
  cardButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#ff5722',
    padding: 10,
    borderRadius: 50,
  },
  floatingButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
