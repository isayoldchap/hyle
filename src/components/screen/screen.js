import React from 'react';
import PropTypes from 'prop-types';

export const Screen = props => {
  const { children } = props;

  return (
    <div
      style={{
        background: '#e9e9e9',
        display: 'flex',
        flexDirection: 'column',
        left: 0,
        minHeight: '100%',
        overflow: 'auto',
        position: 'fixed',
        top: 0,
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

Screen.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

Screen.defaultProps = {
  children: null
};
