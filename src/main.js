export const search = (query, type) => {
  fetch(`https://api.spotify.com/v1/search/q=${query}&type=${type}`)
    .then(data => data.json());
};

export const searchAlbums = () => null;
export const searchArtists = () => null;
export const searchTracks = () => null;
export const searchPlaylists = () => null;
