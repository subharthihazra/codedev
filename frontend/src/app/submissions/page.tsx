"use client";
import React, { useEffect, useState } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
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
function formatRelativeTime(timestamp: any) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = Date.now() - new Date(timestamp).getTime();
  // console.log(elapsed);

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return "aprox. " + Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return "aprox. " + Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return "aprox. " + Math.round(elapsed / msPerYear) + " years ago";
  }
}

function Submissions() {
  const [subdata, setSubdata] = useState<CodeSubs[]>([]);
  const [curState, setCurState] = useState<string>("loading");

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

  return (
    <div>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Sl</TableHead>
            <TableHead>Uid</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Lang</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Input</TableHead>
            <TableHead>Submitted on</TableHead>
            <TableHead>Output</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {curState === "idle" &&
            subdata.length != 0 &&
            subdata.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{row.sl}</TableCell>
                <TableCell>{row.uid}</TableCell>
                <TableCell>{row.sl}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.language}</TableCell>
                <TableCell>
                  {row.code.length > 100
                    ? `${row.code?.substring(0, 99)} ...`
                    : row.code}
                </TableCell>
                <TableCell>{row.input !== null && row.input}</TableCell>
                <TableCell>{row.output !== null && row.output}</TableCell>
                <TableCell>
                  {formatRelativeTime(row.timestamp)?.toString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {curState === "idle" && subdata.length === 0 && (
        <div className="mt-10 text-center">No submission yet!</div>
      )}
      {curState === "loading" && (
        <div className="mt-10 text-center">Loading ...</div>
      )}
      {curState === "error" && (
        <div className="mt-10 text-center">Something went wrong!</div>
      )}
    </div>
  );
}

export default Submissions;
