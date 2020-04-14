/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import { getIsMobile } from '../../util/get-is-mobile/get-is-mobile';

// NOTE: This H.O.C. passes width and height props when the input Component's wrapper resizes.
//       Safari/iOS Safari do not support the ResizeObserver interface, so setInterval() is
//       used to check for changes in size on mobile.

export const RESIZE_CHECK_INTERVAL = 500;

export const withResizeDimensions = WrappedComponent => {
  // eslint-disable-next-line react/display-name
  return class extends Component {
    static propTypes = {
      id: PropTypes.string
    };

    static defaultProps = {
      id: ''
    };

    constructor(props) {
      super(props);
      this.state = { height: null, width: null };

      const { id } = props;
      this.id = id || uniqueId('with-resize__');

      this.isMobile = getIsMobile();
      if (!this.isMobile) {
        this.resizeObserver = new ResizeObserver(entities => this.handleDesktopWrapperResize(entities));
      }

      this.handleDesktopWrapperResize = this.handleDesktopWrapperResize.bind(this);
      this.handleMobileWrapperResize = this.handleMobileWrapperResize.bind(this);
    }

    componentDidMount() {
      const element = this.getElement();
      if (!element) return;

      if (this.isMobile) {
        setInterval(this.handleMobileWrapperResize, RESIZE_CHECK_INTERVAL);
      } else {
        this.resizeObserver.observe(element);
      }
    }

    componentWillUnmount() {
      if (this.isMobile) {
        clearInterval(this.handleMobileWrapperResize);
      } else {
        this.resizeObserver.disconnect();
      }
    }

    getElement() {
      return document.getElementById(this.id);
    }

    handleDesktopWrapperResize(entries = []) {
      if (!entries.length) return;

      const {
        contentRect: { height }
      } = entries[0];

      this.updateDimensions(height);
    }

    handleMobileWrapperResize() {
      const element = this.getElement();
      if (!element) return;

      const boundingRect = element.getBoundingClientRect();
      const { height: currentHeight, width: currentWidth } = boundingRect;

      const { height, width } = this.state;

      if (height !== currentHeight || width !== currentWidth) {
        this.updateDimensions(height);
      }
    }

    updateDimensions(height) {
      const heightWidthSize = Math.floor(height);
      this.setState({ height: heightWidthSize, width: heightWidthSize });
    }

    render() {
      const { height, width } = this.state;
      return <WrappedComponent {...this.props} id={this.id} height={height} width={width} />;
    }
  };
};
