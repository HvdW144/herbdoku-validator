import Herbdoku from "./src/herbdoku";

export * from "./src/herbdoku";

console.log("Hello, world!");

var herbdoku = new Herbdoku(
  ".6.27.3..............5.8.9..7.1..........32...5.769...6........1...92.3..358.1..2"
);

herbdoku.validateDefault();
