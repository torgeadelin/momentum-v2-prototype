import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';

import {Button,  MomentumButtonProps} from './';

storiesOf('Button', module)
  .add(
    'Primary',
    () => render({})
  )
  .add(
    'Secondary',
    () => render({variant: 'secondary'})
  );

const render = (props: MomentumButtonProps) => {
  return (
    <div style={{ backgroundColor: "black", padding: "2rem" }}>
      <Button {...props} onPress={() => alert("hii")}>
        Hi Button
      </Button>
      <Button {...props}>Button</Button>
      <Button {...props} disabled>
        Button 1
      </Button>
    </div>
  );
}