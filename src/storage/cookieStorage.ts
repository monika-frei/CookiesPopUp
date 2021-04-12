const cookieStorage = {
  getItem: (key: string) => {
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce(
        (obj: any, curr: any) => ({ ...obj, [curr[0].trim()]: curr[1] }),
        {}
      );
    return cookies[key];
  },

  setItem: (key: string, value: string) => {
    document.cookie = `${key} = ${value}`;
  },
};

export default cookieStorage;
