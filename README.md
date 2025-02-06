# Coffee Trainer API

A comprehensive coffee training application that helps baristas learn about drinks, recipes, and coffee knowledge. Visit [meekanddev.github.io](https://meekanddev.github.io) to see the live application.

## Features

- RESTful API for coffee drinks and recipes
- SQLite database for simple deployment
- Static file serving for images and documentation
- Mobile-friendly interface

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The server will start on port 8000 by default.

## API Endpoints

- GET `/api/drinks` - List all drinks
- GET `/api/drinks/:id` - Get a specific drink
- POST `/api/drinks` - Create a new drink

## Deployment

This application is configured for easy deployment on Render.com and GitHub Pages.
