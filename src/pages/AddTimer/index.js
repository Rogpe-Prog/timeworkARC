import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Linking, StatusBar, Switch, Image } from 'react-native'
import BackgroundTimer from 'react-native-background-timer'
import ReactNativeAN from 'react-native-alarm-notification'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors'
import Logo from '../../assets/logo.png'
import Insta from '../../assets/instagram.png'

const AddTimer = ({ navigation }) => {
    const [segs, setSegs] = useState(0)
    const [mins, setMins] = useState(0)
    
    const [segsBack, setSegsBack] = useState(0)
    const [minsBack, setMinsBack] = useState(0)

    const [replay, setReplay] = useState(false)
    const [play, setPlay] = useState(false)

    const [disableTouch, setDisableTouch] = useState(false)
    const [disableSwitch, setDisableSwitch] = useState(true)

    const [enableModal, setEnableModal] = useState(false)
    const [enableNotify, setEnableNotify] = useState(false)

    const [ids, setIds] = useState(0) 
    const [habil, setHabil] = useState(false)
    const [notif, setNotif] = useState(false)
    const [pause, setPause] = useState(false)

    let minutes = mins * 60 * 1000
    let seconds = segs * 1000
    let total = minutes + seconds

    const alarmNotifData = { 
        title: "Bora Bora",
        message: "Time to Work!!!",
        channel: "my_channel_id",
        small_icon: "ic_launcher",
    } 

    const setMin = () => {
        if((mins < 4) && (minsBack < 4)){
            setMins(mins + 1)
            setMinsBack(minsBack + 1)
        } else {
            setMins(0)
            setMinsBack(0)
        }
        setDisableSwitch(false)
    }
    const setSeg = () => {
        if((segs <= 60) && (segsBack <= 60 )){
            setSegs(segs + 5)
            setSegsBack(segsBack + 5)
            if(segs === 55){
                setSegs(segs + 4)
                setSegsBack(segsBack + 4)
            } 
        } 
        if(segs === 59){
            setSegs(0)
            setSegsBack(0)
        }
        setDisableSwitch(false)
    }

    const starter = () => {
        if(!(mins === 0 && segs === 0)){
            if (notif) alarmOn()
            setHabil(true)
            setDisableSwitch(true)
            setPause(true)
          } 
        setPlay(!play)
        setDisableTouch(true)
        setDisableSwitch(true)
    }

    const zeroAll = () => {
        setSegs(0)
        setMins(0)
        setSegsBack(0)
        setMinsBack(0)
        setReplay(false)
        setPlay(false)
        setDisableTouch(false)
        setDisableSwitch(true)
        setNotif(false)
        setEnableNotify(false)
        setEnableModal(false)
        setPause(false)

        if(notif) alarmOff() 

    }

    useEffect(() => {
        let interval = null;
        if((minsBack === 0) && (segsBack === 0)){
            setReplay(false)
        }
        if (play) {
          interval = BackgroundTimer.setInterval(() => {
            if(segs > 0){
              setSegs(segs => segs - 1)
            }
            if (segs === 0){
              if(mins === 0){
                setPlay(false)
                setReplay(true)
                if(!(mins === 0) && (segs === 0)){
                    console.log(mins, segs)
                    setDisableTouch(false)
                    setDisableSwitch(false)
                }
                if(enableModal) {
                    deeplink()
                   setEnableModal(false)
                }
                if(enableNotify) {
                    setEnableNotify(true)
                }
                setPause(false)
                BackgroundTimer.clearInterval(interval)
              } else {
                setMins(mins => mins - 1)
                setSegs(59)
                setReplay(false)
              }
            }
          }, 1000);
        } else if (!play && segs !== 0) {
          BackgroundTimer.clearInterval(interval);
          setReplay(false)
        } 
  
    return () => BackgroundTimer.clearInterval(interval);
    }, [play, segs])


    const backReplay = () => {
        setMins(minsBack)
        setSegs(segsBack)
        if(notif) alarmOff() 

        if(ids !== 0) alarmOff() 

        setPlay(false)
        setEnableNotify(false)
        setEnableModal(false)
        setNotif(false)

        setDisableSwitch(false)
    }

    const toggleModal = () => {
        setEnableModal(previousState => !previousState)
      }
      const toggleNotify = () => {
        setEnableNotify(previousState => !previousState)
        setNotif(true)
      }

      const alarmOn = async () => {
        const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + total));
        const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate }); 
        setIds(alarm.id)
      }

      const alarmOff = () => { 
        if(habil){
          ReactNativeAN.deleteAlarm(ids);
          ReactNativeAN.deleteRepeatingAlarm(ids);
          ReactNativeAN.stopAlarmSound();
          ReactNativeAN.removeAllFiredNotifications();
        }
        setHabil(false)
      }

    const deeplink = () => {
        if(notif) alarmOff() 
        if(ids !== 0) alarmOff() 
        Linking.openURL('timework://Loading')
    }

    const deeplinkInsta = () => {
      Linking.openURL('https://www.instagram.com/personal.arc/')
    }

    return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.blackPearl} />
        <View style={styles.viewTextTitle}>
            <Text style={styles.title}>Intervalo de Recuperação</Text>
        </View>
        <View style={styles.viewInput}>
            <Text style={styles.titleDescanso}>Descanso:</Text>
                <View style={styles.displayNums}>
                    <TouchableOpacity style={styles.displayMin} onPress={setMin} disabled={disableTouch}>
                    <Text style={styles.displayText}>
                       {mins}
                    </Text>
                    <Text style={[styles.displayText, styles.displayTextMin]}>
                        m
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.displayMin} onPress={setSeg} disabled={disableTouch}>
                        <Text style={styles.displayText}>
                            {segs === 0 ? '00' : segs <= 9 ? '0'.concat(segs) : segs}
                        </Text>
                        <Text style={[styles.displayText, styles.displaySeg]}>
                            s
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.buttonTimerAdd}>

                        {
                            replay 
                            ?
                            <TouchableOpacity onPress={backReplay}>
                                <Icon
                                    name="replay" 
                                    size={30}
                                    color={Colors.turquese}
                                />
                            </TouchableOpacity>
                            :
                            <View style={{width: 30}}>
                                
                            </View>
                        }
                    </View>

                </View> 
                <View style={styles.buttonAdd} >
                    <TouchableOpacity
                        onPress={starter}
                        style={styles.addButton}
                        disabled={pause}
                    >

                          <Icon
                            name="play-arrow" 
                            size={40}
                            color={Colors.blueDark}
                            style={styles.buttonClose}
                          />
                    {/* {
                        play 
                        ? 
                        <Icon
                            name="pause" 
                            size={40}
                            color={Colors.blueDark}
                            style={styles.buttonClose}
                        />
                        :
                        <Icon
                            name="play-arrow" 
                            size={40}
                            color={Colors.blueDark}
                            style={styles.buttonClose}
                        />
                    } */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={zeroAll}
                        style={styles.zeroButton}
                    >
                        <Icon
                            name="close"
                            size={40}
                            color={Colors.redDark}
                            style={styles.buttonClose}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewButtons}>
                    <View style={styles.viewButtonSwitch} >
                        <View>
                            <Text style={styles.textButtonAlerta}>Notificação</Text>
                            <Text style={styles.textButtonAlerta}>Alerta sobre a Tela</Text>
                        </View>
                        <View>
                            <Switch
                            style={styles.switchButton}
                            trackColor={{ false: Colors.asphalt, true: Colors.asphalt }}
                            thumbColor={enableNotify ? Colors.green : Colors.white}
                            onValueChange={toggleNotify}
                            value={enableNotify}
                            disabled={disableSwitch}
                            />

                            <Switch
                            style={styles.switchButton}
                            trackColor={{ false: Colors.asphalt, true: Colors.asphalt }}
                            thumbColor={enableModal ? Colors.green : Colors.white}
                            onValueChange={toggleModal}
                            value={enableModal}
                            disabled={disableSwitch}
                            />
                        </View>

                    </View> 
                </View>

                <View style={styles.footer}>
                    <View style={styles.viewImage} >
                      <TouchableWithoutFeedback onPress={() => navigation.push('Loading')}>
                        <Image source={Logo} />
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.viewAds}>
                      <TouchableOpacity onPress={deeplinkInsta}>
                        <Image source={Insta} style={styles.instagram} />
                      </TouchableOpacity>
                    </View>
                </View>

        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.blackPearl,
    }, 
    viewTextTitle: {
      paddingTop: 30,
      alignItems: 'center',
      marginBottom: 40,
    },
    title: {
      margin: 18,
      color: Colors.white,
      fontSize: 26,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-thin',
    },
    buttonAddTitle: {
      margin: 10,
      color: Colors.white,
      fontSize: 26,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-thin',
    },
    buttonAdd: {
      flexDirection: 'row',
      marginTop: 10,
    },
    titleDescanso: {
      margin: 4,
      color: Colors.white,
      fontSize: 18,
      alignSelf: 'flex-start',
      marginLeft: 40,
      fontFamily: 'sans-serif-thin',
    },
    viewInput: {
      flex: 3,
      alignItems: 'center',
    },
    viewButtons: {
      flex: 2,
      alignItems: 'center',
      marginTop: 100,
    },
    viewImage: {
      flex: 1,
    },
    viewAds: {
      flex: 3,
      padding: 8,
      marginRight: 20,
      marginLeft: 10,
      alignItems: 'center',
      flexDirection: 'row-reverse'
    },
    textAds: {
      fontSize: 18,
      color: Colors.white,
    },
    textButtonAlerta: {
      color: Colors.white,
      fontSize: 22,
      marginHorizontal: 20,
      marginBottom: 20,
    },
    viewButtonSwitch: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    switchButton: {
        marginHorizontal: 20,
        marginBottom: 15,
    },
    buttonClose: {
      marginHorizontal: 10,
    },
    buttonAddSize: {
      marginHorizontal: 25,
    },
    displayNums: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: 300,
      height: 130,
      borderRadius: 15,   
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: Colors.asphalt,
    },
    displayMin: {
      flexDirection: 'row',
    },
    displayText: {    
      color: Colors.white,
      fontSize: 60,
      fontFamily: 'sans-serif-thin', 
    },
    displayTextMin: {
      marginHorizontal: 3,
      marginRight: 8,
    },
    displayBack: {
      flexDirection: 'row-reverse',
      alignSelf: 'flex-end',
      marginLeft: 36,
      marginBottom: -30,
      zIndex: 1,   
    },
    buttonTimerAdd: {
        zIndex: 1,
        marginRight: -45,
        marginLeft: 15,
        marginBottom: 70,
    },
    buttonTimerRemove: {
        zIndex: 1,
        marginRight: -45,
        marginLeft: 10,
        marginBottom: -70,
    },
    zeroButton:{
        marginHorizontal: 50,
    },
    addButton:{
        marginHorizontal: 50,
    },
    footer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    instagram: {
      width: 30,
      height: 30,
    },
  })

export default AddTimer
