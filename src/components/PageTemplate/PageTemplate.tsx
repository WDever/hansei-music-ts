import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './PageTemplate.scss';

const cx = classNames.bind(styles);

interface PageTemplateProps {
  list: React.ReactElement;
  search: React.ReactElement;
}

const PageTemplate: React.SFC<PageTemplateProps> = ({ list, search }) => (
  <div className={cx('page-template')}>
    <div className={cx('search-wrapper')}>{search}</div>
    <section className={cx('list-wrapper')}>
      {list}
    </section>
  </div>
  );

export default PageTemplate;
