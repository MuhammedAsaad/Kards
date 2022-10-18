const Sound = require('react-native-sound');

class SoundManager {
  #track;

  constructor() {
    Sound.setCategory('Playback');
    this.#track = new Sound('whoosh.wav', Sound.MAIN_BUNDLE);
  }

  play() {
    this.#track.play();
  }
}

module.exports = new SoundManager();
