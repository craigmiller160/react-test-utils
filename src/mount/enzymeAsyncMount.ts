/*
 * react-test-utils
 * Copyright (C) 2021 Craig Miller
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

import React, { ReactElement } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { ReactWrapper } from 'enzyme';

const enzymeAsyncMount = async (node: ReactElement<any>): Promise<ReactWrapper> => {
    let component: any;
    await act(async () => {
        component = await mount(node);
    });
    const wrapper: ReactWrapper = component as ReactWrapper;
    wrapper.update();
    return wrapper;
};

export default enzymeAsyncMount;
