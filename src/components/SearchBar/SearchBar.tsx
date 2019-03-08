import * as React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchBar.scss';
import { ReactComponent as Icon } from './searchIcon.svg';
import { SearchBarProps } from '../../container/SearchBarContainer';

const cx = classNames.bind(styles);

// interface SearchBarProps {
//   code: number;
//   changer: React.ReactElement;
//   canReservation: boolean
//   onFocus(bool: boolean): void;
//   onClick(input: string): void;
// }

interface SearchBarState {
  input: string;
  placeholder: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    input: '',
    placeholder: '',
  }

  componentDidMount = (): void => {
    const { code } = this.props;
    const hour: number = Number(moment().format('H')) * 3600;
    const min: number = Number(moment().format('m')) * 60;
    const sec: number = Number(moment().format('s'));

    const sum = hour + min + sec;

    setInterval((): void => this.setTime(), 1000);

    if (sum >= 30000 && sum <= 43200 && code !== 423) {
      this.setState((): object => ({
        placeholder: '',
      }));
    }

    else if (sum > 43200 || code === 423) {
      this.setState((): object => ({
        placeholder: '오늘의 예약이 마감되었습니다.',
      }));
    }
  }

  setTime = (): void => {
    const { code } = this.props;
    const { placeholder } = this.state;

    const hour: number = Number(moment().format('H'));
    const min: number = Number(moment().format('m'));
    const sec: number = Number(moment().format('s'));
 
    const sum = hour * 3600 + min * 60 + sec * 1;

    if(sum < 30000) {
      this.setState((): object => ({
        placeholder: `예약시간 전 입니다. - ${hour} : ${min} : ${sec}`       
      }));
    }

    else if(sum === 30000) {
      this.setState((): object => ({
        placeholder: '',
      }));
    }

    else if ((sum > 43200 || code === 423) && placeholder !== '오늘의 예약이 마감되었습니다.') {
      this.setState((): object => ({
        placeholder: '오늘의 예약이 마감되었습니다.',
      }));
    }
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { input } = this.state;
    const { onClick } = this.props;

    onClick(input);
  }

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;

    this.setState((): object => ({
      input: value,
    }));
  }

  render() {
    const { changer, availability, onFocus } = this.props;
    const { placeholder, input } = this.state;
    const { onChange, onSubmit } = this; 
    return (
      <div className={cx('search-template')}>
        {changer}
        <form className={cx('search-bar')} onSubmit={onSubmit}>
          <input
            className={cx('search')}
            onChange={onChange}
            value={input}
            placeholder={availability ? placeholder : ''}
            onFocus={() => onFocus(true)}
            onBlur={() => onFocus(false)}
          />
          <button type="submit">
            <Icon className={cx('icon')} />
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
