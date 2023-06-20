import React, { useEffect } from "react";
import Pages from "./Pages";

import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <div className="h-[100vh] bg-primary">
      <Provider store={store}>
        <Pages />
      </Provider>
    </div>
  );
};

export default App;
