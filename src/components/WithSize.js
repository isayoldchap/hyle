import React, { Component } from "react";

import _ from "lodash";

export function withSize(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        componentSize: {}
      };
      this.setComponentWidth = this.setComponentWidth.bind(this);
      this.updateComponentWidth = this.updateComponentWidth.bind(this);
    }

    componentWillMount() {
      this.id = _.uniqueId("with-size__");
    }

    componentDidMount() {
      this.component = document.getElementById("board-container");
      this.setComponentWidth();
      window.addEventListener("resize", this.updateComponentWidth, false);
    }

    componentWillUnmount() {
      this.resizeTimer = null;
      window.removeEventListener("resize", this.updateComponentWidth, false);
    }

    setComponentWidth() {
      const width =
        this.component && this.component.offsetWidth
          ? this.component.offsetWidth
          : 0;
      this.setState({ componentSize: { width } });
    }

    updateComponentWidth() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.setComponentWidth();
      }, 500);
    }

    render() {
      return (
        <WrappedComponent
          id={this.id}
          componentSize={this.state.componentSize}
          {...this.props}
        />
      );
    }
  };
}
