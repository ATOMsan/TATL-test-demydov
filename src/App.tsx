import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRouting } from "Router/router";
import { Suspense } from "react";
import CircularIndeterminate from "components/Loader";

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<CircularIndeterminate />}>
        <AppRouting />
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
}

export default App;
