# Herbdoku - sudoku validator

This is a open-source validator for advanced sudoku's, it is based on the sudoku community from [crackingthecryptic.com](https://app.crackingthecryptic.com/) ([Discord link](https://discord.com/invite/BbN89j5)).

## Contents

- [Getting started](#getting-started)
- [Features](#features)
- [Vision of the project](#vision-of-the-project)
- [Contributing](#contributing)
- [License](#license)

## Getting started

### Setup Herbdoku

1. Install the package:

```bash
$ npm install herbdoku-validator
```

2. When installed, you can import the library using `import` or `require`:

```js
import { Herbdoku } from "herbdoku-validator";
```

### How to use

1. Create a new instance of Herbdoku:

```js
const herbdoku = new Herbdoku("1234341223414123", 4);
```

2. Validate de sudoku by concatenating methods. Add build to get the final result:

```js
herbdoku.validateRows().validateColumns().validateBoxes().build();
```

3. Or use the `validateDefault()`-method to get the basic sudoku validation at once:

```js
herbdoku.validateDefault().build();
```

## Features

- Normal sudoku validation including the validation of rows, columns and boxes.
- Validation of kropki dots, both white and black, with a possibility to a different value to the kropki dot.

## Vision of the project

The vision of this project is to give everyone (the sudoku solvers and the sudoku setters) access to a powerful sudoku validator that doesn't only validate ordinary sudoku, but also more advanced sudoku rules.

Especially front-end developers of sudokupads might like something like this.

## Contributing

This is an open-source project and such everyone is free to contribute (NOTE: Not every contributor will necessarily be explicitly mentioned. This might change in the future.

## License

For the license, see [LICENSE](LICENSE).
