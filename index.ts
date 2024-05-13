import { BoxValidator } from "./src/validators/box-validator/boxValidator.class";

export * from "./src/herbdoku";

export * from "./types";

// console.log("Hello, world!");

// var herbdoku = new Herbdoku(
//   ".6.27.3..............5.8.9..7.1..........32...5.769...6........1...92.3..358.1..2"
// );

// herbdoku.validateDefault();

var boxValidator = new BoxValidator();

console.log("boxValidator", boxValidator.validate("1234341223414124", 4));
