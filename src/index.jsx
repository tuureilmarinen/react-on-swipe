import React from 'react';
import PropTypes from 'prop-types';

const OnSwipe = (props) => {
  const { onSwipe, children, ...params } = props;
  return (
    <div {...params}>
      {...children}
    </div>
  );
};

OnSwipe.propTypes = {
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  onSwipe: PropTypes.function.isRequired,
};
