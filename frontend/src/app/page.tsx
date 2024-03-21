"use client";
import React, { useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import axios from "axios";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function Submitcode() {
  const [curstate, setCurstate] = useState<string>("idle");
  const router = useRouter();

  async function handleForm(e: React.SyntheticEvent) {
    e.preventDefault();

    const formData: {
      username: string;
      language: string;
      code: string;
      input: string;
    } = {
      username: (e.target as HTMLFormElement).username.value,
      language: (e.target as HTMLFormElement).language.value,
      code: (e.target as HTMLFormElement).code.value,
      input: (e.target as HTMLFormElement).input.value,
    };

    if (
      formData?.username?.trim()?.toString() != "" &&
      formData?.code?.trim()?.toString() != ""
    ) {
      try {
        setCurstate("busy");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_PATH}/codesub`,
          formData
        );

        // Reset the form
        (e.target as HTMLFormElement).reset();

        // Redirect to dashboard
        router.push("/submissions");
      } catch (error) {
        console.error("Error submitting code:", error);
        setCurstate("idle");
      }
    }
  }

  return (
    <div className="">
      <form onSubmit={handleForm}>
        <Card
          key="1"
          className="w-[calc(100%-20px*2)] max-w-3xl mx-5 md:mx-auto my-10 shadow-[0_0_5px_3px_rgba(0,0,0,0.05),0_0_1px_1px_rgba(0,0,0,0.05)]"
        >
          <CardHeader>
            <CardTitle>Submit Your Code</CardTitle>
            <CardDescription>
              Enter your information and code to submit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Code Language</Label>
              <Select name="language">
                <SelectTrigger className="">
                  <SelectValue placeholder="Select a Preferred Code Language " />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="js">JavaScript</SelectItem>
                    <SelectItem value="py">Python</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Source Code</Label>
              <Textarea
                className="min-h-[200px]"
                id="code"
                name="code"
                placeholder="Enter your source code"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stdin">Standard Input (stdin)</Label>
              <Textarea
                className="min-h-[100px]"
                id="stdin"
                name="input"
                placeholder="Enter your standard input"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={curstate === "busy" ? true : false}
              className="ml-auto"
            >
              {curstate === "busy" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
      <div className=" text-slate-900 text-md text-center my-2">
        <Link href="/submissions" target="_blank">
          Go to Dashboard {`->`}
        </Link>
      </div>
    </div>
  );
}

export default Submitcode;
