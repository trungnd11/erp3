import React, { useState, forwardRef, useImperativeHandle } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import CustomUploadAdapterPlugin from "./CustomUploadAdapterPlugin";

// const defaultToolbar = [
//   'heading',
//   '|',
//   'italic',
//   'bold',
//   'link',
//   'bulletedList',
//   'numberedList',
//   '|',
//   'outdent',
//   'indent',
//   '|',
//   'imageUpload',
//   'imageInsert',
//   'blockQuote',
//   'insertTable',
//   'mediaEmbed',
//   '|',
//   'fontFamily',
//   'fontSize',
//   'fontColor',
//   'fontBackgroundColor',
//   'highlight',
//   '|',
//   'undo',
//   'redo',
//   'code'
// ]

const defaultToolbar = [
  "heading",
  "|",
  "italic",
  "bold",
  "link",
  "bulletedList",
  "numberedList",
  "|",
  "outdent",
  "indent",
  "|",
  "imageInsert",
  "blockQuote",
  "insertTable",
  "mediaEmbed",
  "|",
  "fontFamily",
  "|",
  "undo",
  "redo",
];

function CustomEditor(props, ref) {
  const {initData} = props;
  const [data, setData] = useState(initData || '');

  useImperativeHandle(
    ref,
    () => ({
      data,
      setData,
    }), [data]
  );
  return (
    <CKEditor
      editor={Editor}
      data={data}
      config={{
        toolbar: defaultToolbar,
        mention: {
          feeds: [
            {
              marker: "@",
              feed: [
                "@Barney",
                "@Lily",
                "@Marry Ann",
                "@Marshall",
                "@Robin",
                "@Ted",
              ],
              minimumCharacters: 1,
            },
          ],
        },
        extraPlugins: [CustomUploadAdapterPlugin],
      }}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
      }}
      onChange={(e, editor) => {
        setData(editor.getData());
      }}
    ></CKEditor>
  );
}

export default forwardRef(CustomEditor);
