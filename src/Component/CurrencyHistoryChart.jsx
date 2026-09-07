import { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'

const RANGE_DAYS = {
  '1D': 1,
  '1W': 7,
  '1M': 30,
  '1Y': 365,
  '5Y': 1825,
}

function formatDate(date) {
  return date.toISOString().slice(0, 10)
}

function getStartDate(range) {
  const startDate = new Date()
  startDate.setUTCDate(startDate.getUTCDate() - RANGE_DAYS[range])
  return formatDate(startDate)
}

function formatValue(value) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: value >= 100 ? 2 : 4,
  }).format(value)
}

export default function CurrencyHistoryChart({ baseCurrency, quoteCurrency }) {
  const [activeRange, setActiveRange] = useState('1M')
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchHistory() {
      setIsLoading(true)
      setError('')

      if (!baseCurrency || !quoteCurrency || baseCurrency === quoteCurrency) {
        setHistory([])
        setIsLoading(false)
        return
      }

      try {
        const startDate = getStartDate(activeRange)
        const endDate = formatDate(new Date())
        const apiUrl = `https://api.frankfurter.dev/v1/${startDate}..${endDate}?base=${encodeURIComponent(baseCurrency)}&symbols=${encodeURIComponent(quoteCurrency)}`
        const response = await fetch(apiUrl, { signal: controller.signal })

        if (!response.ok) {
          throw new Error('Unable to load historical rates')
        }

        const data = await response.json()
        const points = Object.entries(data.rates ?? {})
          .map(([date, rates]) => ({
            x: new Date(`${date}T00:00:00Z`).getTime(),
            y: rates[quoteCurrency],
          }))
          .filter((point) => Number.isFinite(point.y))
          .sort((first, second) => first.x - second.x)

        setHistory(points)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setHistory([])
          setError('Historical rates are temporarily unavailable.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchHistory()
    return () => controller.abort()
  }, [activeRange, baseCurrency, quoteCurrency])

  const latestValue = history.at(-1)?.y
  const firstValue = history[0]?.y
  const change = latestValue && firstValue ? ((latestValue - firstValue) / firstValue) * 100 : 0
  const changeIsPositive = change >= 0

  const chartOptions = useMemo(() => ({
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: '#a3a3a3',
      fontFamily: 'Jetbrains-Mono, monospace',
      animations: { enabled: true, speed: 450 },
    },
    colors: ['#CEF739'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        opacityFrom: 0.28,
        opacityTo: 0.02,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: 'rgba(255,255,255,0.08)',
      strokeDashArray: 4,
      padding: { left: 12, right: 12 },
    },
    xaxis: {
      type: 'datetime',
      labels: { datetimeUTC: false, style: { colors: '#737373', fontSize: '10px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (value) => formatValue(value),
        style: { colors: '#737373', fontSize: '10px' },
      },
    },
    tooltip: {
      theme: 'dark',
      x: { format: 'dd MMM yyyy' },
      y: { formatter: (value) => `${formatValue(value)} ${quoteCurrency}` },
    },
  }), [quoteCurrency])

  return (
    <section className='mt-[20px] rounded-[16px] border border-[#3D3D3D] bg-[#202022] p-[16px] md:p-[20px]' aria-labelledby='history-chart-title'>
      <div className='flex flex-col gap-[14px] md:flex-row md:items-start md:justify-between'>
        <div>
          <p className='text-[11px] tracking-[1.5px] text-neutral-500'>RATE HISTORY</p>
          <div className='mt-[5px] flex items-baseline gap-[8px]'>
            <h2 id='history-chart-title' className='text-[18px] text-neutral-100'>{baseCurrency} / {quoteCurrency}</h2>
            {latestValue && <span className='text-[12px] text-neutral-400'>{formatValue(latestValue)}</span>}
          </div>
        </div>
        <div className='flex flex-wrap gap-[4px] rounded-[8px] bg-[#2E2E2E] p-[4px]' role='group' aria-label='Chart time range'>
          {Object.keys(RANGE_DAYS).map((range) => (
            <button
              key={range}
              type='button'
              onClick={() => setActiveRange(range)}
              className={`min-w-[38px] rounded-[6px] px-[8px] py-[6px] text-[11px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CEF739] ${activeRange === range ? 'bg-[#CEF739] text-black' : 'text-neutral-400 hover:text-white'}`}
              aria-pressed={activeRange === range}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className='mt-[12px] flex items-center gap-[8px] text-[11px]'>
        <span className={changeIsPositive ? 'text-[#CEF739]' : 'text-red-400'}>{changeIsPositive ? '+' : ''}{change.toFixed(2)}%</span>
        <span className='text-neutral-500'>over selected period</span>
      </div>

      <div className='relative mt-[8px] min-h-[220px]'>
        {isLoading && <div className='absolute inset-0 z-10 flex items-center justify-center text-[12px] text-neutral-500'>Loading historical rates...</div>}
        {!isLoading && error && <div className='flex min-h-[220px] items-center justify-center text-center text-[12px] text-neutral-500'>{error}</div>}
        {!isLoading && !error && history.length > 1 && <Chart options={chartOptions} series={[{ name: `${baseCurrency}/${quoteCurrency}`, data: history }]} type='area' height={220} />}
        {!isLoading && !error && history.length <= 1 && <div className='flex min-h-[220px] items-center justify-center text-center text-[12px] text-neutral-500'>No historical points for this currency pair.</div>}
      </div>
    </section>
  )
}