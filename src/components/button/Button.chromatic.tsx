import {action} from '@storybook/addon-actions';
import {Button,  MomentumButtonProps} from './';
import React from 'react';
import {storiesOf} from '@storybook/react';

storiesOf('Button', module)
  .add(
    'name me',
    () => render({})
  );

const render = (props: MomentumButtonProps) => {
  return (
    <Button {...props}/>
  );
}