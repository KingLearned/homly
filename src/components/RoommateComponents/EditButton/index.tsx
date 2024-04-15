import { BiPencil } from "react-icons/bi";

type EditButtonProps = {
  onclick: () => void;
};
const EditButton: React.FC<EditButtonProps> = ({ onclick }) => {
  return (
    <button
      type="button"
      onClick={onclick}
      className={
        "flex items-center gap-2 cursor-pointer px-3 py-1 border rounded-3xl hover:text-underline hover:underline"
      }
    >
      <BiPencil />
      Edit
    </button>
  );
};

export default EditButton;
