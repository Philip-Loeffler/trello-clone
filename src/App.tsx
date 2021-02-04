import React from "react";
import { AppContainer } from "./styles";
import { Column } from "./Column";
import { Card } from "./Card";
import { AddNewItem } from "./AddNewItem";

function App() {
  return (
    <AppContainer>
      <Column text="To do">
        <Card text="Generate app scafold"></Card>
      </Column>
      <Column text="To do">
        <Card text="Generate app scafold"></Card>
      </Column>
      <Column text="To do">
        <Card text="Generate app scafold"></Card>
      </Column>
      <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log} />
    </AppContainer>
  );
}

export default App;
