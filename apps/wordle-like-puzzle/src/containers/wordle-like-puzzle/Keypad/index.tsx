// React Imports
import React from "react";

// Style Imports
import {
  StyledCol,
  StyledKeypadRow,
  StyledKeypad,
  StyledSubmitButton,
  StyledKeypadButton,
} from "./style";

interface IProps {
  onGuess: () => void;
  onKeyPress: (letter: string) => void;
}

const Keypad: React.FC<IProps> = ({ onGuess, onKeyPress }) => (
  <>
    <StyledCol sm={12} className={`keypad`}>
      <StyledKeypad>
        {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((row, rowIndex) => (
          <StyledKeypadRow key={rowIndex}>
            {row.split("").map((letter) => (
              <StyledKeypadButton
                key={`${letter}`}
                onClick={() => onKeyPress(letter)}
              >
                {letter}
              </StyledKeypadButton>
            ))}
          </StyledKeypadRow>
        ))}
      </StyledKeypad>
    </StyledCol>
    <StyledCol sm={12}>
      <StyledSubmitButton onClick={onGuess} className={`"submit-btn`}>
        Submit Guess
      </StyledSubmitButton>
    </StyledCol>
  </>
);

export default Keypad;
