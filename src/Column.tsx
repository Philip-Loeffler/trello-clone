import React from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";

//defining form of prop object as interface
interface ColumnProps {
  text: string;
}
//functional component that takes in a text prop from columnProps
export const Column = ({
  text,
  children,
}: React.PropsWithChildren<ColumnProps>) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem
        toggleButtonText="Add another task"
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  );
};
