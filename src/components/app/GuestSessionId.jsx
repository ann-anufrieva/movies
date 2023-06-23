const GuestSessionId = async () => {
  const url =
    'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=c5d3833847b4ee2c79d1cb0fa1465e7b';
  const response = await fetch(url);
  const responseJson = response
    .json()
    .then((data) => {
      const session = {
        Id: data.guest_session_id,
        expires: data.expires_at,
      };
      return session;
    })
    .then((res) => {
      localStorage.id = res.Id;
      localStorage.expires = res.expires;
      return res;
    });
  const result = await responseJson;
  return result;
};

export default GuestSessionId;