import { useEffect, useState } from "react";
import io from "socket.io-client";



export const getSocket = () => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);
  return socket;
};

export const sendChanges = (socket, quill) => {
  useEffect(() => {
    if (socket == null || quill == null) {
      return;
    }
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);
};

export const receiveChanges = (socket, quill) => {
  useEffect(() => {
    if (socket == null || quill == null) {
      return;
    }
    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);
    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);
};

export const saveChanges = (socket, quill) => {
  useEffect(() => {
    if (socket == null || quill == null) {
      return;
    }
    const interval = setInterval(()=>{
      socket.emit('save-changes', quill.getContents())
    }, 2000)
    return ()=> clearInterval(interval)
  }, [socket, quill]);
}

export const getDocument = (socket, quill, documentId) => {
  useEffect(()=>{
    if (socket == null || quill == null) {
      return;
    }
    socket.once('load-document', (document) => {
      quill.setContents(document);
      quill.enable();
    })
    socket.emit('get-document', documentId);
  },[quill, socket, documentId]);
}
