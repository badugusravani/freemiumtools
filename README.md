# FreemiumTools.com

A comprehensive platform offering free online tools for various tasks, built with React, TypeScript, and Tailwind CSS.

## Changelog

### [Latest] - 2024-01-21
- Updated sidebar behavior:
  - Shows only category names by default
  - Displays all tools of a category only when a tool from that category is opened
  - Other categories remain collapsed showing only names
- Fixed TypeScript linter errors in image tool components
- Added proper type definitions for tool props
- Improved mobile responsiveness

### [1.0.0] - Initial Release
- Basic project structure and setup
- Implemented core features:
  - Responsive layout with sidebar navigation
  - Dark mode support
  - Category-based tool organization
  - Initial tool implementations

## Features

### Navigation & Layout
- **Smart Sidebar Navigation**
  - Shows only category names by default
  - When a tool is opened, displays all tools from that category while keeping other categories collapsed
  - Responsive design with mobile-friendly navigation
  - Dark mode support

### Categories
Currently implemented categories:
- Mathematics (20 tools)
- Colors (5 tools)
- Text and Lists (5 tools)
- Numbers (5 tools)
- Date and Time (5 tools)
- Images (21 tools)
- Randomness (5 tools)
- Files (5 tools)
- Programming (5 tools)
- Videos (1 tool)

### Implemented Tools
- Basic Calculator
- Image Resizer
- Image Cropper
- Image Exposure

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Build Tool**: Vite
- **State Management**: React Context (for auth and theme)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/freemiumtools.git
cd freemiumtools
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
# or
yarn build
```

## Project Structure
```
src/
├── components/         # Reusable components
│   ├── ImageTools/    # Image-related tools
│   ├── MathTools/     # Math-related tools
│   └── ...
├── contexts/          # React contexts
├── data/             # Static data and configurations
├── pages/            # Page components
├── types/            # TypeScript type definitions
└── App.tsx           # Main application component
```

## Features in Development
- User authentication
- Tool favorites/bookmarks
- Search functionality
- Analytics integration
- Social sharing
- Rate limiting
- Caching strategy
- Tool usage statistics
- User feedback system

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
- Email: contact@freemiumtools.com
- Twitter: [@freemiumtools](https://twitter.com/freemiumtools)
- GitHub: [freemiumtools](https://github.com/freemiumtools) 