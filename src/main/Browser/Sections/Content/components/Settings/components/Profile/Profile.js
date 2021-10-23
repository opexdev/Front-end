import React, {Fragment} from "react";
import {connect} from "react-redux";
import UserAccountStatus from "./components/UserAccountStatus/UserAccountStatus";
import PersonalProfile from "./components/PersonalProfile/PersonalProfile";

const Profile = (props) => {
  return (
    <Fragment>
      <div className="row">
        <UserAccountStatus />
      </div>
      <div className="row">
        <PersonalProfile />
      </div>
      <div className="row"></div>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
  };
};

export default connect(mapStateToProps, null)(Profile);