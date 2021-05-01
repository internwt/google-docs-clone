
function CurrencyRow({ currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeCurrencyValues }) {

    return (
        <div>
            Convert
            <div>
                <input type="text" value={amount} onChange={onChangeCurrencyValues} />
                <select value={selectedCurrency} onChange={onChangeCurrency}>
                    {currencyOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
            </div>
        </div>
    )
}

export default CurrencyRow
