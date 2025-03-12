import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import Slider from "@react-native-community/slider";

export default function App() {
  const [price, setPrice] = useState(0)
  const [down, setDown] = useState(0);
  const [time, setTime] = useState(0);
  const [interest, setInterest] = useState(0);
  const [monthly, setMonthly] = useState(0);
  useEffect(() => {
    if (down > price){
      setDown(price);
    }
    const principal = price - down;
    const months = time * 12;
    const monthlyInterestRate = (interest / 100) / 12;
    let result = 0;
    if (monthlyInterestRate === 0) {
      if (months > 0) {
        result = principal / months;
      } else {
        result = 0;
      }
    } else {
      const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months);
      const denominator = Math.pow(1 + monthlyInterestRate, months) - 1;
      result = numerator / denominator;
    }
    if (isNaN(result) || !isFinite(result)) {
      result = 0;
    }
    setMonthly(result);
  }, [price, down, time, interest]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mortgage calculator</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderTitle}>Purchase price: €{price.toLocaleString()}</Text>
        <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1000000}
            value={price}
            onValueChange={(value) => setPrice(value)}
            step={1000}
            tapToSeek
            minimumTrackTintColor="#af89ff"
            maximumTrackTintColor="#ffffff"
            thumbTintColor="#8c56ff"
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderTitle}>Down payment: €{down.toLocaleString()}</Text>
        <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={price}
            value={down}
            onValueChange={(value) => setDown(value)}
            step={1000}
            tapToSeek
            minimumTrackTintColor="#af89ff"
            maximumTrackTintColor="#ffffff"
            thumbTintColor="#8c56ff"
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderTitle}>Repayment time: {time} years</Text>
        <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={40}
            value={time}
            onValueChange={(value) => setTime(value)}
            step={1}
            tapToSeek
            minimumTrackTintColor="#af89ff"
            maximumTrackTintColor="#ffffff"
            thumbTintColor="#8c56ff"
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderTitle}>Interest rate: {interest}%</Text>
        <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={25}
            value={interest}
            onValueChange={(value) => setInterest(value)}
            step={1}
            tapToSeek
            minimumTrackTintColor="#af89ff"
            maximumTrackTintColor="#ffffff"
            thumbTintColor="#8c56ff"
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderTitle}>Loan amount</Text>
        <Text style={[styles.sliderTitle, styles.money]}>${price-down}</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderTitle}>Estimated pr. month</Text>
        <Text style={[styles.sliderTitle, styles.money]}>${monthly.toFixed(2)}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebf3',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 120,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#20253c',
    marginBottom: 30,
  },
  sliderContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  slider: {
    width: '80%',
  },
  sliderTitle: {
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'flex-start',
    paddingLeft: '10%',
  },
  money: {
    fontSize: 30,
    marginTop: 10,
  }

});
