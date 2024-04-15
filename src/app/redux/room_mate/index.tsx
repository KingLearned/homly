import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonalDetailsInputFields } from "@/app/roommate/data/index";
import { FieldType } from "@/app/types/index";

interface MyState {
  data: FieldType[];
}

const initialState: MyState = {
  data: PersonalDetailsInputFields.map((field) => ({
    name: field.name,
    label: field.label,
    value: field.value,
    disabled: true,
  })),
};

const roommateSlice = createSlice({
  name: "room_mate",
  initialState,
  reducers: {
    // Assign All the Values of every field with user data from the database
    updateFieldsFromPayload: (state, action) => {
      for (let i = 0; i < state.data.length; i++) {
        const field = state.data[i];

        if (field.name && action.payload.hasOwnProperty(field.name)) {
          field.value = action.payload[field.name] || "";
        }
      }
    },
    //=============== Enable Input Field Action===============
    enableInptField: (state, action: PayloadAction<string>) => {
      state.data = state.data.map((field) =>
        field.label === action.payload
          ? { ...field, disabled: !field.disabled }
          : field
      );
    },
    //======== Change The Value of a Single Input Field========
    setInputValue: (
      state,
      action: PayloadAction<{ label: string; value: string }>
    ) => {
      state.data = state.data.map((field) =>
        field.label === action.payload.label
          ? { ...field, value: action.payload.value }
          : field
      );
    },
  },
});

export const { updateFieldsFromPayload, enableInptField, setInputValue } =
  roommateSlice.actions;
export default roommateSlice.reducer;