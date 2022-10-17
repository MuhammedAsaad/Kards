import React, {useRef, useEffect, useState} from 'react';
import {View, Modal, Image, Dimensions, StyleSheet, BackHandler, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RadialGradient from 'react-native-radial-gradient';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts, Buttons, CommonStyles} from '../constants';
import pausedImage from '../assets/paused.png';
// Components
import MyAppText from '../components/MyAppText';
import MyAppButton from '../components/MyAppButton';
import Gameover from '../components/Gameover';
import DraggableCard from '../components/DraggableCard';
import Zone from '../components/Zone';

const {width, height} = Dimensions.get('window');
const ICON_SIZE = height * 0.025;

const Game = ({navigation}) => {
  const timerId = useRef(null);
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
      setState(prev => {
        if (prev.settings) {
          startTimer();
          return {...prev, settings: !prev.settings};
        } else {
          clearInterval(timerId.current);
          timerId.current = undefined;
          return {...prev, settings: !prev.settings};
        }
      });
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

  const continueGame = () => {
    startTimer();
    setState(prev => ({...prev, settings: !prev.settings}));
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
        flipLimit: 11,
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
    timerId.current = setInterval(function () {
      setState(prev => {
        let seconds = parseInt(prev.timer.split(':')[1], 10),
          minutes = parseInt(prev.timer.split(':')[0], 10);
        if (prev.cards.length === 0 || prev.gameover) {
          return prev;
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
          clearInterval(timerId.current);
          timerId.current = undefined;
          return {...prev, gameover: true};
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
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              clearInterval(timerId.current);
              timerId.current = undefined;
              setState(prev => ({...prev, settings: !prev.settings}));
            }}>
            <Icon size={ICON_SIZE * 1.5} name="pause" color="#222222cc" style={styles.textShadow} />
          </TouchableOpacity>
        </View>

        <View style={styles.zonesContainer}>
          <Zone icon="down" value={state.dropZones.areaOne.value} onLayout={e => setDropZoneValues(e, 'areaOne')} />
          <Zone
            value={state.dropZones.areaTwo.value}
            onLayout={e => setDropZoneValues(e, 'areaTwo')}
            icon={state.dropZones.areaTwo.role ? 'up' : 'down'}
          />
          <Zone icon="up" value={state.dropZones.areaThree.value} onLayout={e => setDropZoneValues(e, 'areaThree')} />
        </View>

        <View style={styles.optionsWrapper}>
          <MyAppButton theme={Buttons.yellow} icon="reload" onPress={redo} />
          <MyAppButton theme={Buttons.green} icon="shuffle" onPress={arrangeCards} />
        </View>

        <View style={styles.cardsContainer}>
          {state.visibleCards?.map(number => (
            <View key={number} style={styles.cardHolder}>
              <DraggableCard key={number} number={number} dropZones={state.dropZones} updateValue={updateValue} />
            </View>
          ))}
        </View>
      </View>

      <Gameover onRequestClose={startNewGame} visible={state.cards?.length === 0 || state.gameover} />

      <Modal animationType="fade" visible={state.settings} onRequestClose={continueGame}>
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
              <MyAppButton text="Continue" theme={Buttons.yellow} onPress={continueGame} />
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <MyAppButton
                  icon="stats-chart"
                  theme={Buttons.white}
                  onPress={() => setState(prev => ({...prev, visibleScore: !prev.visibleScore}))}
                />
                <MyAppButton
                  icon="timer"
                  theme={Buttons.white}
                  onPress={() => setState(prev => ({...prev, visibleTimer: !prev.visibleTimer}))}
                />
              </View>
              <MyAppButton text="Start over" theme={Buttons.green} onPress={startNewGame} />
              <MyAppButton text="Back to menu" onPress={() => navigation.goBack()} theme={Buttons.pink} />
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
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
  },
  optionsWrapper: {
    paddingTop: 10,
    borderTopWidth: 2,
    flexDirection: 'row',
    borderBottomWidth: 2,
    paddingHorizontal: 25,
    borderTopColor: '#55555510',
    borderBottomColor: '#55555510',
    justifyContent: 'space-between',
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
