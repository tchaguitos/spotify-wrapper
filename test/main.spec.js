import { use, expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import dirtyChai from 'dirty-chai';

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main';

use(dirtyChai);
use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  describe('smoke tests', () => {
    it('should be exist the search method', () => {
      expect(search).to.exist();
    });

    it('should be exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist();
    });

    it('should be exist the searchArtists method', () => {
      expect(searchArtists).to.exist();
    });

    it('should be exist the searchTracks method', () => {
      expect(searchTracks).to.exist();
    });

    it('should be exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist();
    });
  });

  describe('Generic search', () => {
    let fetchStub;
    let promise;

    beforeEach(() => {
      fetchStub = sinon.stub(global, 'fetch');
      promise = fetchStub.returnsPromise();
    });

    afterEach(() => fetchStub.restore());

    it('should call fetch method', () => {
      const artists = search();
      expect(fetchStub).to.have.been.calledOnce();
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        expect(fetchStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search/q=Incubus&type=artist');

        const albums = search('Incubus', 'album');
        expect(fetchStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search/q=Incubus&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search/q=Incubus&type=artist,album');
      });
    });

    it('should return the JSON data from the Promise', () => {
      promise.resolves({ body: 'json' });

      const artists = search('Incubus', 'artist');
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });
});
