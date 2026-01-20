# Iskolar Overflow

Is a web application that allows anonymous users to ask and answer questions related to the student's academic life and experience in Campus. It provides a platform for students and faculty members to share their knowledge, experiences, and insights with each other.

## Goal

To create a safe and inclusive space for students to share their experiences and learn from each other's insights.

## Features

Core
- Posting questions ✅
- Answering questions through comments ✅
- Voting on answers ✅

Extra (Not implemented)
- Flagging inappropriate content
- Reporting abusive behavior

Future (In the future if we have time 😊)
- Admin and Moderator roles

## Technology Stack

Client
- HTML + CSS + JS (React + Vite)

Server
- NodeJS - The runtime for running JavaScript on desktop.
- Express - A minimal web framework for http utilities and middleware.
- CORS - Secure feature to manage the server resources from different origin.
- SQLite - The embedded database used for storing questions and answer.

## Server Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all questions |
| GET | `/search` | Search questions |
| GET | `/tags` | Get list of tags |
| GET | `/campuses` | Get list of campuses |
| GET | `/departments` | Get list of departments |
| GET | `/:id` | Get a specific question by ID |
| POST | `/` | Create a new question |
| POST | `/:id/comments` | Add a comment to a specific question |
| PUT | `/:id/vote` | Vote on a specific question |
| DELETE | `/:id` | Delete a specific question |
