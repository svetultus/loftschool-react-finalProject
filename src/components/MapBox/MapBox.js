import React, { PureComponent } from "react";
import styles from "./MapBox.css";
import { getMap, getAddressList, mapRequest } from "../../modules/MapBox";
import { getUserData, getIsPayable } from "../../modules/User";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { mapInit } from "../../modules/MapBox";

const MapStateToProps = state => ({
  map: getMap(state),
  addressList: getAddressList(state),
  userProfile: getUserData(state),
  userIsPayable: getIsPayable(state)
});

const MapDispatchToProps = { mapRequest };

class MapBox extends React.PureComponent {
  mapContainer = React.createRef();

  componentDidMount() {
    this.props.mapRequest(this.mapContainer);
  }

  componentWillUnmount() {
    // if (this.props.map) this.props.map.remove();
  }

  render() {
    return <div ref={this.mapContainer} />;
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(MapBox));
