import React from 'react';
import {StyleSheet, Text, View, Picker} from 'react-native';

export default function CountryPicker(props) {
  if (props.loading) {
    return <Text>{props.loadingText}</Text>;
  }

  return (
    <View style={styles.container}>
      <Picker
        onValueChange={(country) => {
          props.setUserStorage('country', country);
          props.addCountryHandler(country);
        }}
        style={styles.picker}
        selectedValue={props.country}>
        {props.countries.map((country, index) => (
          <Picker.Item key={index} label={country.name} value={country.name} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
  },
});
