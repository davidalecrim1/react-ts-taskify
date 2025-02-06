import { useRef } from "react";
import "./styles.css";

interface Props {
    todoDescription: string;
    setTodoDescription: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

export const InputField = ({ todoDescription, setTodoDescription, handleAdd }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <form
                className="input"
                onSubmit={(e) => {
                    handleAdd(e);
                    inputRef.current?.blur();
                }}
            >
                <input
                    type="input"
                    placeholder="Enter a Task"
                    className="input__box"
                    value={todoDescription}
                    onChange={(e) => setTodoDescription(e.target.value)}
                    ref={inputRef}
                />
                <button
                    className="input_submit"
                    type="submit">
                    Go
                </button>
            </form>
        </div>
    );
};
