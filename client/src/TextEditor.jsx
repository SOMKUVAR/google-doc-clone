import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { getSocket, sendChanges, receiveChanges, saveChanges, getDocument } from "./hooks";
import { TOOLBAR_OPTIONS } from "./constant";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./style.css";

export default function TextEditor() {
  const {id: documentId} = useParams();
  const socket = getSocket();
  const [quill, setQuill] = useState();
  

  sendChanges(socket, quill);
  receiveChanges(socket, quill);
  saveChanges(socket, quill);
  getDocument(socket, quill, documentId);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHtml = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const quil = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    setQuill(quil);
    quil.disable();
    quil.setText('Loading...')
  }, []);

  return <div id="container" ref={wrapperRef}></div>;
}
