import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

type ArrayOfString = [string, string];
type StockItem = {
  name: string;
  price: number;
  status: string;
  updatedAt: string;
};

type State = {
  hasOpened: boolean;
  hasError: boolean;
  data: StockItem[];
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
  data: [],
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

      let newData: StockItem[] = [];

      payload.forEach((newStock) => {
        const [name, price] = newStock;
        const currentPrice = parseFloat(price);

        let indexOfExisting = -1;

        if (data.length) {
          indexOfExisting = data.findIndex((stock) => stock.name === name);
        }

        if (indexOfExisting > -1) {
          const { price: prevPrice } = data[indexOfExisting];

          let status = "NEUTRAL";

          if (prevPrice > currentPrice) {
            status = "UP";
          } else if (prevPrice < currentPrice) {
            status = "DOWN";
          }

          data[indexOfExisting] = {
            name,
            price: currentPrice,
            status,
            updatedAt: new Date().toString(),
          };
        } else {
          newData.push({
            name,
            price: currentPrice,
            status: "NEUTRAL",
            updatedAt: new Date().toString(),
          });
        }
      });

      return { ...state, data: [...data, ...newData] };
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
