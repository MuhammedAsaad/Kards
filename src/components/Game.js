import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableNativeFeedback, BackHandler, Dimensions } from "react-native";
// Fonts
import { Fonts } from '../../assets/Fonts';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
// Components
import DraggableCard from './DraggableCard';

const { width, height } = Dimensions.get('window')

class Game extends Component {
  constructor(props) {
    super(props);
    // Binding
    this.setDropZoneValues = this.setDropZoneValues.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.removeDropped = this.removeDropped.bind(this);
    this.addingTwoCards = this.addingTwoCards.bind(this);
    this.switchZone = this.switchZone.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.arrangeCards = this.arrangeCards.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.gameoverCheck = this.gameoverCheck.bind(this);
    this.redo = this.redo.bind(this);
    // Setting Dick
    var cards = [];
    for (var i = 1; i < 112; i++) {
      cards.push(i);
    }
    // Shuffling Cards
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    // Displayed Cards
    var visibleCards = cards.slice(0, 8);
    // Game State and Info
    this.state = {
      dropZones: {
        areaOne: {
          coordinate: null,
          value: null,
          role: false
        },
        areaTwo: {
          coordinate: null,
          value: null,
          role: false
        },
        areaThree: {
          coordinate: null,
          value: null,
          role: true
        }
      },
      cards,
      visibleCards,
      arranged: false,
      timer: '00:00',
      score: 0,
      settings: false,
      visibleTimer: true,
      visibleScore: true,
      flipCount: 0,
      flipLimit: 27,
      gameover: false,
      prevState: {
        score: 0,
        cardPlayed: null,
        visibleCards: [],
        zoneValues: {}
      }
    }
  }
  componentDidMount() {
    // Timer
    let that = this;
    this.timer = setInterval(function(){
      var seconds = parseInt(that.state.timer.split(':')[1]),
          minutes = parseInt(that.state.timer.split(':')[0]);
      if (that.state.cards.length === 0 || that.state.gameover) return false;
      seconds++;
      if (seconds > 59) {
        seconds = '00';
        minutes++
      };
      if (seconds < 10 && seconds !== '00') seconds = '0' + seconds;
      if (minutes < 10) minutes = '0' + minutes;
      var timer = minutes + ':' + seconds;
      that.setState({ timer })
    }, 1000);
  }
  componentWillUnmount() {
    // Remove Timer on unmounting >> inhance performance
    this.timer && clearInterval(this.timer);
    this.timer = false;
  }
  setDropZoneValues(event, name){
    var dropZones = {...this.state.dropZones};
    dropZones[name].coordinate = event.nativeEvent.layout;
    this.setState({ dropZones });
  }
  updateValue(zone, value) { 
    var dropZones = {...this.state.dropZones},
        prevState = {};
    prevState.lastCard = this.state.dropZones[zone].value;
    prevState.score = this.state.score;
    prevState.visibleCards = this.state.visibleCards;
    prevState.cards = this.state.cards;
    prevState.zoneChanged = zone;
    dropZones[zone].value = value;
    this.setState({ dropZones, prevState });
    this.removeDropped(value);
  }
  removeDropped(num) {
    var visibleCards = [...this.state.visibleCards],
        droppedCardIndex = visibleCards.indexOf(num),
        cards = [...this.state.cards],
        droppedCardsIndex = cards.indexOf(num);

    visibleCards.splice(droppedCardIndex, 1);
    cards.splice(droppedCardsIndex, 1);
    this.setState({ 
      visibleCards,
      cards
    }, async () => {
      await this.addingTwoCards();
      this.switchZone();
      this.updateScore();
      this.gameoverCheck();
    })
  }
  addingTwoCards() {
    var visibleCards = [...this.state.visibleCards];
    if (visibleCards.length === 6) { 
      var cards = [...this.state.cards],
          newCards = cards.slice(6, 8);
      this.setState({ visibleCards: visibleCards.concat(newCards) })
    };
  }
  switchZone() {
    var dropZones = {...this.state.dropZones},
        flipLimit = this.state.flipLimit,
        flipCount = this.state.flipCount;
    if (flipCount === flipLimit) {
      dropZones.areaTwo.role = !this.state.dropZones.areaTwo.role;
      this.setState({ dropZones, flipCount: 0 })
    } else {
      flipCount++;
      this.setState({ flipCount })
    }
  }
  updateScore() {
    var playedCards = 111 - this.state.cards.length,
        timeElapsed = this.state.timer,
        splitting = timeElapsed.split(':'),
        sec = parseInt(splitting[1]),
        min = parseInt(splitting[0]) * 60,
        score = parseInt((playedCards * 1000 / (min + sec)) + this.state.score);
    this.setState({ score })
  }
  arrangeCards() {
    var visibleCards = [...this.state.visibleCards];
    visibleCards.sort((a,b) => a - b);
    if (this.state.arranged) {
      visibleCards.reverse();
      this.setState({ 
        visibleCards,
        arranged: !this.state.arranged
      })
    }
    this.setState({ 
      visibleCards,
      arranged: !this.state.arranged
    })
  }
  startNewGame() {
    // Setting Dick
    var cards = [];
    for (var i = 1; i < 112; i++) {
      cards.push(i);
    }
    // Shuffling Cards
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    // Displayed Cards
    var visibleCards = cards.slice(0, 8);
    // Reset Zones Values
    var dropZones = {...this.state.dropZones};
    dropZones.areaOne.value = null;
    dropZones.areaTwo.value = null;
    dropZones.areaThree.value = null;
    // Reset Timer
    var timer = '00:00';
    this.setState({ cards, visibleCards, dropZones, timer, score: 0, flipCount: 0, gameover: false })
  }
  gameoverCheck() {
    var visibleCards = this.state.visibleCards;
    if (this.state.dropZones.areaOne.value && this.state.dropZones.areaTwo.value && this.state.dropZones.areaThree.value) {
      var zoneOne = this.state.dropZones.areaOne.value,
          zoneTwo = this.state.dropZones.areaTwo.value,
          zoneThree = this.state.dropZones.areaThree.value,
          availableMoves = 0;
      visibleCards.map((v) => {
        if ((this.state.dropZones.areaTwo.role && v > zoneTwo) || (!this.state.dropZones.areaTwo.role && v < zoneTwo) || v < zoneOne || v > zoneThree) {
          availableMoves++;
        }
      })
      if (availableMoves === 0) this.setState({ gameover: true, visibleCards: [] })
    }
  }
  redo() {
    var dropZones = {...this.state.dropZones},
        flipCount = this.state.flipCount;
    dropZones[this.state.prevState.zoneChanged].value = this.state.prevState.lastCard;
    flipCount--;
    this.setState({
      cards: this.state.prevState.cards,
      score: this.state.prevState.score,
      visibleCards: this.state.prevState.visibleCards,
      dropZones,
      flipCount
    })
  }
  render() {
    return (
      <View style={styles.container} >
        <View style={styles.statusBar} >
          <View style={styles.barItem} >
            <Text style={styles.barIcon} >Cards left</Text>
            <Text style={styles.barTxt} >{this.state.cards.length}</Text>
          </View>
          { this.state.visibleTimer ? 
            <View style={styles.barItem} >
              <Icon size={height * .035} name={'ios-clock-outline'} color={'#fff'} />
              <Text style={styles.barTxt} >{this.state.timer}</Text>
            </View>
            :
            null
          }
          { this.state.visibleScore ?
            <View style={styles.barItem} >
              <Text style={styles.barIcon} >Score</Text>
              <Text style={styles.barTxt} >{this.state.score}</Text>
            </View>
            :
            null
          }
        </View>

        { this.state.settings ? 
          <View style={styles.settingBar} >
            <TouchableNativeFeedback onPress={() => this.setState({ settings: !this.state.settings })} >
              <View style={styles.settingBtn} >
                <Icon size={height * .03} name={'ios-arrow-back-outline'} color={'#fff'} />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.setState({ visibleTimer: !this.state.visibleTimer })} >
              <View style={styles.settingBtn} >
                <Icon size={height * .03} name={'ios-clock-outline'} color={this.state.visibleTimer ? '#fff' : '#ccc'} />
                { !this.state.visibleTimer ? 
                  <View style={styles.settingSlash} ></View>
                  :
                  null
                }
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.setState({ visibleScore: !this.state.visibleScore })} >
              <View style={styles.settingBtn} >
                <Icon size={height * .03} name={'ios-clipboard-outline'} color={this.state.visibleScore ? '#fff' : '#ccc'} />
                { !this.state.visibleScore ? 
                  <View style={styles.settingSlash} ></View>
                  :
                  null
                }
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => this.props.switchMenu()} >
              <View style={styles.settingBtn} >
                <Icon size={height * .03} name={'ios-exit-outline'} color={'#fff'} />
              </View>
            </TouchableNativeFeedback>
          </View>
          :
          <View style={styles.settingBar} >
            <TouchableNativeFeedback
              onPress={() => this.setState({ settings: !this.state.settings })}
            >
              <View style={styles.settingBtn} >
                <Icon size={height * .03} name={'ios-settings-outline'} color={'#fff'} />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              disabled={(this.state.visibleCards.length === 7) ? false : true}
              onPress={() => this.redo()}
            >
              <View style={styles.settingBtn} >
                { (this.state.visibleCards.length === 7) ?
                    <Icon size={height * .03} name={'ios-refresh-outline'} color={'#fff'} />
                    :
                    null
                }
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={this.arrangeCards} >
              <View style={styles.settingBtn} >
                <Icon size={height * .03} name={'ios-shuffle-outline'} color={'#fff'} />
              </View>
            </TouchableNativeFeedback>
          </View>
        }

        <View style={styles.zonesContainer} >
          <View onLayout={(e) => this.setDropZoneValues(e, 'areaOne')} style={styles.zoneStyle} >
            <Icon size={width * .08} name={'md-arrow-dropdown'} color={'#F73859'} />
            <View style={styles.zoneCard} >
              { this.state.dropZones.areaOne.value ? <Text style={styles.zoneCardTxt} >{this.state.dropZones.areaOne.value}</Text> : null }
            </View>
          </View>
          <View onLayout={(e) => this.setDropZoneValues(e, 'areaTwo')} style={styles.zoneStyle} >
            { this.state.dropZones.areaTwo.role ?
              <Icon size={width * .08} name={'md-arrow-dropup'} color={'#27ae60'} />
              :
              <Icon size={width * .08} name={'md-arrow-dropdown'} color={'#F73859'} />
            }
            <View style={styles.zoneCard} >
              { this.state.dropZones.areaTwo.value ? <Text style={styles.zoneCardTxt} >{this.state.dropZones.areaTwo.value}</Text> : null }
            </View>
          </View>
          <View onLayout={(e) => this.setDropZoneValues(e, 'areaThree')} style={styles.zoneStyle} >
            <Icon size={width * .08} name={'md-arrow-dropup'} color={'#27ae60'} />
            <View style={styles.zoneCard} >
              { this.state.dropZones.areaThree.value ? <Text style={styles.zoneCardTxt} >{this.state.dropZones.areaThree.value}</Text> : null }
            </View>
          </View>
        </View>

        <View style={styles.cardsContainer} >
          
          { (this.state.cards.length !== 0) ?
            !this.state.gameover ? 
              this.state.visibleCards.map((number) => {
                return (
                  <View key={number} style={styles.cardHolder} >
                    <DraggableCard
                      key={number}
                      number={number}
                      dropZones={this.state.dropZones}
                      updateValue={this.updateValue}
                    />
                  </View>
                )
              })
              :
              <View style={styles.gameendWrapper} >
                <Text style={styles.wrapperTitle} >Game Over !</Text>
                <View style={{flexDirection: 'row'}} >
                  <TouchableNativeFeedback onPress={this.startNewGame} >
                    <View style={[styles.wrapperBtn, {marginRight: 20}]} >
                      <Icon size={width * .07} name={'ios-refresh-outline'} color={'#fff'} />
                    </View>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback onPress={() => BackHandler.exitApp()} >
                    <View style={styles.wrapperBtn} >
                      <Icon size={width * .07} name={'ios-exit-outline'} color={'#fff'} />
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            :
            <View style={styles.gameendWrapper} >
              <Text style={styles.wrapperTitle} >You Win !</Text>
              <View style={{flexDirection: 'row'}} >
                <TouchableNativeFeedback onPress={this.startNewGame} >
                  <View style={[styles.wrapperBtn, {marginRight: 20}]} >
                    <Icon size={width * .07} name={'ios-refresh-outline'} color={'#fff'} />
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => BackHandler.exitApp()} >
                  <View style={styles.wrapperBtn} >
                    <Icon size={width * .07} name={'ios-exit-outline'} color={'#fff'} />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          }

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#404B69'
  },
  statusBar: {
    width: '100%', 
    height: height * .1,
    backgroundColor: '#283149', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  barItem: {
    flex: 1, 
    alignItems: 'center'
  },
  barIcon: {
    color: '#fff',
    fontFamily: Fonts.Montserrat,
    fontSize: height * .025
  },
  barTxt: {
    color: '#F73859', 
    fontFamily: Fonts.Montserrat, 
    fontSize: height * .025, 
    marginTop: 2, 
    letterSpacing: 2
  },
  settingBar: {
    width: '100%',
    height: height * .06,
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#255883', 
    elevation: 3
  },
  settingBtn: {
    flex: 1, 
    alignItems: 'center', 
    paddingVertical: 10
  },
  settingSlash: {
    width: 1, 
    height: height * .04, 
    backgroundColor: '#ccc', 
    position: 'absolute', 
    top: height * .01,
    transform: [{rotateZ: '40deg'}]
  },
  zonesContainer: {
    height: height * .3,
    justifyContent: 'space-between', 
    alignItems: 'center', 
    flexDirection: 'row', 
    paddingHorizontal: '5%', 
    borderBottomColor: '#283149', 
    borderBottomWidth: .5
  },
  zoneStyle: {
    width: width * .26,
    height: height * .27,
    maxHeight: width * .4,
    backgroundColor: '#DBEDF3',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
    paddingBottom: '3%', 
    elevation: 3
  },
  zoneCard: {
    backgroundColor: '#fff', 
    width: '100%',
    height: '75%',
    borderRadius: 5,
    padding: 4
  },
  zoneCardTxt: {
    width: '100%', 
    height: '100%', 
    backgroundColor: '#283149', 
    borderRadius: 5, 
    paddingLeft: 10, 
    paddingTop: 5, 
    color: '#fff', 
    fontFamily: Fonts.MontserratB,
    fontSize: width * .06
  },
  cardsContainer: {
    flex: 1, 
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    paddingLeft: '5%'
  },
  cardHolder: {
    width: '20%', 
    height: height * .2,
    maxHeight: width * .26,
    marginRight: '5%', 
    marginBottom: 15,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  gameendWrapper: {
    width: '95%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  wrapperTitle: {
    fontFamily: Fonts.MontserratB, 
    fontSize: width * .1, 
    color: '#F73859', 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 5, 
    marginBottom: 40, 
    textAlign: 'center', 
    elevation: 2
  },
  wrapperBtn: {
    width: width * .3, 
    backgroundColor: '#283149', 
    alignItems: 'center', 
    paddingVertical: 10, 
    elevation: 2
  }
});

export default Game;