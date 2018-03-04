'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumTracks = exports.getAlbums = exports.getAlbum = undefined;

var _config = require('./config');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global fetch */

var getAlbum = exports.getAlbum = function getAlbum(id) {
  fetch(_config.API_URL + '/albums/' + id).then(_utils2.default);
};

var getAlbums = exports.getAlbums = function getAlbums(ids) {
  fetch(_config.API_URL + '/albums/?ids=' + ids).then(_utils2.default);
};

var getAlbumTracks = exports.getAlbumTracks = function getAlbumTracks(id) {
  fetch(_config.API_URL + '/albums/' + id + '/tracks').then(_utils2.default);
};