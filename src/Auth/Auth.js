import auth0 from "auth0-js";

export default class Auth {
  constructor(history) {
    // console.log(process.env.REACT_APP_CLIENT_ID);
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: "token id_token", //id_token says, give us a JWT token to authenticate the user when they login ** and token says give an ccess token so the user can make api calls
      scope: "openid profile email", //permissions, this means we want openid to authentication so the JWT will include the basic info of a jtw ; when the user signs up, for the first time they ll be presented with a content screen so they can consent to us using his data
    });
  }
  login = () => {
    this.auth0.authorize(); //method available in the auth0 web auth, when this method is called this will redirect the browser to the auth0login page
  };
  handleAuthentication = () => {
    console.log("another");
    this.auth0.parseHash((error, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult); // Create session and storage the token
        this.history.push("/"); //tell react router to redirect anew url
      } else if (error) {
        this.history.push("/");
        alert(`error: ${error.error} Check the console`);
        console.log(error);
      }
    }); //function that parse the hash from the url and it gives or a object or a error
  };
  setSession = (authResult) => {
    //set the time that the access token will expire
    const expireAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime() //this is the way to calcute the expire time in unix epoch time (number of ms since 1970)
    ); //   authResult.expiresIn =time en seconds
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", authResult.expiresIn);
  };
}
/*
http://localhost:3000/callback#
access_token=aShZ92w6tnIKqqkdJJdt17JwzsGIXytA
&
scope=openid%20profile%20email
&
expires_in=7200 expare en seconds
&
token_type=Bearer 
&
state=3s2GbryyGNQ.bEi5JJjIhfNhXq.qP2FQ encrypted secret value  used by auth0that we are the originating app
&
id_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IngxRHY3WklGWG93THRFX043TGNRUSJ9.eyJnaXZlbl9uYW1lIjoiV2lsbGlhbSIsImZhbWlseV9uYW1lIjoiQ2FsZGVyw7NuIiwibmlja25hbWUiOiJnaXVuYXVsYXdpbGxpYW0iLCJuYW1lIjoiV2lsbGlhbSBDYWxkZXLDs24iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1sRGxrTXFTUFRsby9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQUtXSkpPY0VFRm5XWDEzTEg0WFdWYnJYTnlLNmdCYWR3L3Bob3RvLmpwZyIsImxvY2FsZSI6ImVzIiwidXBkYXRlZF9hdCI6IjIwMjAtMDQtMjRUMjI6NTY6MjYuMDQwWiIsImVtYWlsIjoiZ2l1bmF1bGF3aWxsaWFtQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2FsZXhpc2Jyci1kZXYuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE2OTMwMzgzMzAxNTYwNDU1MTE0IiwiYXVkIjoiRWdVQ2NveWRHZHNYMDlHT3pudzQ4NmVpWHRhNGlHZVMiLCJpYXQiOjE1ODc3Njg5OTAsImV4cCI6MTU4NzgwNDk5MCwiYXRfaGFzaCI6Ilp5QW9wZzcxQmU4cjJEZVpNN29GQ2ciLCJub25jZSI6InM0UDNTM1BNeTh6VWdodzlfb2cxWjg1aEtsenVxblljIn0.Ukt02NnofaF0OcCuLkYXZxje5imHmmGJ6MUMaXW7_lVfE03dqxlsl0ythTS4UVu6b4A0zYfx-bWiImsJ5UU5l1n_b9LUODclN8qRYiRZR9c-Tu2QNXqKAbydo1BVjlzuwhafvsuIzKI9hVONt0agG1SLPDfob49B_AnhSP9WObc0CdUfRU_K1zVtDQbg--iL7Qv2L36j5dbL1FhVOrue1cMjTTEl9XFIZujMp9Eau0HbsB54UvzLYt3JAgFU_7vn-Z9Hgezkki0G-uaT-LpF-s4u2fTrUTcyG-fFqwwqBYn8PoHyMGzAD-vS17E0bHhzklXFQTOvSVesdmdoKxA3lA
*/
