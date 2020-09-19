import { act } from 'react-dom/test-utils';
import { ReactWrapper } from 'enzyme';

const resolveComponent = async (component: ReactWrapper) => {
    await act(async () => {
        await component;
        await new Promise((resolve) => setImmediate(resolve));
        component.update();
    });
};

export default resolveComponent;
