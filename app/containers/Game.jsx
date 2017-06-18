import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Game from '../components/game';
import styles from '../css/components/game.css';

const cx = classNames.bind(styles);

const GameContainer = () => {
    return (
      <div className={cx('game')}>
        <Game />
      </div>
    );
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, null)(GameContainer);
