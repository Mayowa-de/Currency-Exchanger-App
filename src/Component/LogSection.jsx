import { Trash2 } from 'lucide-react'
import { getFlag } from './currencyFlags'

function formatNumber(value) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(value)
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function LogSection({ conversionLogs = [], removeConversionLog, clearConversionLogs }) {
  return (
    <section className='mt-4 w-full rounded-[16px] border border-[#3D3D3D] bg-[#202022] p-[12px] md:p-[16px]' aria-labelledby='conversion-log-title'>
      <div className='flex items-center justify-between gap-[12px] border-b border-neutral-700 px-[4px] pb-[12px]'>
        <div>
          <h2 id='conversion-log-title' className='text-[16px] text-neutral-100'>CONVERSION LOG</h2>
          <p className='mt-[4px] text-[11px] text-neutral-500'>Your recent saved conversions</p>
        </div>
        {conversionLogs.length > 0 && (
          <button
            type='button'
            onClick={clearConversionLogs}
            className='rounded-[8px] border border-red-400/50 px-[10px] py-[8px] text-[11px] text-red-300 transition-colors hover:bg-red-400/10 focus:outline-none focus:ring-2 focus:ring-[#CEF739]'
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {conversionLogs.length === 0 ? (
        <div className='flex min-h-[160px] flex-col items-center justify-center gap-[8px] text-center'>
          <p className='text-[14px] text-neutral-300'>No conversions saved yet</p>
          <p className='max-w-[320px] text-[12px] text-neutral-500'>Use LOG CONVERSION after a successful conversion to keep it here.</p>
        </div>
      ) : (
        <ul className='mt-[12px] flex flex-col gap-[8px]'>
          {conversionLogs.map((log) => (
            <li key={log.id} className='flex flex-col gap-[12px] rounded-[12px] border border-neutral-700 bg-[#2E2E2E] p-[12px] md:flex-row md:items-center md:justify-between'>
              <div className='flex min-w-0 items-center  justify-between'>
                <div className='flex items-center gap-[10px]'>
                <div className='flex items-center gap-[4px]'>
                  {getFlag(log.fromCurrency) && <img src={getFlag(log.fromCurrency)} alt={`${log.fromCurrency} flag`} className='h-[18px] w-[18px] rounded-full object-cover' />}
                  {getFlag(log.toCurrency) && <img src={getFlag(log.toCurrency)} alt={`${log.toCurrency} flag`} className='-ml-[7px] h-[18px] w-[18px] rounded-full object-cover' />}
                </div>
                <div className='min-w-0'>
                  <p className='truncate text-[13px] text-neutral-100'>
                    {formatNumber(log.amount)} {log.fromCurrency} <span className='px-[4px] text-[#CEF739]'>-&gt;</span> {formatNumber(log.convertedAmount)} {log.toCurrency}
                  </p>
                  <p className='mt-[3px] text-[10px] text-neutral-500'>1 {log.fromCurrency} = {formatNumber(log.rate)} {log.toCurrency}</p>
                </div>
              </div>
                    <button
                  type='button'
                  onClick={() => removeConversionLog(log.id)}
                  aria-label={`Remove ${log.fromCurrency} to ${log.toCurrency} conversion`}
                  className='flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border border-neutral-600 text-neutral-400 transition-colors hover:border-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-[#CEF739]'
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <div className='flex items-center justify-between gap-[12px] md:justify-end'>
                <time dateTime={log.createdAt} className='text-[10px] text-neutral-500'>{formatDate(log.createdAt)}</time>
            
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
