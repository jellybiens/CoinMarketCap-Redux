export const filter_tokens_and_coins = (coins, tokens) => {

    let coinsArr = [];
    let tokensArr = [];

    coins.forEach((coin) => {
      coinsArr.push(coin.id);
    });

    tokens.forEach((coin) => {
      tokensArr.push(coin.id);
    });

    return {"coins" : coinsArr, "tokens": tokensArr}

}
