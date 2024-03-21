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
import CodeViewer from "@/components/Codeviewer";
import formatRelativeTime from "@/utils/formatRelativeTime";

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

  function handleView(data: CodeSubs | null) {
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
          Submit your Code {`->`}
        </Link>
      </div>
    </>
  );
}

export default Submissions;
