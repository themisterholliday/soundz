const { Howl, Howler, stop } = require("howler");

const Sounds = {
  bwa_bwu_bwu_bwuu: "bwa-bwu-bwu-bwuu.m4a",
  bwaaaAAA: "bwaaaAAA.m4a",
  chioo: "chioo.m4a",
  ding_2: "ding-2.m4a",
  hmm: "hmm.m4a",
  hoooOOO: "hoooOOO.m4a",
  loading: "loading.m4a",
  pop: "pop.m4a",
  shioo: "shioo.m4a",
  vine_boom: "vine-boom.mp3",
  whistle_up: "whistle-up.m4a",
  whooisht: "whooisht.m4a",
  whooit: "whooit.m4a",
};

/**
 * @typedef {Object} SoundzInstance
 * @property {Record<string, string>} available_sounds - A map of sound names to their file paths.
 * @property {function(string): void} play_sound - A function to play a sound by its name.
 */

/**
 * Singleton object for managing sounds.
 * @type {{get_instance: function(): SoundzInstance}}
 */
const Singleton = (function () {
  let instance;

  /**
   * Creates a new SoundzInstance.
   * @returns {SoundzInstance} The SoundzInstance object.
   */
  function create_instance() {
    return {
      available_sounds: Sounds,
      /**
       * Play a sound by its name.
       * @param {string} soundName - The name of the sound to play.
       * @returns {void}
       */
      play_sound: (soundName) => {
        Howler.stop();

        const sound_file = Sounds[soundName];
        if (sound_file === undefined) {
          return;
        }

        const sound = new Howl({
          src: [sound_file],
        });
        sound.play();
      },
    };
  }

  return {
    /**
     * Gets an instance of the SoundzInstance.
     * @returns {SoundzInstance} The SoundzInstance object.
     */
    get_instance: () => {
      if (!instance) {
        instance = create_instance();
        // Attach to the window object
        window.soundz = instance;
      }
      return instance;
    },
  };
})();

const _ = Singleton.get_instance();
