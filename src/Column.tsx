import React from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./AppStateContext";
import { Card } from "./Card";

//defining form of prop object as interface
interface ColumnProps {
  text: string;
  index: number;
}
//functional component that takes in a text prop from columnProps
export const Column = ({ text, index }: ColumnProps) => {
  const { state } = useAppState();
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} key={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="Add another task"
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  );
};
