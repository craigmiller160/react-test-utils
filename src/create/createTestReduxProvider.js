"use strict";
/*
 * react-test-utils
 * Copyright (C) 2020 Craig Miller
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var redux_thunk_1 = require("redux-thunk");
var redux_mock_store_1 = require("redux-mock-store");
var react_redux_1 = require("react-redux");
var createTestReduxProvider = function (defaultState) {
    var storeHandler = {};
    var createMockStore = redux_mock_store_1["default"]([redux_thunk_1["default"]]);
    var TestReduxProvider = function (stateProps) {
        var actualState = __assign(__assign({}, defaultState), stateProps);
        var store = createMockStore(actualState);
        storeHandler.store = store;
        return (<react_redux_1.Provider store={store}>
                {stateProps.children}
            </react_redux_1.Provider>);
    };
    return [TestReduxProvider, storeHandler];
};
exports["default"] = createTestReduxProvider;
