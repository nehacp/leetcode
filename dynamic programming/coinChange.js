/*

You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

Example 1:

Input: coins = [1, 2, 5], amount = 11
Output: 3 
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
Note:
You may assume that you have an infinite number of each kind of coin.

*/

const coinChangeRecursive = (coins, amount, ) => {

  // Returns the count of ways we can  
// sum S[0...m-1] coins to get sum n 
    // If n is 0 then there is 1 solution  
    // (do not include any coin) 
    if (n === 0) 
        return 1; 
      
    // If n is less than 0 then no  
    // solution exists 
    if (n < 0) 
        return 0; 
  
    // If there are no coins and n  
    // is greater than 0, then no 
    // solution exist 
    if (m <= 0 && n >= 1) 
        return 0; 
  
    // count is sum of solutions (i)  
    // including S[m-1] (ii) excluding S[m-1] 
    return coinChangeRecursive( S, m - 1, n ) + coinChangeRecursive( S, m, n-S[m-1] ); 
}

// Memoization
const coinChangeTopDownDP = () => {
  
}



/*
Sum: 11
Coins: 1, 5, 6, 8

        A  B  C  D  E  F  G  H  I  J   K  L  (Sum)
         0  1  2  3  4  5  6  7  8  9  10  11 
  coin |----------------------------------------
a (1)  | 0  1  2  3  4  5  6  7  8  9  10  11 
b (5)  | 0  1  2  3  4  1  2  3  4  5  2   3
c (6)  | 0  1  2  3  4  1  1  1  3  4  2   2
d (8)  | 0  1  2  3  4  5  1  1  1  2  2   *2*

1) Value (Aa) - given only 1 coin with value 1, there is only 1 way to get the sum you want.
2) Value (Fb) - you need one 5 to make 5, so answer is 1. How? Min(Fa, Ab). 
  - Why Fa? - That is the solution if you had only 1 coin with value 1. 
  - Why Ab? Ab = Fb - (coin value which is 5 in that row + 1);
  - The plus one to the current one is because, when you carry over from above, thats the previous solution. If you take coin     of current row, that is 1 more coin
  - Minimum of Fa solution or current solution is the minimum number of coins. 
  - i.e Min(FA, Ab) = Min(5, 0 + 1);
3) Continue to follow the logic where to you take min of previous solution or current solution. The steps to go back depends on    the value of the coin.

If asked which are the coins used to get that answer start the solution. Where is that coin coming from? Is it from the left or top. Its coming from the top. So go there and go back that coin value steps (6). We also know that 6 is one of the coins because of that. We come to 1. Where is the 1 coming from? From top again. you know that 5 is a solution then and go back 5 steps to 0. 5 is also a coin. Keep doing this until you hit 0 to get all the coins.

Formula 
if j >= coin[i]
  total[i][j] = min( total[i-1][j],   1 + total[i][j - coin[i]])
else
  total[i][j] = total[i-1][j]
*/

// BottomUp
const coinChangeBottomUp = function(coins, amount) {
  // const maxAmount = amount + 1;
  // const coinCount = new Array(maxAmount);
  // coinCount.fill(maxAmount);
  // // [6, 6, 6, 6, 6, 6]
  // coinCount[0] = 0
  // // [0, 6, 6, 6, 6, 6]
  // // sum.fill()
  // for (let amount = 1; amount <= amount; amount++) {
  //   for (let coin = 0; coin < coins.length; coin++) {
  //     if (coins[coin] <= amount) {
  //       coinCount[amount] = Math.min(coinCount[amount], coinCount[amount - coins[coin]] + 1);
  //     }
  //   }
  // }
  // return coinCount[total] > total ? -1 : coinCount[total];
  const maxAmount = amount + 1;
  const grid = new Array(coins.length);

  // create a grid of values
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(maxAmount);
    grid[i][0] = 0;
  }

  // console.log('coin rows', grid);

  for (let coin = 0; coin < coins.length; coin++) {
    let coinValue = coins[coin];
    for (let sum = 0; sum <= amount; sum++) {
      const aboveValue = coin === 0 ? Number.POSITIVE_INFINITY : grid[coin - 1][sum] || Number.POSITIVE_INFINITY;
      if (coinValue <= sum) {
      
        const prevCoinCount = grid[coin][sum - coinValue];
        let coinCountNow;
        if (prevCoinCount !== undefined) {
          coinCountNow = prevCoinCount + 1;
        } else {
          coinCountNow = Number.POSITIVE_INFINITY;
        }

          const minCoinsNow = Math.min(aboveValue, coinCountNow);
          grid[coin][sum] = minCoinsNow;
      } else if (coinValue > sum && coin > 0) {
        grid[coin][sum] = grid[coin - 1][sum];
      }
    }
  }
    const answer = grid[coins.length - 1][amount];
  return answer === Number.POSITIVE_INFINITY || answer === undefined ? -1 : answer;
};


//       A  B  C  D  E  F  G  H  I  J   K  L  (Sum)
//          0  1  2  3  4  5  6  7  8  9  10  11 
// coin |----------------------------------------
// c (2)  | 0  -  1  -  2  -  3  -  4  -  5  -
// d (3)  | 0  -  1  1  2  2  2  3  3  3  4  *4*