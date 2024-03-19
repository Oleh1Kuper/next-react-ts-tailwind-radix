import React from 'react';
import LatestIssues from './LatestIssues';

type Props = {
  searchParams: { page: string };
}

const Home: React.FC<Props> = () => (
  <LatestIssues />
);

export default Home;
