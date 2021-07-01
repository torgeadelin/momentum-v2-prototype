import React, { useContext } from 'react';
import classnames from 'classnames';

import styles from './ListBoxOption.module.scss';
import { MomentumListBoxOptionProps} from './';
import { useOption } from '@react-aria/listbox';
import { useFocus, useHover, usePress } from '@react-aria/interactions';
import { mergeProps } from 'utils/mergeProps';

import { ListBoxContext } from 'components/listbox';

const ListBoxOption = <T extends unknown>({item}: MomentumListBoxOptionProps<T>) => {
  // Get props for the option element
  let ref = React.useRef(null);
  let state = useContext(ListBoxContext);

  let isDisabled = state.disabledKeys.has(item.key);
  let isSelected = state.selectionManager.isSelected(item.key);
  let { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
    },
    state,
    ref
  );

  // Handle focus events so we can apply highlighted
  // style to the focused option
  let [isFocused, setFocused] = React.useState(false);
  let { focusProps } = useFocus({ onFocusChange: setFocused });

  let { pressProps, isPressed } = usePress({});
  let { hoverProps, isHovered } = useHover({});

  return (
    <li
      {...mergeProps(optionProps, focusProps, pressProps, hoverProps)}
      ref={ref}
      className={classnames(
        styles.listBoxItem,
        { [styles.focused]: isFocused },
        { [styles.hover]: isHovered },
        { [styles.pressed]: isSelected || isPressed }
      )}
    >
      {item.rendered}
    </li>
  );
}

/**
 * TODO: Add description of component here.
 */
export {ListBoxOption};

