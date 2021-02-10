import React, { createContext, useReducer, useContext } from "react";
import {
  overrideItemAtIndex,
  findItemIndexById,
  moveItem,
} from "./utils/arrayUtils";
import { nanoid } from "nanoid";
interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
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

export const useAppState = () => {
  return useContext(AppStateContext);
};

//this is called discriminated union
//define a type as action, then we are passing two interfaces seperated
//by the vertical line, action then can resolve to one of the forms that we passed
//each interface has a type property and typescript can look at this property nand tell
//what will be the fields of the interface
// so if(action.type ==="ADD_LIST") {return typeof action.payload} it will return a string
type Action =
  | { type: "ADD_LIST"; payload: string }
  | {
      type: "ADD_TASK";
      payload: { text: string; listId: string };
    }
  //when we start dragging the column, we remember the original position, and pass it a dragIndex
  //and when we hover over other columns, we take their position and use them as a hover index
  | { type: "MOVE_LIST"; payload: { dragIndex: number; hoverIndex: number } };

//defining our appStateReducer
const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_LIST": {
      return {
        //reducer needs to return a new instance of an object,
        //using the spread operator to get all the fields from the previous state
        //then we'll set lists field to to be a new array with the old list plus new items

        //...state = return a new object which contains id, text, task
        ...state,
        lists: [
          //creates new array
          //this line keeps your existing array srpeading out list array, so you can put them in a new list array
          ...state.lists,
          //generate a new object, which gives it an id, text and tasks, which is currently empty, this is adding a new object
          //to the end of your array list
          { id: nanoid(), text: action.payload, tasks: [] },
        ],
      };
    }

    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload;
      return {
        ...state,
        //Here we take dragIndex an hoverInde from the action payload. then calculate new value
        // from the list array. to do this we use the move item function
        //which will take the source array, and two indexes it will swap

        lists: moveItem(state.lists, dragIndex, hoverIndex),
      };
    }

    case "ADD_TASK": {
      //find the target list
      const targetListIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      );
      //save target list to const
      const targetList = state.lists[targetListIndex];
      //create a new object overriding the task field, use the spread operator
      //to append a new task to the end of it
      const updatedTargetList = {
        ...targetList,
        tasks: [
          ...targetList.tasks,
          { id: nanoid(), text: action.payload.text },
        ],
      };
      //return the new state object whre we oride the list field using our function
      //function takes the updated targed list and puts it to the rarget list indexposition
      return {
        ...state,
        lists: overrideItemAtIndex(
          state.lists,
          updatedTargetList,
          targetListIndex
        ),
      };
    }
    default: {
      return state;
    }
  }
};
//component will only accept children, we dont have any other props so we pass an
// an empty object as well

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  //dispatch is the function that you use to update your state.
  //state is your actual data object
  const [state, dispatch] = useReducer(appStateReducer, appData);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

//spread operator takes the values in people, and adds them to a new object, ie, cars now has id: 0 and name: Phil

//const people = {
//id: 0,
// name: "phil",
//};

//const cars = {
// ...people,
//};
