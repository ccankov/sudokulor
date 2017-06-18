import React from 'react';
import classNames from 'classnames/bind';
import Game from '../containers/Game';
import styles from '../css/main.css';

const cx = classNames.bind(styles);

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const App = () => {
  return (
    <div className={cx('app')}>
      <Game />
    </div>
  );
};

export default App;
