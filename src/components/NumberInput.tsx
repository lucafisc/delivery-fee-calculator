
type Props = {
    label: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    changeHandle: (newValue: string, setValue : React.Dispatch<React.SetStateAction<string>>) => void;
};


export default function NumberInput({ label, value, setValue, changeHandle } : Props) {
    return (
        <>
            <label
            htmlFor={label}
            >{label}</label>
            <input
                id={label}
                type="text"
                value={value}
                onChange={(event) => changeHandle(event.target.value, setValue)}
            ></input>
        </>
    )
}