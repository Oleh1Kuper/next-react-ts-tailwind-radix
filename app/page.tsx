import React from 'react';
import Pagination from './components/Pagination';

type Props = {
  searchParams: { page: string };
}

const Home: React.FC<Props> = ({ searchParams }) => (
  <Pagination currentPage={+searchParams || 1} itemCount={100} pageSize={10} />
);

export default Home;
