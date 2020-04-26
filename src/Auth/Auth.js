import auth0 from "auth0-js";

export default class Auth {
  constructor(history) {
    // console.log(process.env.REACT_APP_CLIENT_ID);
    this.history = history;
    this.userProfile = null;
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
    //  console.log(authResult);
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expireAt);
  };
  isAuthenticated = () => {
    const expireAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expireAt;
  };
  logOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.userProfile = null;
    //this is how we log out the user session localy, however its not logout i nthe sv
    //in summary we are removing the local store but nor the cookie, in order to erase the cookie and also log out from the sv
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000",
    });
    //https://alexisbrr-dev.auth0.com/.well-known/jwks.json here are the cookies of the session
  };
  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return accessToken;
  };
  getProfile = (cb) => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
      //the method userInfo requires the accesstoken of the user to take bake all the info
    });
  };
}
/*
http://localhost:3000/callback#
access_token=aShZ92w6tnIKqqkdJJdt17JwzsGIXytA
&

*/
