import React from "react";

class Profile extends React.Component {
  state = {
    //well know function from magic functions
    profile: null,
    error: null,
  };
  componentDidMount() {
    this.loadUserProfile();
  }
  loadUserProfile() {
    this.props.auth.getProfile((profile, error) => {
      this.setState({ profile, error });
    });
  }
  render() {
    const { profile } = this.state;
    if (!profile) return null;
    //when using componentdidmount, o sea :v, when waiting for other data to come from async functions its better to check if there is already data
    return (
      <div>
        <h1>{profile.nickname}</h1>
        <img
          style={{ maxWidth: 50, maxHeight: 50 }}
          src={profile.picture}
          alt="profile pic"
        ></img>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    );
  }
}
export default Profile;
