
# ReContentAI

ReContentAI is a powerful web application that helps content creators repurpose their long-form videos into platform-specific short content using AI technology.

## Features

- Video upload and processing
- AI-powered content generation for multiple platforms
- Platform-specific scripts with viral titles and captions
- Maintains creator's voice and style
- Support for TikTok, YouTube Shorts, and Instagram Reels

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Express.js, Node.js
- **AI Integration**: Google's Gemini API
- **Database**: Drizzle ORM
- **Authentication**: Passport.js

## Getting Started

1. Clone the repository in Replit
2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables in Replit's Secrets tab:
- `GEMINI_API_KEY`: Your Google Gemini API key

4. Start the development server:
```bash
npm run dev
```

The application will be available at port 5000.

## Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
└── shared/          # Shared types and schemas
```

## API Endpoints

- `POST /api/videos/upload`: Upload a video file
- `POST /api/content/repurpose`: Generate platform-specific content
- `GET /api/videos/:id`: Get video information
- `GET /api/videos/:id/content`: Get generated content for a video

## Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT

## Support

For support, email support@recontentai.com
