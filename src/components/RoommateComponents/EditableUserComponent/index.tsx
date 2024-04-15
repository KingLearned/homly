import { useDispatch, useSelector } from "react-redux";
import { enableInptField, setInputValue } from "@/app/redux/room_mate/index";
import { FieldType } from "@/app/types/index";
import EditButton from "../EditButton";
import { getUser } from "@/app/shared";

interface UserInfoProps {
  user_type: string | undefined;
  ownerId: string;
}

export const EditableUserComponent: React.FC<UserInfoProps> = ({
  user_type,
  ownerId,
}) => {
  const dispatch = useDispatch();
  const currentUser = getUser();

  interface RootState {
    room_mate: {
      data: FieldType[];
    };
  }
  // Input Fields
  const { data } = useSelector((action: RootState) => action.room_mate);

  //====== Enable And Disable Input Field Functionality======
  const handleEdit = (label: string) => dispatch(enableInptField(label));
  const disableEdit = (label: string) => dispatch(enableInptField(label));

  // =============Get User Input=============
  const handleChange = (label: string, value: string) => {
    dispatch(setInputValue({ label, value }));
  };

  return (
    <div className="flex flex-col gap-3 mt-10 mb-5">
      {data.map((field: FieldType, index: number) => (
        <div key={index}>
          <div className="w-full capitalize">
            <div className="w-full flex flex-col">
              <div>
                <label htmlFor="" className="text-lg font-bold">
                  {field.label}:
                </label>
              </div>
              <div className="flex justify-between items-center gap-1">
                <input
                  id="inputField"
                  type="text"
                  value={field.value}
                  disabled={field.disabled}
                  autoFocus
                  onBlur={() => disableEdit(field.label)}
                  onChange={(event) =>
                    handleChange(field.label, event.target.value)
                  }
                  className={
                    field.disabled == false
                      ? "font-light focus:outline-0 py-2 border-b px-3 border-sky-400"
                      : "capitalize mt-1 w-full py-2 outline-none"
                  }
                />
                {currentUser &&
                currentUser.HMId == ownerId &&
                user_type &&
                user_type == "RO" ? (
                  <EditButton onclick={() => handleEdit(field.label)} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
