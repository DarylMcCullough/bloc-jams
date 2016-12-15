 // Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 var sergeantPepper = {
     title: "Sergeant Pepper's Lonely Hearts Club Band",
     artist: 'The Beatles',
     label: 'Apple Records',
     year: '1969',
     albumArtUrl: 'assets/images/album_covers/sergeant-pepper.jpg',
     songs: [
         { title: "Sergeant Pepper's Lonely Hearts Club Band", duration: '1:01' },
         { title: 'With a Little Help from My Friends', duration: '5:01' },
         { title: 'Lucy in the Sky with Diamonds', duration: '3:21'},
         { title: 'Getting Better All the Time', duration: '3:14' },
         { title: 'For the Benefit of Mr. Kite', duration: '2:15'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

 var setCurrentAlbum = function(album) {
     // #1
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
     // #2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // #3
     albumSongList.innerHTML = '';
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };

var currentAlbum = 0;

var allAlbums = [albumPicasso, albumMarconi, sergeantPepper];

function switchAlbums() {
    currentAlbum++;
    if (currentAlbum == allAlbums.length) {
        currentAlbum = 0;
    }
    setCurrentAlbum(allAlbums[currentAlbum]);
}

window.onload = function() {
    setCurrentAlbum(sergeantPepper);
    currentAlbum = 2;
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    albumImage.addEventListener("click", switchAlbums);
 };