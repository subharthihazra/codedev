# CodeDev Learn

### It's a platform to submit code and get outputof submissions in the Dashboard

Code Submit Link (Page 1): [https://codedev-learn.vercel.app](https://codedev-learn.vercel.app)

Code Submissions Dashboard Link (Page 2): [https://codedev-learn.vercel.app/submissions](https://codedev-learn.vercel.app/submissions)

- [x] Main Task
- [x] Bonus Task 1 - Use Redis Cache to reduce DB reads
- [x] Bonus Task 2 - Use API (Judge0) to obtain output of code and store

### System Design Overview:
![system Design Overview](https://github.com/subharthihazra/codedev/assets/92659226/63cb303f-4107-498c-8190-d9aa6949e207)

### Key Highlights:
- Utilized MySQL for storing uploaded code, user input, username, programming language etc.
  
- Integrated Judge0 for executing code and retrieving output.Here a token from Judge0 is used to fetch output by requesting repeatedly until its ready, which is then updated in the MySQL database and Redis Cache is also emptied.
  
- Used Redis for faster data serving through caching, with periodic cleaning to maintain system efficiency. It reduced the loading time ~40% ( while moderate number of datas in DB ).

- Used NEXT.JS and ShadCN UI in frontend.

- Used Typescript in both backend and frontend for better consistency, maintainability, safety.
