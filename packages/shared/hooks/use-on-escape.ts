import { KeyboardEvent, useCallback, useEffect } from "react";

const useOnEscape = (action: () => void): void => {
    const onEscape = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Escape") {
                action();
            }
        },
        [action]
    );
    useEffect(() => {
        window?.addEventListener("keydown", onEscape, false);
        return () => {
            window?.removeEventListener("keydown", onEscape, false);
        };
    }, [onEscape]);
};

export default useOnEscape;
