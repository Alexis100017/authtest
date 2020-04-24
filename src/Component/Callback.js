import React from "react";

class Callback extends React.Component {
  componentDidMount() {
    //handle auth if expected values in the URL
    console.log("Callback");
    if (/access_token| id_token | error/.test(this.props.location.hash)) {
      console.log("Callback FUNCTION");
      this.props.auth.handleAuthentication();
    }
  }
  render() {
    return (
      <div>
        <h1>cargando</h1>
      </div>
    );
  }
}
export default Callback;
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
