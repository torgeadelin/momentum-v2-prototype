import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';

import {Toggle,  MomentumToggleProps} from './';

storiesOf('Toggle', module)
  .add(
    'Default',
    () => render({})
  );

const render = (props: MomentumToggleProps) => {
  return (
    <Toggle {...props}>Show notifications</Toggle>
  );
}