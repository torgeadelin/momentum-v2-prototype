import {ListBoxBase} from './';
import {render} from '@testing-library/react';
import React from 'react';

describe('ListBoxBase', () => {
  it('renders correctly with default props', () => {
    const deafultProps = {
      propName: "propValue"
    };

    let tree = render(<ListBoxBase {...deafultProps}/>);

    expect(tree).toBeTruthy();
  });
});