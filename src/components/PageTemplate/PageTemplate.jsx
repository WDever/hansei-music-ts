import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './PageTemplate.scss';

const cx = classNames.bind(styles);

const PageTemplate = ({ list, search }) => (
  <div className={cx('page-template')}>
    <div className={cx('search-wrapper')}>{search}</div>
    <section className={cx('list-wrapper')}>
      {list}
    </section>
  </div>
  );

PageTemplate.propTypes = {
  list: PropTypes.element,
  search: PropTypes.element,
};

PageTemplate.defaultProps = {
  list: null,
  search: null,
};

export default PageTemplate;
