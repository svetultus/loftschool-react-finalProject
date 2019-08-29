import React, { PureComponent } from "react";
import styles from "./MapBox.css";
import { getMap, getAddressList, mapRequest } from "../../modules/MapBox";
import { getUserData, getIsPayable } from "../../modules/User";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { mapInit } from "../../modules/MapBox";
import MapForm from "../MapForm";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const MapStateToProps = state => ({
  // map: getMap(state),
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
    return (
      <React.Fragment>
        <Box>
          <div ref={this.mapContainer} />
        </Box>
        <MapForm></MapForm>
      </React.Fragment>
    );
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(MapBox));
