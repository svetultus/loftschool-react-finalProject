import React, { PureComponent } from "react";
import styles from "./MapBox.css";
// import { getIsAuthorized, authRequest, getUser } from "../../modules/Auth";
import { connect } from "react-redux";
// import { withRouter} from "react-router-dom";
// import Input from "../Input";
// import { user } from "./authData";

// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";

import { mapInit } from "../../modules/MapBox";

class MapBox extends React.PureComponent {
  map = null;
  mapContainer = React.createRef();

  componentDidMount() {
    this.map = mapInit(this.mapContainer);
  }

  componentWillUnmount() {
    if (this.map) this.map.remove();
  }

  render() {
    return <div ref={this.mapContainer} />;
  }
}

export default MapBox;
