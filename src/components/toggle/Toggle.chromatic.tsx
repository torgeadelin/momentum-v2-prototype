import {action} from '@storybook/addon-actions';
import {Toggle,  MomentumToggleProps} from './';
import React from 'react';
import {storiesOf} from '@storybook/react';

storiesOf('Toggle', module)
  .add(
    'name me',
    () => render({})
  );

const render = (props: MomentumToggleProps) => {
  return (
    <Toggle {...props}/>
  );
}