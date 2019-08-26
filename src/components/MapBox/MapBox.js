import React, { PureComponent } from "react";
import styles from "./MapBox.css";
import { getMap, mapRequest } from "../../modules/MapBox";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { mapInit } from "../../modules/MapBox";

const MapStateToProps = state => ({
  map: getMap(state)
});

const MapDispatchToProps = { mapRequest };

class MapBox extends React.PureComponent {
  mapContainer = React.createRef();

  componentDidMount() {
    console.log("componentDidMount");
    this.props.mapRequest(this.mapContainer);
  }

  componentWillUnmount() {
    if (this.props.map) this.props.map.remove();
  }

  render() {
    return <div ref={this.mapContainer} />;
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(MapBox));
