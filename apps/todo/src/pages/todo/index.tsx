import React, { useContext, useEffect } from "react";
import Layout from "../../layouts";
import Content from "../../layouts/content";
import TodoContainer from "src/containers/todo";
import { TodoContext } from "src/context/TodoContext";
import { setTodosList } from "src/reducer/todo/action";
import apiUrl from "src/config";

const Todo: React.FC = () => {
  const { dispatch } = useContext(TodoContext);
  useEffect(() => {
    const authorId = localStorage.getItem("authorId");
    if (authorId) getTodosListByDispatch(authorId);
  }, []);

  const getTodosListByDispatch = async (authorId: string) => {
    const result = await fetch(`${apiUrl}/todos/get?authorId=${authorId}`)
      .then((response) => response.json())
      .catch((error) => console.error(error));

    dispatch(setTodosList(result.todos));
  };

  return (
    <Layout>
      <Content fullHeight>
        <TodoContainer />
      </Content>
    </Layout>
  );
};

export default Todo;
