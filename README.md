# MeChat | Realtime Chat App

<div align='center'>
<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzZtcmxvZmtzbjEzNzBmcjRndWFjdjN3MWppbHIycTh6a3l1czlpayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WjjoZKa2TAo1mTGiXQ/giphy.gif" width="300"/>
</div>

## How to use

1.  Create `.env` file with this configuration below...
2.  For the backend you can clone [MeChat Server](https://github.com/sgitwhyd/mechat-server)

```
	NEXT_PUBLIC_BE_BASE_URL=
	NEXT_PUBLIC_PUSHER_APIKEY=
	NEXT_PUBLIC_PUSHER_CLUSTER=
```

3. Install dependencies

```
yarn install
```

4. Run the app

`yarn dev`

## Scripts

The table below provides names and descriptions of the npm scripts available in this project.

Each script is run using `yarn <script-name>`. For example: `yarn dev`.

| Name            | Description                                                                                                                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prepare`       | The [`prepare` life cycle script](https://docs.npmjs.com/cli/v7/using-npm/scripts#life-cycle-scripts) is used to set up Git pre-commit hooks when people install dependencies, eg. using `npm install`. This script should not be run manually. |
| `test`          | Runs tests                                                                                                                                                                                                                                      |
| `dev`           | Runs the Next.js development server.                                                                                                                                                                                                            |
| `build`         | Generates a production build.                                                                                                                                                                                                                   |
| `start`         | Runs the Next.js production server built using `build` script.                                                                                                                                                                                  |
| `lint`          | Runs [ESLint](https://eslint.org/) to catch linting errors in the source code.                                                                                                                                                                  |
| `format`        | Formats all source code in the project.                                                                                                                                                                                                         |
| `format:check`  | Checks the formatting of all code in the project.                                                                                                                                                                                               |
| `deploy:vercel` | Deploy a preview deployment to Vercel                                                                                                                                                                                                           |

## Technologies

The table below gives an overview of the technologies used in this project, as well as places to learn more about them.

| Name           | Links                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js        | [Website](https://nextjs.org/) - [Docs](https://nextjs.org/docs) - [Learn Next.js](https://nextjs.org/learn) - [GitHub](https://github.com/vercel/next.js) - [Wikipedia](https://en.wikipedia.org/wiki/Next.js) |
| React          | [Website](https://reactjs.org/) - [Docs](https://reactjs.org/docs/getting-started.html) - [GitHub](https://github.com/facebook/react) - [Wikipedia](<https://en.wikipedia.org/wiki/React_(JavaScript_library)>) |
| TypeScript     | [Website](https://www.typescriptlang.org/) - [Docs](https://www.typescriptlang.org/docs/) - [GitHub](https://github.com/microsoft/TypeScript) - [Wikipedia](https://en.wikipedia.org/wiki/TypeScript)           |
| Tailwind CSS   | [Website](https://tailwindcss.com/) - [Docs](https://tailwindcss.com/docs) - [GitHub](https://github.com/tailwindlabs/tailwindcss)                                                                              |
| Formik         | [Website](https://formik.org/) - [Docs](https://formik.org/docs/overview) - [GitHub](https://github.com/formium/formik)                                                                                         |
| React Query    | [Website](https://tanstack.com/query/latest) - [Docs](https://tanstack.com/query/latest/docs/react/overview) - [GitHub](https://github.com/tanstack/query)                                                      |
| ESLint         | [Website](https://eslint.org/) - [Configuration](https://eslint.org/docs/user-guide/configuring/) - [Rules](https://eslint.org/docs/rules/) - [GitHub](https://github.com/eslint/eslint)                        |
| Prettier       | [Website](https://prettier.io/) - [Docs](https://prettier.io/docs/en/index.html) - [Options](https://prettier.io/docs/en/options.html) - [GitHub](https://github.com/prettier/prettier)                         |
| Husky          | [Website](https://typicode.github.io/husky/) - [Docs](https://typicode.github.io/husky/) - [GitHub](https://github.com/typicode/husky)                                                                          |
| lint-staged    | [Website](https://github.com/okonet/lint-staged) - [GitHub](https://github.com/okonet/lint-staged)                                                                                                              |
| Yarn           | [Website](https://yarnpkg.com/) - [CLI Docs](https://yarnpkg.com/cli) - [GitHub](https://github.com/yarnpkg/berry)                                                                                              |
| GitHub Actions | [Website](https://github.com/features/actions) - [Docs](https://docs.github.com/en/actions) - [Workflow syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)                |
| Vercel         | [Website](https://vercel.com/) - [Docs](https://vercel.com/docs) - [CLI Docs](https://vercel.com/docs/cli)                                                                                                      |
