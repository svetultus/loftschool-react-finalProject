import React, { PureComponent } from "react";
import styles from "./Input.module.css";
import cx from "classnames";

class Input extends PureComponent {
  input = React.createRef();

  focus = () => {
    if (this.input.current) {
      this.input.current.focus();
    }
  };

  render() {
    const { className, ...rest } = this.props;

    return (
      <input
        ref={this.input}
        className={cx(styles.root, className)}
        {...rest}
      />
    );
  }
}

export default Input;
