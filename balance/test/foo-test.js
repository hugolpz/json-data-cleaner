var tape = require("tape"),
    balance = require("../");

tape("balance() returns the answer to the ultimate question of life, the universe, and everything.", function(test) {
  test.equal(balance.balance(), 42);
  test.end();
});
