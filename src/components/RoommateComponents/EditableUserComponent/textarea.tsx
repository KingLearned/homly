// React.FC<UserInfoProps>;
import React from "react";

interface TextAreaProps {
  icon?: any;
  title?: string;
  setEdit: boolean;
  body: any;
  onchange: any;
}

const Textarea: React.FC<TextAreaProps> = ({
  icon,
  title,
  setEdit,
  body,
  onchange,
}) => {
  return (
    <div className="flex flex-col gap-2  p-3">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="font-bold text-lg border-b first-letter:capitalize">
          {title}
        </h2>
      </div>

      {!setEdit ? (
        <p className="first-letter:capitalize">{body}</p>
      ) : (
        <textarea
          onChange={onchange}
          value={body}
          className="bg-transparent outline-none h-[200px] p-3 border border-white"
        ></textarea>
      )}
    </div>
  );
};

export default Textarea;
