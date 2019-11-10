'use strict';

const mixcloud = () => {
  const song = document.querySelector('.player-cloudcast-title');

  if (typeof song === 'undefined' || song === null || song.textContent === '') {
    songTitle = 'Paused';
  }

  return {
    song,
    wepPlayer: 'Mixcloud'
  };
};

const pandora = () => {
  const app = document.querySelector('div.App');
  let songTitle = 'Paused';

  if (app === null) {
    return {
      song: 'Paused',
      webPlayer: 'Pandora'
    };
  }

  const song = docuemnt.querySelector('.Marquee__wrapper__content');
  const artist = document.querySelector(
    '.nowPlayingTopInfo__current__artistName'
  );

  songTitle = `${artist.textContent} - ${song.textContent}`;

  if (typeof song === 'undefined' || song === null || song.textContent === '') {
    songTitle = 'Paused';
  }

  return {
    song: songTitle,
    webPlayer: 'Pandora'
  };
};

const play = () => {
  const song = document.querySelector('#currently-playing-title');
  const artist = document.querySelector('#player-artist');

  let songTitle = `${artist.textContent} - ${song.textContent}`;

  if (typeof song === 'undefined' || song === null || song.textContent === '') {
    songTitle = 'Paused';
  }

  return {
    song: songTitle,
    wepPlayer: 'Google Play'
  };
};

const spotify = () => {
  const isPlaying = document.querySelector(
    '.player-controls__buttons .spoticon-pause-16'
  );

  if (typeof isPlaying === 'undefined' || isPlaying === null) {
    return {
      song: 'Paused',
      webPlayer: 'Spotify'
    };
  }

  const song = document.querySelector(
    '.now-playing .track-info .track-info__name'
  );
  const artist = document.querySelector(
    '.now-playing .track-info .track-info__artists'
  );

  return {
    song: `${artist.textContent} - ${song.textContent}`,
    webPlayer: 'Spotify'
  };
};

const soundcloud = () => {
  return {
    song: document.title === 'Discover on SoundCloud' ? 'Paused' : document.title,
    webPlayer: 'Soundcloud'
  };
};

// Can't grab artist from tunein, it is placed together
const tunein = () => {
  const song = document.querySelector('#playerTitle');

  if (typeof song === 'undefined' || song === null || song.textContent === '') {
    return {
      song: 'Paused',
      webPlayer: 'tunein'
    };
  }

  return {
    song: song.textContent,
    webPlayer: 'tunein'
  };
};

// unfortunately there is no good way to determine an 'artist'
const youtube = () => {
  const song = document.querySelector('#container > h1');

  if (typeof song === 'undefined' || song === null || song.textContent === '') {
    return {
      song: 'Paused',
      webPlayer: 'YouTube'
    };
  }

  return {
    song: song.textContent.trim(),
    webPlayer: 'YouTube'
  };
};

const deezer = () => {
  const song = document.querySelector('a.track-link:nth-child(1)');
  const artist = document.querySelector('a.track-link:nth-child(2)');

  if (typeof song === 'undefined' || song === null || song.textContent === '') {
    return {
      song: 'Paused',
      webPlayer: 'Deezer'
    };
  }

  return {
    song: `${artist.textContent} - ${song.textContent}`,
    wepPlayer: 'Deezer'
  };
};

const plex = () => {
  let song = window.document.title.slice();
  if (song.startsWith('▶')) {
    song = song.slice(2, song.length);
  }

  if (typeof song === 'undefined' || song === null) {
    return {
      song: 'Paused',
      webPlayer: 'Plex'
    };
  }

  return {
    song,
    wepPlayer: 'Plex'
  };
};

const hypem = () => {
  const song = document.querySelector('#player-nowplaying > a:nth-child(3)');
  const artist = document.querySelector('#player-nowplaying > a:nth-child(1)');

  if (typeof song === 'undefined' || song === null || song.textContent === '') {
    return {
      song: 'Paused',
      webPlayer: 'hypem'
    };
  }

  return {
    song: `${artist.textContent} - ${song.textContent}`,
    webPlayer: 'hypem'
  };
};

const bandcamp = () => {
  const webPlayer = 'bandcamp';
  const song = document.querySelector('[itemprop="byArtist"]');
  const artist = document.querySelector('.title_link > .title');
  const isPlaying = document.querySelector('.playbutton.playing');

  if (isPlaying === null) {
    return {
      song: 'Paused',
      webPlayer
    };
  }

  return {
    song: `${artist.textContent} - ${song.textContent.trim()}`,
    webPlayer
  };
};

const youtubeMusic = () => {
  const webPlayer = 'youtubeMusic';
  const title = document.querySelector(
    'yt-formatted-string.title.style-scope.ytmusic-player-bar.complex-string'
  ).title;
  const byline = document.querySelector(
    'yt-formatted-string.byline.style-scope.ytmusic-player-bar.complex-string'
  ).title;
  const isPlaying = document.querySelector('#play-pause-button');

  if (isPlaying === null || isPlaying.title === 'Play') {
    return {
      song: 'Paused',
      webPlayer
    };
  }

  return {
    song: `${title} - ${byline}`,
    webPlayer
  };
};

