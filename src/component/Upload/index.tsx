import { useRef } from "react";
import React from "react";
import { useEffect } from "react";
import { postUploadFile } from "@/services/api";

type UploadSuccessCallback = {
  ext: string;
  file_name: string;
  file_path: string;
  host_file_path: string;
};
interface Props {
  uploadSuccessCallback?: (args: UploadSuccessCallback) => void;
}

const index: React.FC<Props> = (props) => {
  const { uploadSuccessCallback } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { children } = props;
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.onchange = (e) => {
        if (inputRef.current?.files) {
          postUploadFile({
            save_path: "/public/upload/user_images/",
            is_rename: 1,
            file: inputRef.current.files[0],
          }).then((res) => {
            console.log(res);
            if (formRef.current) {
              formRef.current.reset();
            }
            if (res) {
              uploadSuccessCallback && uploadSuccessCallback(res.data);
            }
          });
        }
      };
    }
  }, []);
  return (
    <div>
      <div onClick={handleClick}>{children}</div>
      <form ref={formRef}>
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          accept="image/*"
        />
      </form>
    </div>
  );
};
export default index;
