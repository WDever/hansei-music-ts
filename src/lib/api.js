/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const top = `https://www.hansei-melon.com:8000/api/top-100/`;
const check = `https://www.hansei-melon.com:8000/api/apply-check/`;
const playlist = `https://www.hansei-melon.com:8000/api/music-list/`;
const apply = `https://www.hansei-melon.com:8000/api/apply/`;
const postToken = `https://www.hansei-melon.com:8000/rest-auth/facebook/`;
const verify = 'https://www.hansei-melon.com:8000/api-token-verify/';

export const getTOP = () => axios.get(top);

export const postAPPLY = (title, album, artist, id, keyToken) => {
  const headers = {
    Authorization: `Token ${keyToken}`,
    'Content-Type': 'application/json',
  };
  const postbody = {
    title,
    singer: artist,
    album,
    song_id: id,
  };
  return axios.post(apply, postbody, { headers });
};

export const getCHECK = () => axios.get(check)

export const getPLAYLIST = () => axios.get(playlist);

export const getALSearch = input => {
  const search = `https://www.hansei-melon.com:8000/api/get_music_album/?q=${input}`;
  return axios.get(search);
};

export const getTSearch = input => {
  const search = `https://www.hansei-melon.com:8000/api/get_music_title/?q=${input}`;
  return axios.get(search);
};

export const getARSearch = input => {
  const search = `https://www.hansei-melon.com:8000/api/get_music_artist/?q=${input}`;
  return axios.get(search);
};

export const postAccessToken = accessToken => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const postBody = {
    access_token: accessToken,
  };

  return axios.post(postToken, postBody, { headers });
};

export const postVerify = Token => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const postBody = {
    token: Token,
  };

  return axios.post(verify, postBody, { headers });
};
