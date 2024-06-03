import "react-toastify/dist/ReactToastify.css";
import { Suspense, lazy, useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Preloader from "./components/preloader";
import { Context as AuthorContext } from "src/context/AuthorContext";
import { TodoProvider } from "src/context/TodoContext";
import { randomString } from "./helpers";
import { setAuthor } from "./reducer/author/action";
import apiUrl from "./config";
import axios from "axios";

const ErrorNotFound = lazy(() => import("./pages/error-404"));
const Todo = lazy(() => import("./pages/todo"));

function App() {
  const { dispatch } = useContext(AuthorContext);

  useEffect(() => {
    const authorId = localStorage.getItem("authorId");
    if (!authorId) {
      const tempString = randomString(16);
      createAuthorByDispatch(tempString);
    }
  }, []);

  const createAuthorByDispatch = async (objectId: string) => {
    const createAuthor = async () => {
      const response = await axios
        .post(`${apiUrl}/authors/create`, {
          objectId,
        })
        .then((response) => response.data)
        .catch((error) => console.error(error));
      return response;
    };
    const result = await createAuthor();
    localStorage.setItem("authorId", result.author._id);
    dispatch(setAuthor(result.author._id));
  };
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Preloader />}>
                <TodoProvider>
                  <Todo />
                </TodoProvider>
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
