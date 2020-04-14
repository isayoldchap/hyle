import 'babel-polyfill';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { create } from 'react-test-renderer';
import sinon from 'sinon';

const copyProps = (src, target) => {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  });
};

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.create = create;
global.expect = expect;
global.sinon = sinon;

const dom = new JSDOM('');
const { window } = dom;

global.window = window;
global.document = window.document;

global.navigator = { userAgent: 'node.js' };

global.requestAnimationFrame = callback => {
  return setTimeout(callback, 0);
};

global.cancelAnimationFrame = id => {
  clearTimeout(id);
};

copyProps(window, global);
