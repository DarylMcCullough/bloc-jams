var updatePlayerBarSong = function() {
    var currentArtist = currentAlbum.artist;
    var currentSongTitle = currentSongFromAlbum.title;
    var titleArtist = currentSongTitle + " - " + currentArtist;
    $(".currently-playing .song-name").html(currentSongTitle);
    $(".currently-playing .artist-name").html(currentArtist);
    $(".currently-playing .artist-song-mobile").html(titleArtist);
    $(".currently-playing .artist-name").html(currentArtist);
    $playPause.html(playerBarPauseButton);
};

var getSongNumberCell = function(songNumber) {
    return $('[data-song-number="' + songNumber + '"]');
}

var getSongNumber = function(songItem) {
    var txt = songItem.attr("data-song-number");
    return parseInt(txt);
}

var setSong = function(songNumber) {
    if (currentAlbum == null) {
        return; // nothing to do in this case
    }
    var numSongs = currentAlbum.songs.length;
    if (numSongs < songNumber) {
        return; // not possible
    }
    if (songNumber < 1) {
        return; // not possible
    }
        
    if (currentlyPlayingSongNumber == songNumber) {
        return; // nothing to do
    }
    
    if (currentSoundFile) {
        currentSoundFile.stop();
    }
    
    if (currentlyPlayingSongNumber !== null) {
        var currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
        currentlyPlayingSongElement.html(getSongNumber(currentlyPlayingSongElement));
    }
    currentlyPlayingSongNumber = songNumber;
    var songItem = getSongNumberCell(currentlyPlayingSongNumber);
    songItem.html(pauseButtonTemplate);
    currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber - 1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         // #2
         formats: [ 'mp3' ],
         preload: true
     });
    setVolume(currentVolume);
    updatePlayerBarSong();
    
}

 var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
    var $row = $(template);
    
     var onHover = function(event) {
        var songItem = $(this).find('.song-item-number');
        if (currentlyPlayingSongNumber !== getSongNumber(songItem)) {
            songItem.html(playButtonTemplate);
        }
     };
    
     var offHover = function(event) {
        var songItem = $(this).find('.song-item-number');;
        var songItemNumber = getSongNumber(songItem);
        if (songItemNumber !== currentlyPlayingSongNumber) {
            songItem.html(songItemNumber);
        }
     };
    
    var clickHandler = function() {
        var songItem = $(this);
        var songNum = getSongNumber(songItem);
        if (currentlyPlayingSongNumber === songNum) {
            if (! currentSoundFile.isPaused()) { // if not paused, then pause it
                songItem.html(playButtonTemplate);
                $playPause.html(playerBarPlayButton);
                currentSoundFile.pause();
                return;
            } else { // if paused, then play it
                songItem.html(pauseButtonTemplate);
                $playPause.html(playerBarPauseButton);
                currentSoundFile.play();
                return;
            }
        }
        setSong(songNum);
        currentSoundFile.play();
    };
    
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
 };

 var setCurrentAlbum = function(album) {
    currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     $albumSongList.empty();
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

var nextSong = function() {
    if (currentAlbum == null) {
        return; // nothing to do in this case
    }
    var numSongs = currentAlbum.songs.length;
    if (numSongs <= 1) {
        return; // nothing to do
    }
    var index = 0;    
    if (currentSongFromAlbum != null) {
        index = trackIndex(currentAlbum, currentSongFromAlbum);
        index++;
        if (index >= numSongs) {
            index = 0;
        }
    }
    setSong(index+1);
    currentSoundFile.play();
};

var previousSong = function() {
    if (currentAlbum == null) {
        return; // nothing to do in this case
    }
    var numSongs = currentAlbum.songs.length;
    if (numSongs <= 1) {
        return; // nothing to do
    }
    var index = 0;    
    if (currentSongFromAlbum != null) {
        index = trackIndex(currentAlbum, currentSongFromAlbum);
        if (index == 0) {
            index = numSongs - 1;
        } else {
            index--;
        }
    }
    setSong(index+1);
    currentSoundFile.play();
};

var togglePlayFromPlayerBar = function() {
    if (currentSoundFile) {
        if (currentSoundFile.isPaused()) {
            $playPause.html(playerBarPauseButton);
            var cell = getSongNumberCell(currentlyPlayingSongNumber);
            cell.html(pauseButtonTemplate);
            currentSoundFile.play();
            return;
        } else {
            $playPause.html(playerBarPlayButton);
            var cell = getSongNumberCell(currentlyPlayingSongNumber);
            cell.html(playButtonTemplate);
            currentSoundFile.pause();
            return;
        }
    }
}

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playPause = $('.main-controls .play-pause');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playPause.click(togglePlayFromPlayerBar);
});