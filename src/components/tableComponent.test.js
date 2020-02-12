import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TableComponent from './tableComponent';


Enzyme.configure({ adapter: new Adapter() });

describe('<TableComponent />', () => {
  it('Count columns', () => {
    const wrapper = shallow(<TableComponent />);
    const rows = wrapper.find('.row');
    expect(rows).toHaveLength(4);
    wrapper.find('.row').forEach((row) => {
      expect(row.find('.col')).toHaveLength(4);
    });
  });

  it('should add new row', () => {
    const wrapper = mount(<TableComponent />);
    const rowAddBtn = wrapper.find('.add-row');

    expect(wrapper.find('.row')).toHaveLength(4);
    rowAddBtn.simulate('click');
    expect(wrapper.find('.row')).toHaveLength(5);
    rowAddBtn.simulate('click');
    expect(wrapper.find('.row')).toHaveLength(6);
  });

  it('should del row', () => {
    const wrapper = mount(<TableComponent />);
    const rowDelBtn = wrapper.find('.del-row');
    expect(wrapper.find('.row')).toHaveLength(4);
    rowDelBtn.simulate('click');
    rowDelBtn.simulate('click');
    expect(wrapper.find('.row')).toHaveLength(2);
  });

  it('should add new col', () => {
    const wrapper = mount(<TableComponent />);
    const colAddBtn = wrapper.find('.add-col');
    wrapper.find('.row').forEach((row) => {
      expect(row.find('.col')).toHaveLength(4);
    });
    colAddBtn.simulate('click');
    wrapper.find('.row').forEach((row) => {
      expect(row.find('.col')).toHaveLength(5);
    });
  });

  it('should del col', () => {
    const wrapper = mount(<TableComponent />);
    const colDelBtn = wrapper.find('.del-col');
    wrapper.find('.row').forEach((row) => {
      expect(row.find('.col')).toHaveLength(4);
    });
    colDelBtn.simulate('click');
    colDelBtn.simulate('click');
    wrapper.find('.row').forEach((row) => {
      expect(row.find('.col')).toHaveLength(2);
    });
  });

  it('should not delete last row', () => {
    const wrapper = mount(<TableComponent initialHeight={1}/>);
    const rowDelBtn = wrapper.find('.del-row');
    expect(wrapper.find('.row')).toHaveLength(1);
    rowDelBtn.simulate('click');
    expect(wrapper.find('.row')).toHaveLength(1);
  });

  it('should not delete lsat col', () => {
    const wrapper = mount(<TableComponent initialWidth={1}/>);
    const colDelBtn = wrapper.find('.del-col');
    wrapper.find('.row').forEach((row) => {
      expect(row.find('.col')).toHaveLength(1);
    });
    colDelBtn.simulate('click');
    wrapper.find('.row').forEach((row) => {
      expect(row.find('.col')).toHaveLength(1);
    });
  });
});
