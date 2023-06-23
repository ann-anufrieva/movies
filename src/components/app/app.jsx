import React, { useEffect } from "react";

import RatedMovies from "../rated/rated";
import SearchList from "../search/search";
import GuestSessionId from "./GuestSessionId";

import { Offline, Online } from "react-detect-offline";

import { Tabs, Alert } from 'antd';

import './app.css'
import 'antd/dist/reset.css';

const App = () => {

  useEffect(() => {
    if (!localStorage.getItem('id')) {
      GuestSessionId();
    }
  }, []);

  const items = [
    {
      key: '1',
      label: 'Search',
      children: <SearchList />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedMovies />,
    },
  ];

  return (
    <div className="app">
      <Online>
        <Tabs defaultActiveKey="1" items={items} centered={true} />
      </Online>
      <Offline>
        <Alert message="Нет сети, проверьте подключение" type="error" showIcon />
      </Offline>
    </div>
  );
};

export default App;