const tidal = () => {
  const webPlayer = 'tidal';
  const title = document.querySelector("[data-test='footer-track-title']")
    .innerText;
  const artist = document.querySelector(
    "[data-test='grid-item-detail-text-title-artist']"
  ).innerText;
  const isPlaying = document.querySelector("[data-test='pause']");

  if (isPlaying === null) {
    return {
      song: 'Paused',
      webPlayer
    };
  }

  return {
    song: `${title} - ${artist}`,
    webPlayer
  };
};

const players = {
  mixcloud,
  pandora,
  'play.google.com': play,
  'open.spotify.com': spotify,
  soundcloud,
  tunein,
  'music.youtube.com': youtubeMusic,
  youtube,
  deezer,
  'app.plex.tv': plex,
  hypem,
  bandcamp,
  'listen.tidal.com': tidal
};

const sendToBackground = ({ song, webPlayer, isPaused }) => {
  const baseMessage = {
    song,
    webPlayer
  };
  let message = { ...baseMessage };
  if (isPaused) {
    message = { ...message, isPaused };
  }
  if (process.env.BROWSER === 'chrome') {
    chrome.runtime.sendMessage(message);
  } else if (process.env.BROWSER === 'firefox') {
    browser.runtime.sendMessage(message);
  }
};

// sets the song variable, send it to localhost and makes the
// appropriate changes to the html object(s)
const setSong = playerHandler => {
  const track = playerHandler();
  const nowPlayingBody = document.querySelector('.NowPlayingBody');

  if (track.song) {
    nowPlayingBody.textContent = track.song;
    sendToBackground(track);
  } else {
    nowPlayingBody.textContent = 'No song playing';
  }
};

const addHTML = () => {
  const container = document.createElement('div');
  container.className = 'NowPlayingContainer';
  container.innerHTML =
    '<style>.NowPlayingContainer{all:unset;text-align:left;background-color:#343434;border:2px solid #3c3c3c;border-radius:4px;color:#f5f5f5;position:fixed;bottom:50px;right:30px;width:300px;min-height:100px;z-index:10000;}.NowPlayingHeader{margin:10px;line-height:18px;font-family:arial;font-size:16px}.NowPlayingBody{margin-top:15px;margin-bottom:10px;margin-left:10px;line-height:16px;font-family:arial;font-size:14px}.NowPlayingSupported{margin-left:70px;margin-top:-20px;line-height:16px;font-family:arial;font-size:14px}.NowPlayingSupported a:link{color:#09F}.NowPlayingSupported a:visited{color: #CC0099;}.NowPlayingButton{all:unset;background-color:#008CBA;margin-left:10px;line-height:16px;font-family:arial;font-size:14px;color:#FFFFFF;padding:5px 10px;border-radius:4px;cursor:pointer;}.NowPlayingButton:hover{background-color:#00BFED}</style><div class=NowPlayingHeader>Essential Now Playing</div><button class=NowPlayingButton>Start</button><div class=NowPlayingSupported></div><div class=NowPlayingBody>No song playing.</div>';
  document.querySelector('body').append(container);
};

const checkSupport = () => {
  const playerKey = Object.keys(players).find(p => {
    return window.location.host.includes(p);
  });

  if (playerKey === null) {
    return false;
  }

  return players[playerKey];
};

const start = playerHandler => {
  setSong(playerHandler);
  const interval = setInterval(setSong, 2000, playerHandler);
  const npButton = document.querySelector('.NowPlayingButton');
  npButton.style.backgroundColor = '#F44336';
  return interval;
};

const stop = interval => {
  if (interval !== null) {
    clearInterval(interval);
    const npButton = document.querySelector('.NowPlayingButton');
    npButton.style.backgroundColor = '#008CBA';
  }
};

const init = () => {
  const npContainer = document.querySelector('.NowPlayingContainer');
  if (npContainer) {
    return;
  }
  addHTML();
  const playerHandler = checkSupport();

  const npSupported = document.querySelector('.NowPlayingSupported');
  const npButton = document.querySelector('.NowPlayingButton');
  const websiteName = window.location.host.slice().replace('www.', '');

  let interval = 0;

  if (playerHandler) {
    npSupported.textContent = `${websiteName} is supported!`;
    npSupported.style.color = 'green';

    npButton.addEventListener('click', () => {
      if (npButton.textContent === 'Start') {
        npButton.textContent = 'Stop';
        interval = start(playerHandler);
      } else if (npButton.textContent === 'Stop') {
        npButton.textContent = 'Start';
        sendToBackground({
          isPaused: true
        });
        stop(interval);
      }
    });
  } else {
    npSupported.textContent = `${websiteName} `;
    npSupported.style.color = 'red';

    const notSupportedLink = document.createElement('a');
    notSupportedLink.href = 'https://github.com/pendo324/universal-np';
    notSupportedLink.textContent = 'is not supported.';

    npSupported.append(notSupportedLink);
  }
};

init();
