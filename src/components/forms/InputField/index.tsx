interface InputInterface {
  icon: any;
  type: string;
  name: string;
  value?: string;
  placeholder: string;
}

const InputField = ({
  data,
  onchange,
}: {
  data: InputInterface;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex items-center gap-2">
        <data.icon />
        <p className="capitalize">{data.name}</p>
      </div>
      <input
        type={data.type}
        placeholder={data.placeholder}
        onChange={onchange}
        value={data.value}
        className="border py-2 px-3 rounded focus:outline-green"
      />
    </div>
  );
};

export default InputField;
