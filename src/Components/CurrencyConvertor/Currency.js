import { useEffect, useState } from 'react'
import CurrencyRow from './CurrencyRow'

const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=6197a95eddc580ec323b663301138678`

function Currency() {
    const [currencyOptions, setCurrencyOption] = useState([])
    const [fromCurrency, setFromCurrency] = useState(null)
    const [toCurrency, setToCurrency] = useState(null)
    const [exchangeRates, setExchangeRates] = useState()
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

    let toAmount, fromAmount

    if (amountInFromCurrency) {
        fromAmount = amount
        toAmount = amount * exchangeRates
    } else {
        toAmount = amount
        fromAmount = amount / exchangeRates
    }

    useEffect(() => {
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                const firstCurrency = Object.keys(data.rates)[0]
                setCurrencyOption([data.base, ...Object.keys(data.rates)])
                setFromCurrency(data.base)
                setToCurrency(firstCurrency)
                setExchangeRates(data.rates[firstCurrency])
            })
    }, [])

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`${BASE_URL}&base=${fromCurrency}&symbols=${toCurrency}`)
                .then(res => res.json())
                .then(data => setExchangeRates(data.rates[toCurrency]))
        }
    }, [fromCurrency, toCurrency])

    const handleFromAmountChange = (e) => {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }

    const handleToAmountChange = (e) => {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }
    return (
        <div>
            Convertor
            <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={fromCurrency} onChangeCurrency={(e) => setFromCurrency(e.target.value)}
                amount={fromAmount}
                onChangeCurrencyValues={handleFromAmountChange}
            />
            <div>=</div>
            <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={toCurrency} onChangeCurrency={(e) => setToCurrency(e.target.value)} amount={toAmount} onChangeCurrencyValues={handleToAmountChange} />
        </div>
    )
}

export default Currency
