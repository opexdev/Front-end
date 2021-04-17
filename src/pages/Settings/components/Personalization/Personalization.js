import React, {Fragment} from "react";
import {connect} from "react-redux";
import PersonalizationForm from "./PersonalizationForm/PersonalizationForm";

const Personalization = (props) => {
  return (
    <Fragment>
      <div className="row">
        <PersonalizationForm />
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
  };
};

export default connect(mapStateToProps, null)(Personalization);
