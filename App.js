import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useRef, useState} from "react";
import MapView, {Marker} from "react-native-maps";

export default function App() {
  const mapRef = useRef(null)
  const [region, setRegion] = useState({
    latitude: 15,
    longitude: 15,
    latitudeDelta: 30,
    longitudeDelta: 30
  })
  const [count, setCount] = useState(0)
  const [values, setValues] = useState([1])
  const [longMag, setLongMag] = useState([0,0])

  const randomizeLocation = () => {
    // limit to equator
    let long = Math.floor(Math.random() * 180) - 90
    // limit between 0 and 180
    let mag = Math.floor(Math.random() * 360) - 180
    mag = Math.min(mag, 80)
    mag = Math.max(mag, 100)

    setLongMag([mag, long])
    mapRef.current.animateToRegion({
        latitude: mag,
        longitude: long,
        latitudeDelta: 30,
        longitudeDelta: 30
        })
  }

  return (
    <View style={styles.container}>
      <Text>Count {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)}/>
      <Button title="Decrement" onPress={() => setCount(count - 1)} style={{marginBottom: "20px"}}/>

      <Button title="Randomize Location" onPress={randomizeLocation} />

      {/*value table*/}
      <Text>Values</Text>
      <Button title="Add Value" onPress={() => setValues([...values, values.length+1])} />
      <Button title="Remove Value" onPress={() => setValues(values.slice(0, -1))} />

      <View>
        {values.map((value, index) => <Text key={index}>{value}</Text>)}
      </View>

        <MapView ref={mapRef} style={styles.map} region={region}>
          { values.map((value, index) =>
                  <Marker key={index} coord
                          inate={{latitude: longMag[0], longitude: value * 10}}/>)
          }
        </MapView>
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
  map: {
    width: '100%',
    height: '50%'
  },
});
