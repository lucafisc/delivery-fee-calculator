type Props = {
  type: "button" | "submit" | "reset" | undefined;
  label: string;
  tabIndex?: number;
};

export default function PrimaryButton({ type, label, tabIndex }: Props) {
  return (
    <button
      className="bg-white text-black rounded-full text-3xl w-48 mt-24 cursor-pointer p-2 transition-all hover:bg-orange-300 active:scale-95 active:bg-orange-500 active:text-white"
      type={type}
      aria-label={label}
      tabIndex={tabIndex}
    >
      {label}
    </button>
  );
}
