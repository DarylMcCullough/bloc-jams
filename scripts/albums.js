var updatePlayerBarSong = function() {
    var currentArtist = currentAlbum.artist;
    var currentSongTitle = currentSongFromAlbum.title;
    var titleArtist = currentSongTitle + " - " + currentArtist;
    $(".currently-playing .song-name").html(currentSongTitle);
    $(".currently-playing .artist-name").html(currentArtist);
    $(".currently-playing .artist-song-mobile").html(titleArtist);
    $(".currently-playing .artist-name").html(currentArtist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var getSongNumber = function(songItem) {
    var txt = songItem.attr("data-song-number");
    return parseInt(txt);
}

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
        if (currentlyPlayingSongNumber !== songNum) {
            if (currentlyPlayingSongNumber !== null) {
                var currentlyPlayingSongElement = $('[data-song-number="' + currentlyPlayingSongNumber + '"]');
                currentlyPlayingSongElement.html(getSongNumber(currentlyPlayingSongElement));
            }
            songItem.html(pauseButtonTemplate);
            currentlyPlayingSongNumber = songNum;
            currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber - 1];
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNum) {
            songItem.html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;            
        }
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
    if (currentlyPlayingSongNumber !== null) {
        var currentlyPlayingSongElement = $('[data-song-number="' + currentlyPlayingSongNumber + '"]');
        currentlyPlayingSongElement.html(getSongNumber(currentlyPlayingSongElement));
    }
    currentlyPlayingSongNumber = index + 1;
    var songItem = $('[data-song-number="' + currentlyPlayingSongNumber + '"]');
    songItem.html(pauseButtonTemplate);
    currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber - 1];
    updatePlayerBarSong();
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
        index--;
        if (index < 0) {
            index = numSongs - 1;
        }
    }
    if (currentlyPlayingSongNumber !== null) {
        var currentlyPlayingSongElement = $('[data-song-number="' + currentlyPlayingSongNumber + '"]');
        currentlyPlayingSongElement.html(getSongNumber(currentlyPlayingSongElement));
    }
    currentlyPlayingSongNumber = index + 1;
    var songItem = $('[data-song-number="' + currentlyPlayingSongNumber + '"]');
    songItem.html(pauseButtonTemplate);
    currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber - 1];
    updatePlayerBarSong();
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});