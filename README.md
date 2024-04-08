# Next.js React TypeScript RadixUI Tailwind


## Overview

This is a full-stack web application built with Next.js, TypeScript, React, Prisma, Tailwind CSS, and Radix UI. The app allows users to track issues, manage assignments, and view analytics through a dashboard built with Recharts.


## Features

- **User Authentication:** Secure login and registration system using NextAuth with Google.
- **Issue Management:** View, Create, update, and delete issues.
- **Assignment:** Assign issues to specific users.
- **Sorting and Filtering:** Easily sort and filter issues based on various criteria.
- **Pagination:** Navigate through large sets of issues efficiently.
- **Dashboard:** Visualize issue data and analytics using Recharts.


## Technologies Used

- **Frontend:**
  * Next.js
  * TypeScript
  * React
  * Tanstack
  * React hook form
  * React loading skeleton
  * Recharts
  * Tailwind CSS
  * Radix UI
- **Backend:**
  * Prisma (ORM)
- **Authentication:**
  * NextAuth with Google

## Setup

- Clone this repository to your local machine.
- In the project folder, rename `.env.example` to `.env`
- Set all the environment variables
  * You can find various examples of DATABASE_URL [here](https://www.prisma.io/docs/orm/reference/connection-urls) for `DATABASE_URL=`
  * `NEXTAUTH_URL=http://localhost:3000`
  * Run `openssl rand -base64 32` to generate a secret. for `NEXTAUTH_SECRET=`
  * You need to set up OAuth on Google Cloud Platform to get a Client ID and Secret. for `GOOGLE_CLIENT_ID=` and `GOOGLE_CLIENT_SECRET=`
- Run `npm install` to install the dependencies
- Run `npx prisma migrate dev` to generate your database tables.
- Run `npm run dev` to start the web server.
