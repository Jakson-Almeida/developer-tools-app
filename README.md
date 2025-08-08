# Developer Tools Mobile App

A comprehensive mobile application built with **Expo React Native** that provides essential developer tools in a single, convenient interface.

## Features

### Regex Tester
- Test regular expressions with real-time matching
- Built-in examples for common patterns (email, phone, URL, date)
- Visual feedback for valid/invalid patterns
- Match highlighting and count display

### JSON Formatter
- Format and validate JSON data
- Minify JSON for production use
- Syntax error detection and reporting
- Sample JSON examples for quick testing

### HTTP Client
- Test API endpoints with all HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Custom headers support
- Request body input for POST/PUT requests
- Response status, headers, and body display
- Request timing measurement

### Git Cheatsheet
- Comprehensive Git command reference
- Organized by categories (Getting Started, Basic Commands, Branching, etc.)
- One-tap command copying
- Pro tips and best practices

### Code Snippets
- Save and organize code snippets
- Categorize by language and purpose
- Quick access to frequently used code
- Syntax highlighting for better readability

## Tech Stack

- **Framework**: Expo React Native
- **Language**: TypeScript
- **Navigation**: Expo Router
- **UI**: React Native with custom theming
- **Icons**: FontAwesome

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jakson-Almeida/developer-tools-app.git
   cd developer-tools-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run web    # For web development
   npm run android # For Android development
   npm run ios     # For iOS development (macOS only)
   ```

4. **Open in browser**
   - Web: http://localhost:8080
   - Mobile: Scan QR code with Expo Go app

## App Structure

```
app/
├── (tabs)/
│   ├── _layout.tsx      # Tab navigation layout
│   ├── index.tsx        # Regex Tester
│   ├── json-formatter.tsx
│   ├── http-client.tsx
│   ├── git-cheatsheet.tsx
│   └── snippets.tsx
├── _layout.tsx          # Root layout
├── modal.tsx            # Modal screen
└── +html.tsx           # Web HTML configuration
```

## Use Cases

### For Developers
- **Quick API Testing**: Test endpoints without leaving your mobile device
- **Regex Validation**: Verify patterns on the go
- **JSON Processing**: Format and validate JSON data quickly
- **Git Reference**: Access Git commands without internet
- **Code Organization**: Store and retrieve code snippets

### For Students
- **Learning Tool**: Practice regex patterns and API testing
- **Reference Material**: Quick access to Git commands and code examples
- **Portfolio Project**: Showcase mobile development skills

## Development

### Adding New Features
1. Create new screen in `app/(tabs)/`
2. Add tab configuration in `app/(tabs)/_layout.tsx`
3. Implement functionality with TypeScript
4. Test on both web and mobile platforms

### Building for Production
```bash
# Build for web
npx expo export --platform web

# Build for mobile
npx expo build:android
npx expo build:ios
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Jakson Almeida**
- Email: jakson.almeida@estudante.ufjf.br
- GitHub: [@Jakson-Almeida](https://github.com/Jakson-Almeida)

## Acknowledgments

- Expo team for the amazing framework
- React Native community for the ecosystem
- FontAwesome for the beautiful icons

---

**Star this repository if you find it helpful!**
