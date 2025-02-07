import "react-toastify/dist/ReactToastify.css";
import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Preloader from "./components/preloader";
import { WordProvider } from "./context/WordContext";

const ErrorNotFound = lazy(() => import("./pages/error-404"));
const WordleLikePuzzle = lazy(() => import("./pages/wordle-like-puzzle"));

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Preloader />}>
                <WordProvider>
                  <WordleLikePuzzle />
                </WordProvider>
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Preloader />}>
                <ErrorNotFound />
              </Suspense>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
