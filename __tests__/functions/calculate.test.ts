import { Calculate } from "../../src/functions/calculate";

test('マスターに存在する', () => {
    const input = ['りんご', 'みかん', 'すいか', ''].join('\n');
    const output = {
        items: [
            { name: 'りんご', qty: 1, amount: 198 },
            { name: 'みかん', qty: 1, amount: 98 },
            { name: 'すいか', qty: 1, amount: 498 }
        ],
        tax: 63,
        totalAmount: 857
    };
    
    expect(new Calculate().getCartAmount(input)).toEqual(output);
});

test('マスターに存在する、かつ、複数のデータがある', () => {
    const input = ['りんご', 'みかん', 'りんご', 'すいか', ''].join('\n');
    const output = {
        items: [
            { name: 'りんご', qty: 2, amount: 396 },
            { name: 'みかん', qty: 1, amount: 98 },
            { name: 'すいか', qty: 1, amount: 498 }
        ],
        tax: 79,
        totalAmount: 1071
    };
    
    expect(new Calculate().getCartAmount(input)).toEqual(output);
});

test('マスターに存在しない項目はamountを０で明細を出力', () => {
    const input = ['りんご', 'みかん', 'another','すいか', ''].join('\n');
    const output = {
        items: [
            { name: 'りんご', qty: 1, amount: 198 },
            { name: 'みかん', qty: 1, amount: 98 },
            { name: 'another', qty: 1, amount: 0 },
            { name: 'すいか', qty: 1, amount: 498 }
        ],
        tax: 63,
        totalAmount: 857
    };
    
    expect(new Calculate().getCartAmount(input)).toEqual(output);
});

test('マスターに存在しない項目はamountを０で明細を出力、かつ、複数のデータがある', () => {
    const input = ['りんご', 'みかん', 'another', 'すいか', 'another', ''].join('\n');
    const output = {
        items: [
            { name: 'りんご', qty: 1, amount: 198 },
            { name: 'みかん', qty: 1, amount: 98 },
            { name: 'another', qty: 1, amount: 0 },
            { name: 'すいか', qty: 1, amount: 498 }
        ],
        tax: 63,
        totalAmount: 857
    };
    expect(new Calculate().getCartAmount(input)).toEqual(output);
});

test('入力文字列の商品の出現順に明細を出力', () => {
    const input = ['みかん', 'すいか', 'りんご', ''].join('\n');
    const output = {
        items: [
            { name: 'みかん', qty: 1, amount: 98 },
            { name: 'すいか', qty: 1, amount: 498 },
            { name: 'りんご', qty: 1, amount: 198 }
        ],
        tax: 63,
        totalAmount: 857
    };
    
    expect(new Calculate().getCartAmount(input)).toEqual(output);
});

test('商品データに改行が含まれる', () => {
    const input = ['りんご', '', 'すいか', ''].join('\n');
    const output = {
        items: [
            { name: 'りんご', qty: 1, amount: 198 },
            { name: 'すいか', qty: 1, amount: 498 }
        ],
        tax: 55,
        totalAmount: 751
    };
    console.log(new Calculate().getCartAmount(input));    
    expect(new Calculate().getCartAmount(input)).toEqual(output);
});

test('商品データが空', () => {
    const input = [].join('\n');
    const output = {
        items: [],
        tax: 0,
        totalAmount: 0
    };
    
    expect(new Calculate().getCartAmount(input)).toEqual(output);
});

test('改行コードがCRCF', () => {
    const input = ['りんご', 'みかん', 'すいか', ''].join('\r\n');
    const output = {
        items: [
            { name: 'りんご', qty: 1, amount: 198 },
            { name: 'みかん', qty: 1, amount: 98 },
            { name: 'すいか', qty: 1, amount: 498 }
        ],
        tax: 63,
        totalAmount: 857
    };
    
    expect(new Calculate().getCartAmount(input)).toEqual(output);
});
