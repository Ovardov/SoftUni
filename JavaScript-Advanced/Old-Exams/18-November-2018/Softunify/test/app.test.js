const assert = require('chai').assert;
const SoftUniFy = require('../app');

describe('Softunify', function () {
    let softunify;

    beforeEach(function () {
        softunify = new SoftUniFy();
    });

    describe('Constructor', function () {
        it('Should contain allSongs property that is initialized as an empty object', function () {
            assert.isObject(softunify.allSongs);
            assert.isEmpty(softunify.allSongs);
        });
    });

    describe('function downloadSong(artist, song, lyrics)', function () {
        it('should add artist with songs if artist is not in the object', function () {
            softunify.downloadSong('Eminem', 'Venom', 'Knock Knock Knock');

            let result = {
                "Eminem": {
                    "rate": 0,
                    "songs": ["Venom - Knock Knock Knock"],
                    "votes": 0
                }
            };

            assert.deepEqual(softunify.allSongs, result);
        });

        it('should add song if artist is in the object', function () {
            softunify.downloadSong('Eminem', 'Venom', 'Knock Knock Knock');
            softunify.downloadSong('Eminem', 'Another', 'Another Another Another');

            let result = {
                "Eminem": {
                    "rate": 0,
                    "songs": ["Venom - Knock Knock Knock", "Another - Another Another Another"],
                    "votes": 0
                }
            };

            assert.deepEqual(softunify.allSongs, result);
        });
    });

    describe('function playSong(song)', function () {
        it('should play song if we download this song', function () {
            softunify.downloadSong('Eminem', 'Venom', 'Knock Knock Knock');

            let result = 'Eminem:\nVenom - Knock Knock Knock\n';

            assert.deepEqual(softunify.playSong('Venom'), result);
        });

        it('should return message if we do not download this song', function () {
            softunify.downloadSong('Eminem', 'Venom', 'Knock Knock Knock');

            let result = `You have not downloaded a Test song yet. Use SoftUniFy's function downloadSong() to change that!`;

            assert.equal(softunify.playSong('Test'), result)
        });

        it('should return message if we have 0 songs', function () {
            let result = `You have not downloaded a Test song yet. Use SoftUniFy's function downloadSong() to change that!`;

            assert.equal(softunify.playSong('Test'), result)
        });

    });

    describe('function songsList()', function () {
        it('should return all songs', function () {
            softunify.downloadSong('Eminem', 'Venom', 'Knock Knock Knock');
            softunify.downloadSong('Eminem', 'Test', 'Test Test Test');
            softunify.downloadSong('Real Madrid', 'Win', 'Hala Madrid');

            let result = `Venom - Knock Knock Knock\nTest - Test Test Test\nWin - Hala Madrid`;

            assert.equal(softunify.songsList, result)
        });

        it('should return Your song list is empty if we do not download songs', function () {
            assert.equal(softunify.songsList, 'Your song list is empty');
        });
    });

    describe('function rateArtist', function () {
        it('should return The Eminem is not on your artist list.', function () {
            assert.equal(softunify.rateArtist('Eminem'), 'The Eminem is not on your artist list.');
        });

        it('should return The Eminem is not on your artist list if we add rate', function () {
            assert.equal(softunify.rateArtist('Eminem', 50), 'The Eminem is not on your artist list.')
        });
    });
});