import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {setTimerIsOver} from '../../redux/reducer';
import {useDispatch} from 'react-redux';

const minusMinute = minut => {
  const m = Number(minut);
  if (m.toString().length === 1) {
    return `0${m - 1}`;
  } else if (m < 11) {
    return `0${m - 1}`;
  } else {
    return `${m - 1}`;
  }
};

const getTime = time => {
  const value = time.split(':');
  if (value[0] === '00' && value[1] === '00') {
    return '00:00';
  }
  if (value[1] === '00') {
    return `${minusMinute(value[0])}:59`;
  } else {
    return `${value[0]}:${minusMinute(value[1])}`;
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontFamily: 'LuckiestGuy-Regular',
    color: 'red',
  },
});

const TimerCountDown = ({timer, runTimer}) => {
  const [time, setTime] = useState(`0${timer}:00`);
  const [int, setInt] = useState(-1);

  const dispatch = useDispatch();

  const onFinish = useCallback(() => {
    dispatch(setTimerIsOver(false));
  }, [dispatch]);

  useEffect(() => {
    if (!runTimer) {
      clearInterval(int);
      setInt(-1);
    }

    if (timer > 0 && runTimer) {
      const interval = window.setInterval(() => {
        setTime(getTime);
      }, 1000);
      setInt(interval);
    }
    if (time === '00:00') {
      onFinish();
      clearInterval(int);
      setInt(-1);
    }
    return () => {
      clearInterval(int);
      setInt(-1);
    };
  }, [int, onFinish, runTimer, time, timer]);
  return (
    <View>
      <Text style={styles.text}>{time}</Text>
    </View>
  );
};

export default TimerCountDown;
