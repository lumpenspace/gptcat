# my-katex-app

This is a KaTeX app that allows you to render formulas on webpages.

## Installation

To install the app, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/my-katex-app.git`
2. Navigate to the project directory: `cd my-katex-app`
3. Install the dependencies: `npm install`

## Usage

To use the app, follow these steps:

1. Build the app: `npm run build`
2. Start the app: `npm start`
3. Open a webpage in your browser.
4. The body of the webpage will be replaced with a rendered formula.

## Configuration

The app can be configured in the `src/index.ts` file. You can modify the `startApp` function to customize the app's behavior.

## Fonts

The necessary fonts required by KaTeX should be placed in the `src/fonts` directory. Make sure to include all the required font files.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

Please note that the `src/contentScript.ts` file is intentionally left blank. You need to add the necessary code to swap the body with a rendered formula in the `swapBodyWithRenderedFormula` function.

For more information on how to use KaTeX, refer to the [KaTeX documentation](https://katex.org/docs/node).
