import { useState, useEffect } from 'react'
import './App.css'

const API_BASE = 'https://api.coingecko.com/api/v3'

// Popular coins for quick add
const POPULAR_COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'polygon', symbol: 'MATIC', name: 'Polygon' },
]

function App() {
  const [holdings, setHoldings] = useState(() => {
    const saved = localStorage.getItem('cryptoHoldings')
    return saved ? JSON.parse(saved) : []
  })
  const [prices, setPrices] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [amount, setAmount] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [loading, setLoading] = useState(true)
  const [currency, setCurrency] = useState('usd')

  const currencySymbols = { usd: '$', idr: 'Rp', eur: '€', btc: '₿', eth: 'Ξ' }

  // Save holdings to localStorage
  useEffect(() => {
    localStorage.setItem('cryptoHoldings', JSON.stringify(holdings))
  }, [holdings])

  // Fetch prices for holdings
  useEffect(() => {
    if (holdings.length > 0) {
      fetchPrices()
    } else {
      setLoading(false)
    }
    // Refresh every 60 seconds
    const interval = setInterval(fetchPrices, 60000)
    return () => clearInterval(interval)
  }, [holdings, currency])

  const fetchPrices = async () => {
    if (holdings.length === 0) return
    
    const ids = holdings.map(h => h.coinId).join(',')
    try {
      const response = await fetch(
        `${API_BASE}/simple/price?ids=${ids}&vs_currencies=${currency}&include_24hr_change=true&include_market_cap=true`
      )
      const data = await response.json()
      setPrices(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching prices:', error)
      setLoading(false)
    }
  }

  // Search coins
  const searchCoins = async (query) => {
    if (query.length < 2) {
      setSearchResults([])
      return
    }
    try {
      const response = await fetch(`${API_BASE}/search?query=${query}`)
      const data = await response.json()
      setSearchResults(data.coins.slice(0, 10))
    } catch (error) {
      console.error('Error searching:', error)
    }
  }

  // Add holding
  const addHolding = () => {
    if (!selectedCoin || !amount || amount <= 0) return

    const newHolding = {
      id: Date.now(),
      coinId: selectedCoin.id,
      symbol: selectedCoin.symbol,
      name: selectedCoin.name,
      amount: parseFloat(amount),
      buyPrice: buyPrice ? parseFloat(buyPrice) : null,
      addedAt: new Date().toISOString()
    }

    setHoldings([...holdings, newHolding])
    setShowAddModal(false)
    setSelectedCoin(null)
    setAmount('')
    setBuyPrice('')
  }

  // Remove holding
  const removeHolding = (id) => {
    setHoldings(holdings.filter(h => h.id !== id))
  }

  // Calculate portfolio stats
  const calculateStats = () => {
    let totalValue = 0
    let totalCost = 0
    let totalChange24h = 0

    holdings.forEach(holding => {
      const price = prices[holding.coinId]
      if (price) {
        const value = holding.amount * price[currency]
        totalValue += value
        
        if (holding.buyPrice) {
          totalCost += holding.amount * holding.buyPrice
        }

        if (price[`${currency}_24h_change`]) {
          totalChange24h += value * (price[`${currency}_24h_change`] / 100)
        }
      }
    })

    const totalProfit = totalCost > 0 ? totalValue - totalCost : 0
    const totalProfitPercent = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0

    return { totalValue, totalCost, totalProfit, totalProfitPercent, totalChange24h }
  }

  const stats = calculateStats()

  const formatNumber = (num, decimals = 2) => {
    if (!num && num !== 0) return '--'
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    })
  }

  return (
    <div className="app">
      <header>
        <h1>📊 Token Portfolio</h1>
        <p className="subtitle">Track your crypto holdings in real-time</p>
      </header>

      {/* Portfolio Summary */}
      <div className="portfolio-summary">
        <div className="summary-card main">
          <span className="label">Total Portfolio Value</span>
          <span className="value">
            {currencySymbols[currency]}{formatNumber(stats.totalValue)}
          </span>
          {stats.totalChange24h !== 0 && (
            <span className={`change ${stats.totalChange24h >= 0 ? 'positive' : 'negative'}`}>
              {stats.totalChange24h >= 0 ? '▲' : '▼'} {currencySymbols[currency]}{formatNumber(Math.abs(stats.totalChange24h))} (24h)
            </span>
          )}
        </div>
        <div className="summary-card">
          <span className="label">Total Cost</span>
          <span className="value">
            {stats.totalCost > 0 ? `${currencySymbols[currency]}${formatNumber(stats.totalCost)}` : '--'}
          </span>
        </div>
        <div className="summary-card">
          <span className="label">Total P/L</span>
          <span className={`value ${stats.totalProfit >= 0 ? 'positive' : 'negative'}`}>
            {stats.totalCost > 0 ? (
              <>
                {stats.totalProfit >= 0 ? '+' : ''}{currencySymbols[currency]}{formatNumber(stats.totalProfit)}
                <small> ({stats.totalProfitPercent >= 0 ? '+' : ''}{formatNumber(stats.totalProfitPercent)}%)</small>
              </>
            ) : '--'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Token
        </button>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="usd">USD ($)</option>
          <option value="idr">IDR (Rp)</option>
          <option value="eur">EUR (€)</option>
          <option value="btc">BTC (₿)</option>
          <option value="eth">ETH (Ξ)</option>
        </select>
      </div>

      {/* Holdings Table */}
      {holdings.length === 0 ? (
        <div className="empty-state">
          <p>No tokens in your portfolio yet.</p>
          <p>Click "Add Token" to get started!</p>
        </div>
      ) : loading ? (
        <div className="loading">Loading prices...</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Value</th>
                <th>24h Change</th>
                <th>P/L</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => {
                const price = prices[holding.coinId]
                if (!price) return null

                const currentPrice = price[currency]
                const value = holding.amount * currentPrice
                const change24h = price[`${currency}_24h_change`]
                const profit = holding.buyPrice 
                  ? (currentPrice - holding.buyPrice) * holding.amount 
                  : null
                const profitPercent = holding.buyPrice 
                  ? ((currentPrice - holding.buyPrice) / holding.buyPrice) * 100 
                  : null

                return (
                  <tr key={holding.id}>
                    <td>
                      <div className="token-info">
                        <span className="token-name">{holding.name}</span>
                        <span className="token-symbol">{holding.symbol.toUpperCase()}</span>
                      </div>
                    </td>
                    <td>{formatNumber(holding.amount, 4)}</td>
                    <td>{currencySymbols[currency]}{formatNumber(currentPrice, currentPrice < 1 ? 6 : 2)}</td>
                    <td><strong>{currencySymbols[currency]}{formatNumber(value)}</strong></td>
                    <td>
                      <span className={change24h >= 0 ? 'positive' : 'negative'}>
                        {change24h >= 0 ? '▲' : '▼'} {Math.abs(change24h).toFixed(2)}%
                      </span>
                    </td>
                    <td>
                      {profit !== null ? (
                        <span className={profit >= 0 ? 'positive' : 'negative'}>
                          {profit >= 0 ? '+' : ''}{currencySymbols[currency]}{formatNumber(profit)}
                          <small> ({profitPercent >= 0 ? '+' : ''}{formatNumber(profitPercent)}%)</small>
                        </span>
                      ) : '--'}
                    </td>
                    <td>
                      <button className="btn-delete" onClick={() => removeHolding(holding.id)}>
                        ✕
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Token Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add Token</h2>
            
            <div className="search-box">
              <input
                type="text"
                placeholder="Search token (e.g. bitcoin, ethereum)..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  searchCoins(e.target.value)
                }}
              />
            </div>

            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map(coin => (
                  <div 
                    key={coin.id} 
                    className={`search-result ${selectedCoin?.id === coin.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedCoin(coin)
                      setSearchTerm(coin.name)
                      setSearchResults([])
                    }}
                  >
                    <img src={coin.thumb} alt={coin.name} />
                    <span>{coin.name}</span>
                    <span className="symbol">{coin.symbol.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="popular-coins">
              <p>Popular:</p>
              <div className="coin-tags">
                {POPULAR_COINS.map(coin => (
                  <button
                    key={coin.id}
                    className={`coin-tag ${selectedCoin?.id === coin.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedCoin(coin)
                      setSearchTerm(coin.name)
                      setSearchResults([])
                    }}
                  >
                    {coin.symbol}
                  </button>
                ))}
              </div>
            </div>

            {selectedCoin && (
              <div className="form-group">
                <label>Amount ({selectedCoin.symbol})</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="any"
                />
              </div>
            )}

            <div className="form-group">
              <label>Buy Price (optional, for P/L calculation)</label>
              <input
                type="number"
                placeholder="0.00"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                step="any"
              />
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={addHolding} disabled={!selectedCoin || !amount}>
                Add to Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>Built with ❤️ by <a href="https://github.com/rizaahmad25" target="_blank">RimuroHengky</a></p>
        <p>Data from <a href="https://www.coingecko.com/" target="_blank">CoinGecko API</a></p>
      </footer>
    </div>
  )
}

export default App
