import {Select} from './';
import {render} from '@testing-library/react';
import React from 'react';

describe('Select', () => {
  it('renders correctly with default props', () => {
    const deafultProps = {
      propName: "propValue"
    };

    let tree = render(<Select {...deafultProps}/>);

    expect(tree).toBeTruthy();
  });
});