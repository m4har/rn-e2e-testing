import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

const App = () => {
  const [state, setState] = useState({
    data: [{id: 0, text: 'Lorem Ipsum'}],
    input: '',
  });
  // action
  const onSetInput = (text: string) =>
    setState((prev) => ({...prev, input: text}));
  const onAddData = () =>
    setState((prev) => ({
      data: [...prev.data, {text: prev.input, id: prev.data.length + 1}],
      input: '',
    }));
  const onDeleteData = (id: number) => () => {
    const newDataDelete = state.data.filter((item) => item.id !== id);
    setState((prev) => ({...prev, data: newDataDelete}));
  };
  // flatlist helper
  const keyExtractor = (item: {id: number; text: string}, index: number) =>
    index.toLocaleString();
  const renderItem = (props: {
    item: {id: number; text: string};
    index: number;
  }) => {
    const {item, index} = props;
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.textItem}>{`${index + 1}. ${item.text}`}</Text>
        <TouchableOpacity
          testID={`deleteData${index}`}
          onPress={onDeleteData(item.id)}
          style={styles.deleteButton}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* input */}
      <View style={styles.containerInput}>
        <TextInput
          value={state.input}
          placeholder="Type Something"
          style={styles.input}
          onChangeText={onSetInput}
          testID="inputData"
        />
        <TouchableOpacity
          onPress={onAddData}
          testID="addData"
          style={styles.buttonInput}>
          <Text>UPDATE</Text>
        </TouchableOpacity>
      </View>
      {/* list */}
      <FlatList
        data={state.data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInput: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonInput: {
    flex: 1,
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#ecf0f1',
    marginVertical: 5,
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  textItem: {
    width: '90%',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default App;
