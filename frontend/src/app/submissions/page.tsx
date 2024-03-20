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

function formatRelativeTime(timestamp: any) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = Date.now() - new Date(timestamp).getTime();
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
        <DialogContent className=" font-mono">
          {data && (
            <DialogHeader>
              <DialogTitle>{data.username}</DialogTitle>
              <DialogDescription>
                {data.uid}
                <pre>{data.code}</pre>
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
        const { data } = await axios.get("http://localhost:5000/getsubs");
        // Assuming the response contains JSON data
        console.log(data);
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
    <div className=" font-mono">
      <Table className="">
        <TableHeader>
          <TableRow>
            {/* <TableHead>Sl</TableHead> */}
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
                <TableCell>{row.uid}</TableCell>
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
  );
}

export default Submissions;
