import React from 'react';
import PropTypes from 'prop-types';
import './screen.css';

export const Screen = props => {
  const { children } = props;

  return <div className="screen-wrapper">{children}</div>;
};

Screen.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

Screen.defaultProps = {
  children: null
};
