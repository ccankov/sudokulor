import React from 'react';
import Page from '../pages/Page';
import GameContainer from '../containers/Game';
import { title, meta, link } from './assets';

const App = props => (
  <Page title={title} meta={meta} link={link}>
    <GameContainer {...props} />
  </Page>
);

export default App;
