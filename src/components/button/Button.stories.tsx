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
    <div style={{backgroundColor: 'black', padding: '2rem'}}>
      <Button {...props} onPress={() => alert('hii')}/>
      <Button {...props}/>
      <Button />
    </div>
  );
}