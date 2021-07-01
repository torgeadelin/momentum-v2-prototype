import React, { ReactElement, RefObject } from 'react';
import classnames from 'classnames';

import styles from './ListBoxBase.module.scss';
import { MomentumListBoxBaseProps} from './';
import { useListBox } from '@react-aria/listbox';
import { ListState } from '@react-stately/list';
import { ListBoxOption } from 'components/listbox-option';
import { ListBoxSection } from 'components/listbox-section';

export const ListBoxContext = React.createContext<ListState<unknown>>(null);

const ListBoxBase = <T extends unknown>(props: MomentumListBoxBaseProps<T>, ref: RefObject<HTMLUListElement>) => {
  const { state, ...otherProps } = props;

  // Get props for the listbox
  let { listBoxProps } = useListBox(
    {
      autoFocus: props.autoFocus,
      disallowEmptySelection: true,
      ...otherProps,
    },
    state,
    ref
  );

  return (
    <ListBoxContext.Provider value={state}>
      <ul
        {...listBoxProps}
        ref={ref}
        className={classnames(styles.listBoxWrapper)}
      >
        {[...state.collection].map((item) =>
          item.hasChildNodes ? (
            <ListBoxSection
              key={item.key}
              section={item}
              header={item.rendered}
            />
          ) : (
            <ListBoxOption item={item} key={item.key} />
          )
        )}
      </ul>
    </ListBoxContext.Provider>
  );
}


/**
 * TODO: Add description of component here.
 */
 const _ListBoxBase = React.forwardRef(ListBoxBase) as <T>(
  props: MomentumListBoxBaseProps<T> & { ref?: RefObject<HTMLUListElement> }
) => ReactElement;

export {_ListBoxBase as ListBoxBase};

