import React, { useContext } from "react";

import styles from "./ListBoxSection.module.scss";
import { MomentumListBoxSectionProps } from "./";
import { useSeparator } from "@react-aria/separator";
import { useListBoxSection } from "@react-aria/listbox";
import { ListBoxContext } from "components/listbox";
import { ListBoxOption } from "components/listbox-option";

const ListBoxSection = <T extends unknown>({
  section,
}: MomentumListBoxSectionProps<T>) => {
  let { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  let { separatorProps } = useSeparator({
    elementType: "li",
  });

  let state = useContext(ListBoxContext);

  // If the section is not the first, add a separator element.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li
          {...separatorProps}
          style={{
            borderTop: "1px solid gray",
            margin: "2px 5px",
          }}
        />
      )}
      <li {...itemProps}>
        {section.rendered && (
          <span {...headingProps} className={styles.listBoxHeader}>
            {section.rendered}
          </span>
        )}
        <ul
          {...groupProps}
          style={{
            padding: 0,
            listStyle: "none",
          }}
        >
          {[...section.childNodes].map((node) => (
            <ListBoxOption key={node.key} item={node} />
          ))}
        </ul>
      </li>
    </>
  );
};

/**
 * TODO: Add description of component here.
 */
export { ListBoxSection };
