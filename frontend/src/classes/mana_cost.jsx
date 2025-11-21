function removeBrackets(stringSymbol)
{
    return stringSymbol.slice(1, -1);
}

class ManaCostObj 
{
    constructor(colorlessAmount = -1, otherManaSymbols = []) 
    {
        this.colorlessAmount = colorlessAmount;
        this.otherManaSymbols = otherManaSymbols;
    }

    addSymbol(symbol) 
    {
        return new ManaCostObj(
            this.colorlessAmount,
            [...this.otherManaSymbols, symbol]
        );
    }

    setColorlessAmount(amount) 
    {
        return new ManaCostObj(
            amount,
            this.otherManaSymbols
        );
    }

    static newEmpty() 
    {
        return new ManaCostObj(-1, []);
    }

    // Saves mana cost in DB in square bracket format: [3][w][u] to preserve multi-character symbols
    toString()
    {
        let result = '';
        
        if (this.colorlessAmount > -1) 
        {
            result += `[${this.colorlessAmount}]`;
        }
        this.otherManaSymbols.forEach(symbol => { result += `[${symbol}]`;});
        
        return result;
    }

    static fromString(manaCostString)
    {
        if (!manaCostString || manaCostString === "") 
            return ManaCostObj.newEmpty();
        
        const bracketMatches = manaCostString.match(/\[([^\]]*)\]/g);
        if (!bracketMatches)
            return ManaCostObj.newEmpty();
        
        let colorlessAmount = -1;
        const otherManaSymbols = [];
        
        bracketMatches.forEach(bracketedSymbol => {
            const symbol = removeBrackets(bracketedSymbol);
            
            // Check if it's a number (colorless mana)
            if (/^\d+$/.test(symbol) && colorlessAmount === -1)
            {
                colorlessAmount = parseInt(symbol);
            }
            else
            {
                otherManaSymbols.push(symbol);
            }
        });
        
        return new ManaCostObj(colorlessAmount, otherManaSymbols);
    }
}

export { ManaCostObj };