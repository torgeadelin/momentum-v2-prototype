import {ListBoxOption} from './';
import {render} from '@testing-library/react';

describe('ListBoxOption', () => {
  it('renders correctly with default props', () => {
    const deafultProps = {
      propName: "propValue"
    };

    let tree = render(<ListBoxOption {...deafultProps}/>);

    expect(tree).toBeTruthy();
  });
});