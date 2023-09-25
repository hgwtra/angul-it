# Captcha Challenge Application

This application is designed to challenge users with captcha-based tasks. Users can verify themselves as human by doing the captchas followed by instructions showed on screen.
## Features

### 1. Captcha Challenges

- **CaptchaComponent**: 3-level captcha: math, text and image.
- Users have the flexibility to revisit previous stages of the challenge.

### 2. Form Validation

- Ensures users cannot move on to subsequent challenges without adequately completing the current one.

### 3. State Management

- Records user progression across challenges meticulously.
- Even if a user refreshes the page, their progress remains saved.

### 4. Results Page

- After all challenges are completed, users are seamlessly redirected to a results page.
- The results page showcases the outcome of the challenges and provides an option for users to take on a new challenge.

## Getting Started

1. **Clone the Repo**: Start by cloning the repository to your local machine.

2. **Installation**: Once you've cloned the repo, navigate to the project directory and run the following commands: `npm install`

3. **Start the Development Server**: Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
