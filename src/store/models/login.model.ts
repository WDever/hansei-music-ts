interface userInfo {
  name: string | null | undefined;
  accessToken: string;
  keyToken: string;
}

interface Login {
  userInfo: userInfo
  autoLogin: boolean | null;
};

export { Login, userInfo };
