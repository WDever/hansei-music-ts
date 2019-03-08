/* eslint-disable import/prefer-default-export */
import axios, { AxiosPromise } from 'axios';

const top: string = `https://www.hansei-melon.com:8000/api/top-100/`;
const check: string = `https://www.hansei-melon.com:8000/api/apply-check/`;
const playlist: string = `https://www.hansei-melon.com:8000/api/music-list/`;
const apply: string = `https://www.hansei-melon.com:8000/api/apply/`;
const postToken: string = `https://www.hansei-melon.com:8000/rest-auth/facebook/`;
const verify: string = 'https://www.hansei-melon.com:8000/api-token-verify/';

export const getTOP = (): AxiosPromise => axios.get(top);

export const postAPPLY = (title: string, album: string, artist: string, id: number, keyToken: string): AxiosPromise => {
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

export const getCHECK = (): AxiosPromise => axios.get(check)

export const getPLAYLIST = (): AxiosPromise => axios.get(playlist);

export const getALSearch = (input: string): AxiosPromise => {
  const search = `https://www.hansei-melon.com:8000/api/get_music_album/?q=${input}`;
  return axios.get(search);
};

export const getTSearch = (input: string): AxiosPromise => {
  const search = `https://www.hansei-melon.com:8000/api/get_music_title/?q=${input}`;
  return axios.get(search);
};

export const getARSearch = (input: string): AxiosPromise => {
  const search = `https://www.hansei-melon.com:8000/api/get_music_artist/?q=${input}`;
  return axios.get(search);
};

export const postAccessToken = (accessToken: string): AxiosPromise => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const postBody = {
    access_token: accessToken,
  };

  return axios.post(postToken, postBody, { headers });
};

export const postVerify = (Token: string): AxiosPromise => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const postBody = {
    token: Token,
  };

  return axios.post(verify, postBody, { headers });
};
