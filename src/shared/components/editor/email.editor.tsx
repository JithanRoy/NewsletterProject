'use client';
import EmailEditor, {EditorRef, EmailEditorProps} from "react-email-editor";
import React, {useEffect, useRef, useState} from 'react';
import {useClerk} from "@clerk/nextjs";
import {Button} from "@nextui-org/react";
import { DefaultJsonData } from "../../../assets/mails/default";
import { useRouter } from "next/navigation";
import {saveEmail} from "../../../actions/save.email";
import toast from "react-hot-toast";
import {GetEmailDetails} from "../../../actions/get-email-details";

const Emaileditor = ({ subjectTitle }: { subjectTitle: string }) => {
  const [loading, setLoading] = useState(true);
  const [jsonData, setJsonData] = useState<any | null>(DefaultJsonData);
  const { user } = useClerk();
  const emailEditorRef = useRef<EditorRef>(null);
  const history = useRouter();

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml(async (data) => {
      const { design, html } = data;
      setJsonData(design);
    });
  };

  useEffect(() => {
    getEmailDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onReady: EmailEditorProps["onReady"] = () => {
    const unlayer: any = emailEditorRef.current?.editor;
    unlayer.loadDesign(jsonData);
  };

  const saveDraft = async () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (data) => {
      const { design } = data;
      await saveEmail({
        title: subjectTitle,
        content: JSON.stringify(design),
        newsLetterOwnerId: user?.id!,
      })
        .then((res: any) => {
            toast.success("draft saved");
            history.push("/dashboard/write");
      });
    });
  };

  const getEmailDetails = async () => {
    await GetEmailDetails({
      title: subjectTitle,
      newsLetterOwnerId: user?.id!,
    }).then((res: any) => {
      if (res) {
        setJsonData(JSON.parse(res?.content));
      }
      setLoading(false);
    });
  };


  return (
    <>
      {!loading && (
        <div className="w-full h-[90vh] relative">
          <EmailEditor
            minHeight={"80vh"}
            ref={emailEditorRef}
            onReady={onReady}
          />
          <div className="absolute bottom-0 flex items-center justify-end gap-4 right-0 w-full border-t p-3">
            <Button
              className="bg-primary-400 py-3 px-4 text-white cursor-pointer flex items-center gap-1 border border-[#00000048] text-lg rounded-lg"
              onClick={saveDraft}
            >
              <span className="opacity-[.7] text-white">Save Draft</span>
            </Button>
            <Button
              className="bg-primary-400 py-3 px-4 text-white cursor-pointer flex items-center gap-1 border text-lg rounded-lg"
              onClick={exportHtml}
            >
              <span>Send</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Emaileditor;
