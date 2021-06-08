import React, { useRef, useEffect } from "react";
import { Animated, Text, StyleSheet, StatusBar, SafeAreaView, Image, TouchableOpacity } from "react-native"

import Colors from '../../styles/Colors'
import Logo from '../../assets/logo.png'

const Loading = ({ navigation }) => {

  useEffect(() => {

      let timesRun = 0
      let interval = setInterval(function(){
      timesRun += 1
      if(timesRun === 7){
          clearInterval(interval)
      }
      flipAnimation()
    }, 200)

  }, [])

  let animatedValue = new Animated.Value(0)
  let currentValue = 0

  animatedValue.addListener(({value}) => {
    currentValue = value
  })

  const setInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  })

  const rotateYAnimatedStyle = {
    transform: [{ rotateY: setInterpolate}]
  }

  const flipAnimation = () => {
    if(currentValue >= 90){
      Animated.spring(animatedValue, {
        toValue: 0,
        useNativeDriver: false
      }).start()
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        useNativeDriver: false
      }).start()
    }
  }    
   
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor={Colors.blackPearl} />
        <Text style={styles.title}>Time Work</Text>
        
          <TouchableOpacity onPress={()=> navigation.navigate('AddTimer')}>
            <Animated.Image 
              source={Logo}
              style={[rotateYAnimatedStyle, styles.image]}
            />
          </TouchableOpacity>

        <Text style={styles.title}>
            Cada segundo conta
        </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.blackPearl,
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: Colors.blackPearl,
  },
  image: {
    borderRadius: 6,
    resizeMode: 'contain',
    height: 350, 
    width: 350, 
    margin: -25, 
  },
  title: {
    color: Colors.white,
    fontFamily: 'sans-serif-thin',
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: -25,
    marginTop: -10,
    zIndex: 1,
  },
});

export default Loading;