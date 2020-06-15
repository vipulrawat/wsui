import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

export enum StockStatus {
  UP = "UP",
  DOWN = "DOWN",
  NEUTRAL = "NEUTRAL",
}

type ArrayOfString = [string, string];

export type StockItem = {
  price: number;
  status: StockStatus;
  updatedAt: Date;
};

type State = {
  hasOpened: boolean;
  hasError: boolean;
  data: Record<string, StockItem>;
};

export interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}

type Action =
  | { type: "DATA"; payload: ArrayOfString[] }
  | { type: "ERROR" }
  | { type: "TOGGLE_CONN_STATUS" };

const initialState = {
  hasOpened: false,
  hasError: false,
  data: {},
};

export const StockDataContext = createContext<Context>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "DATA":
      const { payload } = action;
      const { data } = state;

      const updatedData = data;
      payload.forEach((stock) => {
        const [name, price] = stock;
        if (data.hasOwnProperty(name)) {
          updatedData[name].price > Number(price)
            ? (updatedData[name].status = StockStatus.DOWN)
            : (updatedData[name].status = StockStatus.UP);

          updatedData[name].price = Number(price);
          updatedData[name].updatedAt = new Date();
        } else {
          updatedData[name] = {
            price: Number(price),
            status: StockStatus.NEUTRAL,
            updatedAt: new Date(),
          };
        }
      });

      return { ...state, data: { ...data, ...updatedData } };
    case "ERROR":
      return { ...state, hasError: true };
    case "TOGGLE_CONN_STATUS":
      const { hasOpened: currentStatus } = state;
      return { ...state, hasOpened: !currentStatus };
    default:
      return state;
  }
};

const StocksProvider = (props: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <StockDataContext.Provider value={{ state, dispatch }} {...props} />;
};

function useStocks() {
  const context = useContext(StockDataContext);
  if (context === undefined) {
    throw new Error(`useStocks must be used within a StocksProvider`);
  }
  return context;
}

export { StocksProvider, useStocks };
