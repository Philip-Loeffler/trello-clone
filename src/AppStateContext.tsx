import React, { createContext } from "react";

interface AppStateContextProps {
  state: AppState;
}
const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

//data structure explanation
//list is an array of objects
//the list object contains an id, text, and task
//task is a property but it is an array of objects
//app data is an object which contains a list of properties which is an array of objects
const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
};

interface Task {
  id: string;
  text: string;
}

interface List {
  id: string;
  text: string;
  tasks: Task[];
}

export interface AppState {
  lists: List[];
}
//component will only accept children, we dont have any other props so we pass an
// an empty object as well
export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <AppStateContext.Provider value={{ state: appData }}>
      {children}
    </AppStateContext.Provider>
  );
};
