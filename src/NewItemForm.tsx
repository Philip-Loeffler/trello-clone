import React, { useState } from "react";
import { useFocus } from "./utils/useFocus";
import { NewItemFormContainer, NewItemButton, NewItemInput } from "./styles";

interface NewItemFormProps {
  onAdd(text: string): void;
}

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState("");
  //when you click on the input, it gains foucs
  const inputRef = useFocus();
  //this allows us to click enter to submit the input
  const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onAdd(text);
    }
  };

  return (
    <NewItemFormContainer>
      <NewItemInput
        onKeyPress={handleAddText}
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};
