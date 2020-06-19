import numbro from 'numbro';

export default class Money {

    static cleanNumber (number) {
        return numbro(number).format({
            thousandSeparated: true,
            mantissa: 2
        });
    }

    static format (number, currencyCode) {
        return this.numberWithCurrency(number, currencyCode)
    }

    static numberWithCurrency (number, currency_code) {
        let formatted = this.cleanNumber(number);
        let currency  = this.getCurrencyByCode(currency_code);
        return currency.position
            .replace(':number', formatted)
            .replace(':code', currency.code)
            .replace(':symbol', currency.symbol);
    }

    static numberWithoutCurrency (number, currency_code) {
        return String(number).replace(currency_code, "");
    }

    static round (number) {
        return (Math.ceil(number*20 - 0.5)/20).toFixed(2)
    }

    static getCurrencyByCode (currency_code) {
        const valid_currencies = this.getAllCurrencies();
        return valid_currencies.find(
            currency => currency.code === currency_code
        ) || valid_currencies[0];
    }

    static getAllCurrencies () {
        return [
            {
                code: 'CHF',
                position: ':code :number',
                symbol: 'CHF'
            },
            {
                code: 'EUR',
                position: ':number :symbol',
                symbol: '€'
            },
            {
                code: 'USD',
                position: ':symbol:number :code',
                symbol: '$'
            }
        ];
    }

}
