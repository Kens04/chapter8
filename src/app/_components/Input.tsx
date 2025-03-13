interface InputProps {
  type: string;
  id: string;
  name: string;
  value: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  type,
  id,
  name,
  value,
  disabled,
  onChange,
}) => {
  return (
    <input
      className="border border-slate-400 w-full rounded-md p-3"
      type={type}
      id={id}
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  );
};