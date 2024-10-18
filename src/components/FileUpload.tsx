// "use client";

// import { uploadToS3 } from "@/lib/s3";
// import { useMutation } from "@tanstack/react-query";
// import { Inbox, Loader2 } from "lucide-react";
// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// const FileUpload = () => {
//   const router = useRouter();
//   const [uploading, setUploading] = useState(false);
//   const { mutate, isLoading } = useMutation({
//     mutationFn: async ({
//       file_key,
//       file_name,
//     }: {
//       file_key: string;
//       file_name: string;
//     }) => {
//       const response = await axios.post("/api/create-chat", {
//         file_key,
//         file_name,
//       });

//       return response.data;
//     },
//   });

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: { "application/pdf": [".pdf"] },
//     maxFiles: 1,
//     onDrop: async (acceptedFiles) => {
//       console.log(acceptedFiles);
//       const file = acceptedFiles[0];
//       if (file.size > 10 * 1024 * 1024) {
//         toast.error("File too large");
//         return;
//       }
//       try {
//         setUploading(true);
//         const data = await uploadToS3(file);
//         if (!data?.file_key || !data?.file_name) {
//           toast.error("Something went wrong");
//           return;
//         }
//         mutate(data, {
//           onSuccess: ({ chat_id }) => {
//             // toast.success(data.messages);
//             console.log(chat_id);
//             toast.success("Chat created!");
//             // window.location.href = `/chat/${chat_id}`;
//             router.push(`/chat/${chat_id}`);
//           },
//           onError: (err) => {
//             toast.error("Something went wrong");
//             console.log(err);
//           },
//         });
//         console.log(data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setUploading(false);
//       }
//     },
//   });
//   return (
//     <div className="p-2 bg-white rounded-xl">
//       <div
//         {...getRootProps({
//           className:
//             "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
//         })}
//       >
//         <input {...getInputProps} />
//         {uploading || isLoading ? (
//           <>
//             {
//               //   loading state
//             }
//             <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
//             <p className="mt-2 text-sm text-slate-400">Working on your..</p>
//           </>
//         ) : (
//           <>
//             <Inbox className="w-10 h-10 text-blue-500" />
//             <p className="mt-2 text-sm text-slate-40"> Drop PDF here</p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileUpload;
"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import { Inbox, Loader2 } from "lucide-react";
import { uploadToS3 } from "@/lib/s3";

const FileUpload = () => {
  const router = useRouter();
  const [uploadState, setUploadState] = useState("idle");
  const [loadingMessage, setLoadingMessage] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
    onSuccess: ({ chat_id }) => {
      toast.success("Chat created!");
      router.push(`/chat/${chat_id}`);
    },
    onError: (err) => {
      toast.error("Something went wrong");
      console.error(err);
      setUploadState("idle");
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large");
        return;
      }

      try {
        setUploadState("uploading");
        const data = await uploadToS3(file);
        if (!data?.file_key || !data?.file_name) {
          throw new Error("Upload failed");
        }
        setUploadState("processing");
        mutate(data);
      } catch (error) {
        console.error(error);
        toast.error("Upload failed");
        setUploadState("idle");
      }
    },
    [mutate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (uploadState === "uploading") {
      setLoadingMessage("Uploading...");
      timer = setTimeout(() => setUploadState("processing"), 3000);
    } else if (uploadState === "processing") {
      setLoadingMessage("Processing your PDF...");
      timer = setTimeout(() => setUploadState("finishing"), 3000);
    } else if (uploadState === "finishing") {
      setLoadingMessage("Getting things ready...");
    }
    return () => clearTimeout(timer);
  }, [uploadState]);

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className: `border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col
            ${isDragActive ? "border-blue-500" : "border-gray-300"}`,
        })}
      >
        <input {...getInputProps()} />
        {uploadState !== "idle" || isLoading ? (
          <>
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">{loadingMessage}</p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">
              {isDragActive
                ? "Drop the PDF here"
                : "Drop PDF here or click to select"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
