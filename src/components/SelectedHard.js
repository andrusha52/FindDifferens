import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const levelArray = [
  {label: 'EASY', level: 5, color: 'green'},
  {label: 'NORMAL', level: 2, color: 'yellow'},
  {label: 'HARD', level: 1, color: 'red'},
];

const Item = ({item, levelHard, onChange}) => {
  return (
    <View
      style={[styles.itemConteiner, levelHard === item.level && styles.activ]}>
      <TouchableOpacity onPress={() => onChange(item.level)}>
        <Text style={[styles.text, {color: item.color}]}>{item.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const SelectedHard = props => {
  const {levelHard, onChange} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DIFFICULTY</Text>
      <View style={styles.listContainer}>
        {levelArray.map(item => (
          <Item item={item} levelHard={levelHard} onChange={onChange} />
        ))}
      </View>
    </View>
  );
};

export default SelectedHard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemConteiner: {
    margin: 2,
    padding: 4,
  },
  text: {
    fontFamily: 'LuckiestGuy-Regular',
    fontSize: 20,
  },
  activ: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 25,
  },
  title: {
    fontFamily: 'LuckiestGuy-Regular',
    width: '100%',
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
  },
  listContainer:{
      flexDirection: 'row',
  }
});
