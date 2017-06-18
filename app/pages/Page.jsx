import React from 'react';
import Helmet from 'react-helmet';

const Page = ({ title, link, meta, children }) => {
  return (
    <div>
      <Helmet title={title} link={link} meta={meta} />
      { children }
    </div>
  );
};

export default Page;
