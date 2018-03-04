/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

import { use, expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import dirtyChai from 'dirty-chai';

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

use(dirtyChai);
use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
  let fetchStub;
  let promise;

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
    promise = fetchStub.returnsPromise();
  });

  afterEach(() => fetchStub.restore());

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist();
      expect(getAlbum).to.be.a('function');
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist();
      expect(getAlbumTracks).to.be.a('function');
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(fetchStub).to.have.been.calledOnce();
    });

    it('should call fetch with the correct url', () => {
      const album = getAlbum('0sNOF9WDwhWunNAHPD3Baj');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj');
    });

    it.skip('should be return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('0sNOF9WDwhWunNAHPD3Baj');
      expect(album.resolved).to.eql({ album: 'name' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(fetchStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
      expect(fetchStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk');
    });

    it.skip('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name'});
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
      expect(albums.resolveValue).to.be.eql({ album: 'name'});
    });
  });

  describe('getAlbumsTracks', () => {
    it('should call fetch method', () => {
      const tracks = getAlbumTracks();
      expect(fetchStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it.skip('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name'});
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(tracks.resolveValue).to.be.eql({ album: 'name'});
    });
  });
});

