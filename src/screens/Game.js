import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableNativeFeedback, BackHandler, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Fonts} from '../constants';
// Components
import MyAppText from '../components/MyAppText';
import SettingButton from '../components/SettingButton';
import DraggableCard from '../components/DraggableCard';

const {width, height} = Dimensions.get('window');

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
    startNewGame();
    return () => clearInterval(timerId);
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
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <View style={styles.barItem}>
          <MyAppText style={styles.barIcon}>Cards left</MyAppText>
          <MyAppText style={styles.barTxt}>{state.cards?.length}</MyAppText>
        </View>
        {state.visibleTimer ? (
          <View style={styles.barItem}>
            <Icon size={height * 0.035} name="md-time-outline" color="#fff" />
            <MyAppText style={styles.barTxt}>{state.timer}</MyAppText>
          </View>
        ) : null}
        {state.visibleScore ? (
          <View style={styles.barItem}>
            <MyAppText style={styles.barIcon}>Score</MyAppText>
            <MyAppText style={styles.barTxt}>{state.score}</MyAppText>
          </View>
        ) : null}
      </View>

      {state.settings ? (
        <View style={styles.settingBar}>
          <SettingButton
            icon="ios-arrow-back-outline"
            onPress={() => setState(prev => ({...prev, settings: !prev.settings}))}
          />
          {/* handle !state.visibleTimer icon UI */}
          <SettingButton
            icon="md-time-outline"
            onPress={() => setState(prev => ({...prev, visibleTimer: !prev.visibleTimer}))}
          />
          {/* handle !state.visibleScore icon UI */}
          <SettingButton
            icon="ios-clipboard-outline"
            onPress={() => setState(prev => ({...prev, visibleScore: !prev.visibleScore}))}
          />
          <SettingButton icon="ios-exit-outline" onPress={() => navigation.goBack()} />
        </View>
      ) : (
        <View style={styles.settingBar}>
          <SettingButton
            icon="ios-settings-outline"
            onPress={() => setState(prev => ({...prev, settings: !prev.settings}))}
          />
          {/* active only when state.visibleCards.length === 7 */}
          <SettingButton icon="ios-refresh-outline" onPress={redo} />
          <SettingButton icon="ios-shuffle-outline" onPress={arrangeCards} />
        </View>
      )}

      <View style={styles.zonesContainer}>
        <View onLayout={e => setDropZoneValues(e, 'areaOne')} style={styles.zoneStyle}>
          <Icon size={width * 0.08} name={'md-arrow-down'} color={'#F73859'} />
          <View style={styles.zoneCard}>
            {state.dropZones.areaOne.value ? (
              <MyAppText style={styles.zoneCardTxt}>{state.dropZones.areaOne.value}</MyAppText>
            ) : null}
          </View>
        </View>
        <View onLayout={e => setDropZoneValues(e, 'areaTwo')} style={styles.zoneStyle}>
          {state.dropZones.areaTwo.role ? (
            <Icon size={width * 0.08} name={'md-arrow-up'} color={'#27ae60'} />
          ) : (
            <Icon size={width * 0.08} name={'md-arrow-down'} color={'#F73859'} />
          )}
          <View style={styles.zoneCard}>
            {state.dropZones.areaTwo.value ? (
              <MyAppText style={styles.zoneCardTxt}>{state.dropZones.areaTwo.value}</MyAppText>
            ) : null}
          </View>
        </View>
        <View onLayout={e => setDropZoneValues(e, 'areaThree')} style={styles.zoneStyle}>
          <Icon size={width * 0.08} name={'md-arrow-up'} color={'#27ae60'} />
          <View style={styles.zoneCard}>
            {state.dropZones.areaThree.value ? (
              <MyAppText style={styles.zoneCardTxt}>{state.dropZones.areaThree.value}</MyAppText>
            ) : null}
          </View>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        {state.cards?.length === 0 || state.gameover ? (
          <View style={styles.gameendWrapper}>
            <MyAppText style={styles.wrapperTitle}>{state.cards?.length === 0 ? 'You Win !' : 'Game Over !'}</MyAppText>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    width: '100%',
    height: height * 0.1,
    backgroundColor: '#5f27cd',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barItem: {
    flex: 1,
    alignItems: 'center',
  },
  barIcon: {
    color: '#fff',
    fontSize: height * 0.025,
  },
  barTxt: {
    color: '#F73859',
    fontSize: height * 0.025,
    marginTop: 2,
    letterSpacing: 2,
  },
  settingBar: {
    width: '100%',
    height: height * 0.06,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#341f97',
    elevation: 3,
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
    width: width * 0.26,
    height: height * 0.27,
    maxHeight: width * 0.4,
    backgroundColor: '#5f27cd',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
    paddingBottom: '3%',
    elevation: 3,
  },
  zoneCard: {
    backgroundColor: '#fff',
    width: '100%',
    height: '75%',
    borderRadius: 5,
    padding: 4,
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
