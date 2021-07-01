import {Toggle} from './';
import {render} from '@testing-library/react';
import React from 'react';

describe('Toggle', () => {
  it('renders correctly with default props', () => {
    const deafultProps = {
      propName: "propValue"
    };

    let tree = render(<Toggle {...deafultProps}/>);

    expect(tree).toBeTruthy();
  });
});