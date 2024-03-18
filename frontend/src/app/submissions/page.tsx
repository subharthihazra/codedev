import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

function Submissions() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Input</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Output</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">amyscript</TableCell>
            <TableCell>JavaScript</TableCell>
            <TableCell>const x = 10;</TableCell>
            <TableCell>2 minutes ago</TableCell>
            <TableCell>Executed</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">scripter23</TableCell>
            <TableCell>TypeScript</TableCell>
            <TableCell>console.log('Hello, world!');</TableCell>
            <TableCell>5 minutes ago</TableCell>
            <TableCell>Hello, world!</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">codelover</TableCell>
            <TableCell>Python</TableCell>
            <TableCell>print('Python is cool!')</TableCell>
            <TableCell>10 minutes ago</TableCell>
            <TableCell>Python is cool!</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">dev_ninja</TableCell>
            <TableCell>Go</TableCell>
            <TableCell>fmt.Println("Hello, world!")</TableCell>
            <TableCell>15 minutes ago</TableCell>
            <TableCell>Hello, world!</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">code_master</TableCell>
            <TableCell>JavaScript</TableCell>
            <TableCell>console.log('Testing');</TableCell>
            <TableCell>20 minutes ago</TableCell>
            <TableCell>Testing</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Submissions;
