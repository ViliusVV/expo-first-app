import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useState} from "react";

export default function App() {
  const [count, setCount] = useState(0)
  const [values, setValues] = useState([1, 2])

  return (
    <View style={styles.container}>
      <Text>Count {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      {/*value table*/}
        <Text>Values</Text>
        <Button title="Add Value" onPress={() => setValues([...values, values.length + 1])} />
        <Button title="Remove Value" onPress={() => setValues(values.slice(0, -1))} />
        <View>
          {values.map((value, index) => <Text key={index}>{value}</Text>)}
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
