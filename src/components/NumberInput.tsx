type Props = {
  testId: string;
  label: string;
  decoration?: string;
  tabIndex?: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  changeHandle: (
    newValue: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => void;
};

export default function NumberInput({
  testId,
  label,
  decoration,
  tabIndex,
  value,
  setValue,
  changeHandle,
}: Props) {
  return (
    <fieldset className="mt-8 flex flex-col">
      <label  htmlFor={label}>
        {label}
      </label>
      <div className="flex items-center">
        <input
          id={label}
          data-test-id={testId}
          type="text"
          tabIndex={tabIndex}
          value={value}
          onChange={(event) => changeHandle(event.target.value, setValue)}
          className="w-10/12 rounded-full text-black font-bold p-2 px-6 mt-2 hover:bg-orange-200 transition-all text-right"
        ></input>
        <span className="pl-6 text-3xl" aria-hidden="true">
          {decoration}
        </span>
      </div>
    </fieldset>
  );
}
