"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

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

function formatRelativeTime(timestamp: string) {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = Date.now() - new Date(timestamp).getTime();
  // console.log(elapsed);

  if (elapsed < msPerMinute) {
    return (
      Math.round(elapsed / 1000) +
      " second" +
      (Math.round(elapsed / 1000) === 1 ? "" : "s") +
      " ago"
    );
  } else if (elapsed < msPerHour) {
    return (
      Math.round(elapsed / msPerMinute) +
      " minute" +
      (Math.round(elapsed / msPerMinute) === 1 ? "" : "s") +
      " ago"
    );
  } else if (elapsed < msPerDay) {
    return (
      Math.round(elapsed / msPerHour) +
      " hour" +
      (Math.round(elapsed / msPerHour) === 1 ? "" : "s") +
      " ago"
    );
  } else if (elapsed < msPerMonth) {
    return (
      "aprox. " +
      Math.round(elapsed / msPerDay) +
      " day" +
      (Math.round(elapsed / msPerDay) === 1 ? "" : "s") +
      " ago"
    );
  } else if (elapsed < msPerYear) {
    return (
      "aprox. " +
      Math.round(elapsed / msPerMonth) +
      " month" +
      (Math.round(elapsed / msPerMonth) === 1 ? "" : "s") +
      " ago"
    );
  } else {
    return (
      "aprox. " +
      Math.round(elapsed / msPerYear) +
      " year" +
      (Math.round(elapsed / msPerYear) === 1 ? "" : "s") +
      " ago"
    );
  }
}

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
              <DialogTitle>{data.username}</DialogTitle>
              <DialogDescription
                className="text-black flex flex-col w-full overflow-auto max-h-[calc(100vh-60px*2)] p-1"
                asChild
              >
                <div>
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

function Submissions() {
  const [subdata, setSubdata] = useState<CodeSubs[]>([]);
  const [curState, setCurState] = useState<string>("loading");
  const dialogTrigger = useRef<HTMLButtonElement>(null);
  const [dialogData, setDialogData] = useState<CodeSubs | null>(null);

  useEffect(function () {
    async function getSubdatas() {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_PATH}/getsubs`
        );
        // Assuming the response contains JSON data
        // console.log(data);
        if (data?.msg === "success" && data.data) {
          setSubdata(data.data);
          setCurState("idle");
        }
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setCurState("error");
      }
    }
    getSubdatas();
  }, []);

  function handleView(data: any) {
    setDialogData(data);
    dialogTrigger.current && dialogTrigger.current.click();
  }

  return (
    <>
      <div className="font-mono">
        <Table className=" bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>Uid</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Lang</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Input</TableHead>
              <TableHead>Output</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {curState === "loading" &&
              Array.from(Array(5).keys()).map((each, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[90px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[350px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[300px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[145px]" />
                  </TableCell>
                </TableRow>
              ))}
            {curState === "idle" &&
              subdata.length != 0 &&
              subdata.map((row, i) => (
                <TableRow key={i} onClick={() => handleView(row)}>
                  {/* <TableCell className="font-medium">{row.sl}</TableCell> */}
                  <TableCell>
                    <span className=" bg-slate-200 px-[5px] py-[2px] rounded-lg">
                      {row.uid}
                    </span>
                  </TableCell>
                  <TableCell>
                    {" "}
                    {row.username.length > 15
                      ? `${row.username?.substring(0, 14)}...`
                      : row.username}
                  </TableCell>
                  <TableCell>
                    {langMap[row.language as keyof LangMap]
                      ? langMap[row.language as keyof LangMap]
                      : row.language}
                  </TableCell>
                  <TableCell>
                    {row.code.length > 100
                      ? `${row.code?.substring(0, 99)} ...`
                      : row.code}
                  </TableCell>
                  <TableCell>
                    {row.input !== null && row.input.length > 100
                      ? `${row.input?.substring(0, 99)} ...`
                      : row.input}
                  </TableCell>
                  <TableCell>
                    {row.output !== null && row.output.length > 100
                      ? `${row.output?.substring(0, 99)} ...`
                      : row.output}
                  </TableCell>
                  <TableCell className=" min-w-[145px]">
                    {formatRelativeTime(row.timestamp)?.toString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {curState === "idle" && subdata.length === 0 && (
          <div className="mt-10 text-center">No submission yet!</div>
        )}

        {curState === "error" && (
          <div className="mt-10 text-center">Something went wrong!</div>
        )}
        <CodeViewer ref={dialogTrigger} data={dialogData} />
      </div>
      <div className=" text-slate-900 text-md text-center my-2">
        <Link href="/" target="_blank">
          Go to Code Submissions {`->`}
        </Link>
      </div>
    </>
  );
}

export default Submissions;
