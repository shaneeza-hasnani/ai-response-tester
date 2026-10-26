# AI Response Tester

A small API-backed web application built with TypeScript, Node.js, and Express to explore automated end-to-end testing with Playwright.

## What I Built

A browser interface that submits questions to a simulated AI response API and displays the results.

## Testing Coverage

Automated tests using Playwright across Chromium, Firefox, and WebKit.

- Valid user input
- Empty input validation
- Simulated HTTP 500 API failures
- Slow API responses and loading states

## Technologies

TypeScript, Node.js, Express, Playwright

## What I Learned

- Writing end-to-end browser tests
- Using assertions to verify application behavior
- Mocking API responses to simulate failures
- Testing loading states and error handling
- Running tests across multiple browser engines
- Troubleshooting test environment issues

## Running Locally

Install dependencies:

```bash
npm install
npx playwright install
```

Start the application:

```bash
npx tsx src/server.ts
```

In a second terminal, run:

```bash
npx playwright test tests/ai-response.spec.ts
```

Open the HTML report:

```bash
npx playwright show-report
```

The application uses a simulated AI response rather than a live language model API.