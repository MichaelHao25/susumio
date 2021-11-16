import { MutableRefObject, useRef } from "react";
import React from "react";
import { useEffect } from "react";
import { postUploadFile } from "@/services/api";

type UploadSuccessCallback = {
  /**
   * 图片的扩展名
   */
  ext: string;
  /**
   * 图片的文件名
   */
  file_name: string;
  /**
   * 图片的文件路径
   */
  file_path: string;
  /**
   * 图片的完整访问地址
   */
  host_file_path: string;
};
interface Props {
  /**
   * 图片上传成功后的回调函数
   */
  uploadSuccessCallback?: (args: UploadSuccessCallback) => void;
  /**
   * 手动出发上传图片的ref
   */
  onUpload?: React.RefObject<() => void>;
}

const index: React.FC<Props> = (props) => {
  const { uploadSuccessCallback, onUpload } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { children } = props;
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  useEffect(() => {
    if (onUpload) {
      onUpload.current = handleClick;
    }
  }, []);
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
