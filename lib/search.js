'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPlaylists = exports.searchTracks = exports.searchAlbums = exports.searchArtists = exports.search = undefined;

var _config = require('./config');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global fetch */

var search = exports.search = function search(query, type) {
  fetch(_config.API_URL + '/search/q=' + query + '&type=' + type).then(_utils2.default);
};

var searchArtists = exports.searchArtists = function searchArtists(query) {
  search(query, 'artist');
};

var searchAlbums = exports.searchAlbums = function searchAlbums(query) {
  search(query, 'album');
};

var searchTracks = exports.searchTracks = function searchTracks(query) {
  search(query, 'track');
};

var searchPlaylists = exports.searchPlaylists = function searchPlaylists(query) {
  search(query, 'playlist');
};