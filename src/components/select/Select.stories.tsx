import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Item, Section } from "@react-stately/collections";

import { Select } from "./";

let withSection = [
  {
    name: "Animals",
    children: [{ name: "Aardvark" }, { name: "Kangaroo" }, { name: "Snake" }],
  },
  {
    name: "People",
    children: [{ name: "Danni" }, { name: "Devon" }, { name: "Ross" }],
  },
];
storiesOf("Select", module)
  .add("Default", () => (
    <div style={{ backgroundColor: "black", padding: "2rem" }}>
      <Select label={"Default"} onSelectionChange={action("selectionChange")}>
        <Item>Red</Item>
        <Item>Orange</Item>
        <Item>Yellow</Item>
        <Item>Green</Item>
        <Item>Blue</Item>
        <Item>Purple</Item>
      </Select>
    </div>
  ))
  .add("Sections", () => (
    <div style={{ backgroundColor: "black", padding: "2rem" }}>
      <Select label="Sections" items={withSection}>
        {(item) => (
          <Section key={item.name} items={item.children} title={item.name}>
            {(item) => <Item key={item.name}>{item.name}</Item>}
          </Section>
        )}
      </Select>
    </div>
  ));
