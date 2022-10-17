import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  Image,
  Dimensions,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RadialGradient from 'react-native-radial-gradient';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts, Buttons, CommonStyles} from '../constants';
import pausedImage from '../assets/paused.png';
// Components
import MyAppText from '../components/MyAppText';
import MyAppButton from '../components/MyAppButton';
import DraggableCard from '../components/DraggableCard';

const {width, height} = Dimensions.get('window');
const ICON_SIZE = height * 0.025;

const Game = ({navigation}) => {
  let timerId;
  const [state, setState] = useState({
    dropZones: {
      areaOne: {
        coordinate: null,
        value: null,
        role: false,
      },
      areaTwo: {
        coordinate: null,
        value: null,
        role: false,
      },
      areaThree: {
        coordinate: null,
        value: null,
        role: true,
      },
    },
  });

  useEffect(() => {
    const backAction = () => {
      setState(prev => ({...prev, settings: !prev.settings}));
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    startNewGame();
    return () => {
      clearInterval(timerId);
      backHandler.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDropZoneValues = (event, name) => {
    const {layout} = event.nativeEvent;
    setState(prev => {
      let dropZones = {...prev.dropZones};
      dropZones[name].coordinate = layout;
      return {...prev, dropZones};
    });
  };

  const updateValue = (zone, value) => {
    setState(prev => {
      let dropZones = {...prev.dropZones};
      let prevState = {};
      prevState.lastCard = prev.dropZones[zone].value;
      prevState.score = prev.score;
      prevState.visibleCards = prev.visibleCards;
      prevState.cards = prev.cards;
      prevState.zoneChanged = zone;
      dropZones[zone].value = value;
      return {...prev, dropZones, prevState};
    });
    removeDropped(value);
  };

  const removeDropped = num => {
    setState(prev => {
      let cards = [...prev.cards];
      let droppedCardsIndex = cards.indexOf(num);
      let visibleCards = [...prev.visibleCards];
      let droppedCardIndex = visibleCards.indexOf(num);
      cards.splice(droppedCardsIndex, 1);
      visibleCards.splice(droppedCardIndex, 1);
      return {...prev, cards, visibleCards};
    });
    addingTwoCards();
    switchZone();
    updateScore();
    gameoverCheck();
  };

  const addingTwoCards = () => {
    setState(prev => {
      let visibleCards = [...prev.visibleCards];
      if (visibleCards.length === 6) {
        let cards = [...prev.cards];
        let newCards = cards.slice(6, 8);
        return {...prev, visibleCards: visibleCards.concat(newCards)};
      }
      return prev;
    });
  };

  const switchZone = () => {
    setState(prev => {
      let dropZones = {...prev.dropZones};
      let flipLimit = prev.flipLimit;
      let flipCount = prev.flipCount;

      if (flipCount === flipLimit) {
        dropZones.areaTwo.role = !dropZones.areaTwo.role;
        return {...prev, dropZones, flipCount: 0};
      } else {
        flipCount++;
        return {...prev, flipCount};
      }
    });
  };

  const updateScore = () => {
    setState(prev => {
      let playedCards = 111 - prev.cards?.length,
        timeElapsed = prev.timer,
        splitting = timeElapsed.split(':'),
        sec = parseInt(splitting[1], 10),
        min = parseInt(splitting[0], 10) * 60,
        score = parseInt((playedCards * 1000) / (min + sec) + prev.score, 10);
      return {...prev, score};
    });
  };

  const arrangeCards = () => {
    setState(prev => {
      let visibleCards = [...prev.visibleCards];
      visibleCards.sort((a, b) => a - b);
      if (prev.arranged) {
        visibleCards.reverse();
      }

      return {...prev, visibleCards, arranged: !prev.arranged};
    });
  };

  const startNewGame = () => {
    setState(prev => {
      // Setting Dick
      let cards = [];
      for (let i = 1; i < 112; i++) {
        cards.push(i);
      }
      // Shuffling Cards
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      // Displayed Cards
      let visibleCards = cards.slice(0, 8);
      // Reset Zones Values
      let dropZones = {...prev.dropZones};
      dropZones.areaOne.value = null;
      dropZones.areaTwo.value = null;
      dropZones.areaThree.value = null;
      return {
        cards,
        dropZones,
        visibleCards,
        score: 0,
        flipCount: 0,
        flipLimit: 28,
        timer: '00:00',
        settings: false,
        arranged: false,
        gameover: false,
        visibleTimer: true,
        visibleScore: true,
        prevState: {
          score: 0,
          cardPlayed: null,
          visibleCards: [],
          zoneValues: {},
        },
      };
    });
    // Start Timer :)
    startTimer();
  };

  const startTimer = () => {
    timerId = setInterval(function () {
      setState(prev => {
        let seconds = parseInt(prev.timer.split(':')[1], 10),
          minutes = parseInt(prev.timer.split(':')[0], 10);
        if (prev.cards.length === 0 || prev.gameover) {
          return false;
        }
        seconds++;
        if (seconds > 59) {
          seconds = '00';
          minutes++;
        }
        if (seconds < 10 && seconds !== '00') {
          seconds = '0' + seconds;
        }
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
        let timer = minutes + ':' + seconds;
        return {...prev, timer};
      });
    }, 1000);
  };

  const gameoverCheck = () => {
    setState(prev => {
      let visibleCards = prev.visibleCards;
      if (prev.dropZones.areaOne.value && prev.dropZones.areaTwo.value && prev.dropZones.areaThree.value) {
        let zoneOne = prev.dropZones.areaOne.value,
          zoneTwo = prev.dropZones.areaTwo.value,
          zoneThree = prev.dropZones.areaThree.value,
          availableMoves = 0;
        visibleCards.map(v => {
          if (
            (prev.dropZones.areaTwo.role && v > zoneTwo) ||
            (!prev.dropZones.areaTwo.role && v < zoneTwo) ||
            v < zoneOne ||
            v > zoneThree
          ) {
            availableMoves++;
          }
        });
        if (availableMoves === 0) {
          return {...prev, gameover: true, visibleCards: []};
        }
      }

      return prev;
    });
  };

  const redo = () => {
    setState(prev => {
      let dropZones = {...prev.dropZones};
      let flipCount = prev.flipCount;
      dropZones[prev.prevState.zoneChanged].value = prev.prevState.lastCard;
      flipCount--;
      return {
        ...prev,
        dropZones,
        flipCount,
        cards: prev.prevState.cards,
        score: prev.prevState.score,
        visibleCards: prev.prevState.visibleCards,
      };
    });
  };

  return (
    <RadialGradient radius={width * 0.8} style={CommonStyles.container} colors={['#ddd', '#bbb']}>
      <View style={styles.container}>
        <View style={styles.statusBar}>
          <View style={{flex: 1}}>
            <Icon size={ICON_SIZE} name="file-tray-full" color="#222222cc" style={styles.textShadow} />
            <MyAppText style={[styles.barTxt, styles.textShadow]}>{state.cards?.length}</MyAppText>
          </View>
          {state.visibleScore ? (
            <View style={{flex: 1}}>
              <Icon size={ICON_SIZE} name="stats-chart" color="#222222cc" style={styles.textShadow} />
              <MyAppText style={[styles.barTxt, styles.textShadow]}>{state.score}</MyAppText>
            </View>
          ) : null}
          {state.visibleTimer ? (
            <View style={{flex: 2}}>
              <Icon size={ICON_SIZE} name="timer" color="#222222cc" style={styles.textShadow} />
              <MyAppText style={[styles.barTxt, styles.textShadow]}>{state.timer}</MyAppText>
            </View>
          ) : null}
          <TouchableOpacity activeOpacity={0.6} onPress={() => setState(prev => ({...prev, settings: !prev.settings}))}>
            <Icon size={ICON_SIZE * 1.5} name="pause" color="#222222cc" style={styles.textShadow} />
          </TouchableOpacity>
        </View>

        <View style={styles.zonesContainer}>
          <View style={{borderRadius: 15, paddingBottom: 6, backgroundColor: '#44444466'}}>
            <View onLayout={e => setDropZoneValues(e, 'areaOne')} style={styles.zoneStyle}>
              <Icon size={ICON_SIZE} name={'caret-down'} color={Buttons.pink.backgroundColor} />
              <View style={styles.zoneCard}>
                {state.dropZones.areaOne.value ? (
                  <MyAppText style={styles.zoneCardTxt}>{state.dropZones.areaOne.value}</MyAppText>
                ) : null}
              </View>
            </View>
          </View>
          <View style={{borderRadius: 15, paddingBottom: 6, backgroundColor: '#44444466'}}>
            <View onLayout={e => setDropZoneValues(e, 'areaTwo')} style={styles.zoneStyle}>
              {state.dropZones.areaTwo.role ? (
                <Icon size={ICON_SIZE} name={'caret-up'} color={Buttons.green.backgroundColor} />
              ) : (
                <Icon size={ICON_SIZE} name={'caret-down'} color={Buttons.pink.backgroundColor} />
              )}
              <View style={styles.zoneCard}>
                {state.dropZones.areaTwo.value ? (
                  <MyAppText style={styles.zoneCardTxt}>{state.dropZones.areaTwo.value}</MyAppText>
                ) : null}
              </View>
            </View>
          </View>
          <View style={{borderRadius: 15, paddingBottom: 6, backgroundColor: '#44444466'}}>
            <View onLayout={e => setDropZoneValues(e, 'areaThree')} style={styles.zoneStyle}>
              <Icon size={ICON_SIZE} name={'caret-up'} color={Buttons.green.backgroundColor} />
              <View style={styles.zoneCard}>
                {state.dropZones.areaThree.value ? (
                  <MyAppText style={styles.zoneCardTxt}>{state.dropZones.areaThree.value}</MyAppText>
                ) : null}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.cardsContainer}>
          {state.cards?.length === 0 || state.gameover ? (
            <View style={styles.gameendWrapper}>
              <MyAppText style={styles.wrapperTitle}>
                {state.cards?.length === 0 ? 'You Win !' : 'Game Over !'}
              </MyAppText>
              <View style={{flexDirection: 'row'}}>
                <TouchableNativeFeedback onPress={startNewGame}>
                  <View style={[styles.wrapperBtn, {marginRight: 20}]}>
                    <Icon size={width * 0.07} name={'ios-refresh-outline'} color={'#fff'} />
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => BackHandler.exitApp()}>
                  <View style={styles.wrapperBtn}>
                    <Icon size={width * 0.07} name={'ios-exit-outline'} color={'#fff'} />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          ) : (
            state.visibleCards?.map(number => (
              <View key={number} style={styles.cardHolder}>
                <DraggableCard key={number} number={number} dropZones={state.dropZones} updateValue={updateValue} />
              </View>
            ))
          )}
        </View>
      </View>

      <Modal
        animationType="fade"
        visible={state.settings}
        onRequestClose={() => setState(prev => ({...prev, settings: !prev.settings}))}>
        <RadialGradient radius={width * 0.8} style={CommonStyles.container} colors={['#ddd', '#bbb']}>
          <View style={styles.titleWrapper}>
            <LinearGradient
              style={{paddingTop: 2, paddingBottom: 4}}
              colors={[Buttons.primary.borderTopColor, Buttons.primary.borderBottomColor]}>
              <View style={{backgroundColor: Buttons.primary.backgroundColor}}>
                <Image
                  source={pausedImage}
                  resizeMode="contain"
                  style={{width: '100%', height: 36, marginVertical: 5}}
                />
              </View>
            </LinearGradient>
          </View>
          <View style={{width: '60%', borderRadius: 30, paddingBottom: 8, backgroundColor: '#44444488'}}>
            <View style={styles.btnsWrapper}>
              <View
                style={{height: 6, position: 'absolute', left: 0, right: 0, top: 0, backgroundColor: '#313f4bee'}}
              />
              <MyAppButton
                text="Continue"
                theme={Buttons.yellow}
                onPress={() => setState(prev => ({...prev, settings: !prev.settings}))}
              />
              <MyAppButton text="Start over" theme={Buttons.green} />
              <MyAppButton text="Exit" onPress={() => navigation.goBack()} theme={Buttons.pink} />
            </View>
          </View>
        </RadialGradient>
      </Modal>
    </RadialGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    padding: 25,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barTxt: {
    marginTop: 5,
    color: '#222222cc',
    fontFamily: Fonts.bold,
    fontSize: height * 0.025,
    lineHeight: height * 0.025,
  },
  textShadow: {
    textShadowRadius: 1,
    textShadowColor: '#fff',
    textShadowOffset: {width: 0.5, height: 0.5},
  },
  zonesContainer: {
    height: height * 0.3,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    borderBottomColor: '#bbb',
    borderBottomWidth: 0.5,
  },
  zoneStyle: {
    borderWidth: 2,
    borderRadius: 15,
    paddingBottom: 8,
    width: width * 0.27,
    paddingHorizontal: 8,
    height: height * 0.27,
    maxHeight: width * 0.37,
    backgroundColor: '#3e5167',
    justifyContent: 'space-between',
  },
  zoneCard: {
    flex: 1,
    padding: 4,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  zoneCardTxt: {
    width: '100%',
    height: '100%',
    backgroundColor: '#341f97',
    borderRadius: 5,
    paddingLeft: 10,
    paddingTop: 5,
    color: '#fff',
    fontFamily: Fonts.extra_bold,
    fontSize: width * 0.06,
  },
  cardsContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: '5%',
  },
  cardHolder: {
    width: '20%',
    height: height * 0.2,
    maxHeight: width * 0.26,
    marginRight: '5%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    width: '65%',
    borderWidth: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  btnsWrapper: {
    paddingTop: 25,
    paddingBottom: 15,
    borderEndWidth: 4,
    borderStartWidth: 4,
    borderBottomWidth: 4,
    paddingHorizontal: 25,
    backgroundColor: '#3e5167',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  gameendWrapper: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperTitle: {
    fontFamily: Fonts.extra_bold,
    fontSize: width * 0.1,
    color: '#F73859',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    marginBottom: 40,
    textAlign: 'center',
    elevation: 2,
  },
  wrapperBtn: {
    width: width * 0.3,
    backgroundColor: '#283149',
    alignItems: 'center',
    paddingVertical: 10,
    elevation: 2,
  },
});

export default Game;
