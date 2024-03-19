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

function Home() {
  async function handleForm(e: React.SyntheticEvent<EventTarget>) {
    e.preventDefault();

    const formData: any = new FormData(e.target as HTMLFormElement);

    if (
      formData?.username?.trim.toString() != "" &&
      formData?.code?.trim().toString() != ""
    ) {
      try {
        const response = await axios.post("/api/submit-code", formData);
        console.log("Code submission successful:", response.data);

        // Reset the form
        (e.target as HTMLFormElement).reset();
      } catch (error) {
        console.error("Error submitting code:", error);
      }
    }
  }
  return (
    <div className="">
      <Card
        key="1"
        className="w-[calc(100%-20px*2)] max-w-3xl mx-5 md:mx-auto my-10"
      >
        <CardHeader>
          <CardTitle>Submit Your Code</CardTitle>
          <CardDescription>
            Enter your information and code to submit
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleForm}>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Code Language</Label>
              <Select>
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
                placeholder="Enter your source code"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stdin">Standard Input (stdin)</Label>
              <Textarea
                className="min-h-[100px]"
                id="stdin"
                placeholder="Enter your standard input"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Home;
