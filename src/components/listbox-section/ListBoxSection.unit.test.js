import {ListBoxSection} from './';
import {render} from '@testing-library/react';
import React from 'react';

describe('ListBoxSection', () => {
  it('renders correctly with default props', () => {
    const deafultProps = {
      propName: "propValue"
    };

    let tree = render(<ListBoxSection {...deafultProps}/>);

    expect(tree).toBeTruthy();
  });
});