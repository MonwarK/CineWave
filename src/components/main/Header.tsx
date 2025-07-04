'use client';

import { useState } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';

const navigation = [
  {
    name: 'Home',
    link: '/discover',
  },
  {
    name: 'Trending',
    link: '/trending',
  },
  {
    name: 'TV Shows',
    link: '/series',
  },
  {
    name: 'Movies',
    link: '/movies',
  },
  {
    name: 'My List',
    link: '/list',
  },
];

export default function Header() {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  return (
    <>
      <TopNav navigation={navigation} setIsSidenavOpen={setIsSidenavOpen} />

      <SideNav
        navigation={navigation}
        isSidenavOpen={isSidenavOpen}
        setIsSidenavOpen={setIsSidenavOpen}
      />
    </>
  );
}
