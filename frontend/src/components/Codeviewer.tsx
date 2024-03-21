import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import React from "react";

interface CodeSubs {
  sl: number;
  uid: string;
  username: string;
  language: string;
  code: string;
  input: string | null;
  output: string | null;
  timestamp: string;
}

interface LangMap {
  [key: string]: string;
}

const langMap: LangMap = {
  cpp: "C++",
  java: "Java",
  js: "Javascript",
  py: "Python",
};

const CodeViewer = React.forwardRef(
  (
    { data }: { data: CodeSubs | null },
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <Dialog>
        <DialogTrigger
          ref={ref as React.LegacyRef<HTMLButtonElement>}
        ></DialogTrigger>
        <DialogContent className="flex flex-col font-mono max-w-fit">
          {data && (
            <DialogHeader>
              <DialogTitle className="text-left">{data.username}</DialogTitle>
              <DialogDescription
                className="text-black flex flex-col w-full overflow-auto max-h-[calc(100vh-60px*2)] p-1"
                asChild
              >
                <div className="text-left">
                  <div className="my-1 bg-slate-200 px-[5px] py-[2px] rounded-lg w-fit">
                    {data.uid}
                  </div>

                  <div className="my-1">
                    Language: {langMap[data.language as keyof LangMap]}
                  </div>
                  <div className="my-1">
                    {new Date(data.timestamp).toString()}
                  </div>

                  <Label className="my-1 text-lg">Code</Label>
                  <div className="w-full">
                    <pre className="rounded-lg bg-slate-100 p-2 overflow-auto">
                      {data.code}
                    </pre>
                  </div>

                  <Label className="my-1 text-lg">Standard Input (stdin)</Label>
                  <div className="w-full">
                    <pre className="rounded-lg bg-slate-100 p-2 overflow-auto">
                      {data.input}
                    </pre>
                  </div>

                  <Label className="my-1 text-lg">Generated Output</Label>
                  <div className="w-full">
                    <pre className="rounded-lg bg-slate-100 p-2 overflow-auto">
                      {data.output}
                    </pre>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);
CodeViewer.displayName = "CodeViewer";

export default CodeViewer;
