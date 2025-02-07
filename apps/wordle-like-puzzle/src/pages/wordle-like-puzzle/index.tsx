import React from "react";

// Layout Imports
import Layout from "@/layouts";
import Content from "@/layouts/content";

// Containers Imports
import StartScreen from "@/containers/wordle-like-puzzle/StartScreen";
import TimeScreen from "@/containers/wordle-like-puzzle/TimeScreen";

// Third-party Imports
import { ArrowLeft } from "react-feather";

// Shared Imports
import { Button } from "@todo/ui";
import styled from "@todo/shared/styled";

// Context Imports
import { WordContext } from "@/context/WordContext";
import ScoreScreen from "@/containers/wordle-like-puzzle/ScoreScreen";

const StyledBackButton = styled(({ ...rest }) => <Button {...rest} />)`
  position: fixed;
  left: 10px;
  top: 5%;
  transform: translateY(-50%);
  background-color: transparent;
  font-size: 2rem;
  color: #2196f3;
  cursor: pointer;

  &:active,
  &:focus,
  &:hover {
    background-color: transparent;
    outline: none;
    border: none;
    box-shadow: none;
  }
`;

const WordleLikePuzzle = () => {
  const { state } = React.useContext(WordContext);

  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  React.useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleStartGame = () => setShowPopup(false);

  const handleClear = () => {
    setShowPopup(true);

    localStorage.clear();
  };

  const handlePageReload = () => {
    const userConfirmed = window.confirm("Do you want to continue playing?");
    if (!userConfirmed) {
      handleClear();
    }
  };

  return (
    <Layout>
      <Content fullHeight>
        {showPopup ? (
          <StartScreen onStartGame={handleStartGame} />
        ) : (
          <>
            {" "}
            {state.type === "time" && <TimeScreen onClose={handleClear} />}
            {state.type === "score" && <ScoreScreen onClose={handleClear} />}
            <StyledBackButton onClick={handlePageReload}>
              <ArrowLeft />
            </StyledBackButton>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default WordleLikePuzzle;
