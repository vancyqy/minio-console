// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import MainRouter from "./MainRouter";
import StyleHandler from "./StyleHandler";

import i18next from 'i18next';
import en from './lang/en.json';
import zh from './lang/zh-cn.json';

i18next
  .init({
    lng: 'zh', // if you're using a language detector, do not define the lng option
    debug: true,
    nsSeparator: false,
    keySeparator: false,
    fallbackLng: false,
    resources: {
      en: {
        translation: en,
      },
      zh:{
        translation: zh,

      }
    },
  })
  .then(() => {
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <StyleHandler>
            <MainRouter />
          </StyleHandler>
        </Provider>
      </React.StrictMode>
    );
  });