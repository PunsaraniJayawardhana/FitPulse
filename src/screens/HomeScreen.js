import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

const HomeScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [itemCount, setItemCount] = useState(0);
  const [instructionsVisible, setInstructionsVisible] = useState({}); // State to track visibility of instructions for each item

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://exercisedb.p.rapidapi.com/exercises', {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'cdece7abbbmshba10d662f9c7b29p1f800djsnf2fbcb5c3108',
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setItems(data); // Update items with API data
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchData();
  }, []);

  const handleItemClick = () => {
    setItemCount(itemCount + 1);
  };

  const toggleInstructions = (itemId) => {
    setInstructionsVisible((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.gifUrl }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardTarget}>Target Muscle: {item.target}</Text>
      <Text style={styles.cardEquipment}>Equipment: {item.equipment}</Text>
      <Text
        style={styles.cardInstructionViewer}
        onPress={() => toggleInstructions(index)}
      >
        <Text style={styles.cardInstructionViewer}>
          {instructionsVisible[index] ? 'Close Instructions' : 'See Instructions'}
        </Text>
      </Text>
      {instructionsVisible[index] && (
        <Text style={styles.cardInstructions}>Instructions: {item.instructions}</Text>
      )}
      <TouchableOpacity style={styles.cardButton} onPress={handleItemClick}>
        <Text style={styles.cardButtonText}>Click to Count</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#226b94" />
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} // Use index if no unique id exists
        />
      )}
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
    height: 180,
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: '#58595D',
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  cardTarget: {
    fontSize: 18,
    marginTop: 4,
    color: '#333',
  },
  cardEquipment: {
    fontSize: 18,
    marginTop: 4,
    color: '#333',
  },
  cardInstructions: {
    fontSize: 15,
    marginTop: 8,
    color: '#333',
  },
  cardInstructionViewer: {
    fontSize: 18,
    marginTop: 4,
    color: '#4450B9',
    fontStyle: 'italic',
  },
  cardButton: {
    marginTop: 15,
    backgroundColor: '#58595D',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  cardButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 50,
    opacity: 0.8,
  },
  floatingButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default HomeScreen;
