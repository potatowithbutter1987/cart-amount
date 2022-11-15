import { Calculate } from "./functions/calculate";

const fs = require('fs');

const itemData = fs.readFileSync(`./assets/input/input.txt`, 'utf8').toString();

const calc = new Calculate();
const cartAmount = calc.getCartAmount(itemData);

console.log(cartAmount);
