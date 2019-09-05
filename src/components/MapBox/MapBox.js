import React, { PureComponent } from "react";
import mapboxgl from "mapbox-gl";
import styles from "./MapBox.css";
import { getMap, getAddressList, mapRequest } from "../../modules/MapBox";
import { apiKey } from "../../modules/MapBox/apiKey.js";
import { mapInit } from "../../modules/MapBox/api.js";
import { getUserData, getIsPayable } from "../../modules/User";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MapForm from "../MapForm";

import { Container, Box } from "@material-ui/core/";

const MapStateToProps = state => ({
  // map: getMap(state),
  addressList: getAddressList(state),
  userProfile: getUserData(state),
  userIsPayable: getIsPayable(state)
});

const MapDispatchToProps = { mapRequest };

class MapBox extends React.PureComponent {
  mapContainer = React.createRef();

  async componentDidMount() {
    this.map = await mapInit(this.mapContainer, apiKey, mapboxgl);
    this.props.mapRequest(this.map);
  }

  render() {
    return (
      <React.Fragment>
        <div ref={this.mapContainer} data-testid="map-wrapper" />

        <MapForm></MapForm>
      </React.Fragment>
    );
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(MapBox));
