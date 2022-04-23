import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useEffect, useState } from 'react'
import { calculateTotal, convertToNum, formatNumber } from '../utils'
import { useResizeObserver } from '../hooks'
import './Calculator.css'
import Input from './Input'
import List from './List'
import ErrorBoundaryDefault from './ErrorBoundaryDefault'

const defaultProps = {
  price: '550,000',
  downPayment: '20',
  totalRequired: '440,000',
  amortization: '25',
  amortizationPeriod: ['5', '10', '15', '20', '25', '30'],
  rate: '2',
  totalPayment: '1880.34',
  mobileThreshold: 800,
  fallbackThreshold: 150,
  style: {},
  fallbackMessage: 'Widget too small',
  errorBoundaryComponent: <ErrorBoundaryDefault />,
}

const Calculator = ({
  price,
  downPayment,
  totalRequired,
  amortization,
  amortizationPeriod,
  rate,
  totalPayment,
  mobileThreshold,
  errorBoundaryComponent,
  fallbackThreshold,
  fallbackMessage,
  ...props
}: CalculatorProps) => {
  const { ref, entry }: ObserverHook = useResizeObserver()
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false)
  const [config, setConfig] = useState<Config>({
    price,
    downPayment,
    totalRequired,
    amortization,
    rate,
    totalPayment,
  })

  const setPrice = (e: { target: HTMLInputElement }) => {
    const newPrice = formatNumber(e.target.value)
    setConfig((prev) => ({ ...prev, price: newPrice.toLocaleString() }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setConfig((prev) => {
      const newConfig = calculateTotal(prev)
      return { ...prev, ...newConfig }
    })
  }

  const handleDownPayment = (e: { target: HTMLInputElement }) => {
    const newDownPayment = formatNumber(e.target.value)
    const newTotalRequired =
      convertToNum(config.price) * (1 - newDownPayment * 0.01)
    setConfig((prev) => ({
      ...prev,
      downPayment: newDownPayment.toString(),
      totalRequired: newTotalRequired.toLocaleString(),
    }))
  }

  const handleTotalRequired = (e: { target: HTMLInputElement }) => {
    const newTotalRequired = formatNumber(e.target.value)
    const newDownPayment =
      (1 - newTotalRequired / convertToNum(config.price)) * 100
    setConfig((prev) => ({
      ...prev,
      downPayment: newDownPayment.toLocaleString(),
      totalRequired: newTotalRequired.toLocaleString(),
    }))
  }

  const handleAmortization = (e: { target: HTMLSelectElement }) => {
    setConfig((prev) => ({
      ...prev,
      amortization: formatNumber(e.target.value).toString(),
    }))
  }

  const handleRate = (e: { target: HTMLInputElement }) => {
    setConfig((prev) => ({
      ...prev,
      rate: formatNumber(e.target.value).toString(),
    }))
  }

  useEffect(() => {
    if (isActive) {
      setConfig((prev) => {
        const newConfig = calculateTotal({ ...prev })
        return { ...prev, ...newConfig }
      })
    }
  }, [JSON.stringify(config)])

  const getStyle = (style) => (isFullWidth ? `${style} ${style}--large` : style)

  useEffect(() => {
    const w = entry?.contentRect?.width || undefined
    if (w !== undefined) {
      if (entry?.contentRect?.width + 32 > mobileThreshold) {
        setIsFullWidth(true)
      } else {
        setIsFullWidth(false)
      }
    }
  }, [entry])

  return (
    <ErrorBoundary FallbackComponent={errorBoundaryComponent}>
      <div ref={ref} {...props} className={getStyle('mortgage__container')}>
        {entry?.contentRect?.width > fallbackThreshold ? (
          <>
            <List isFullWidth={isFullWidth} header="Asking price">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className={getStyle('mortgage__calculation-content')}>
                  <Input
                    prefix="$"
                    style={{
                      marginRight: 8,
                      maxWidth: isFullWidth ? 150 : 'none',
                    }}
                    value={config.price}
                    min={0}
                    onChange={(e) => setPrice(e)}
                  />
                  <button onClick={() => setIsActive(true)}>Calculate</button>
                </div>
              </form>
            </List>
            <List isFullWidth={isFullWidth} header="Down payment">
              <div className={getStyle('mortgage__estimation-inputs')}>
                <Input
                  style={{
                    marginRight: 8,
                    maxWidth: isFullWidth ? 150 : 'none',
                  }}
                  postfix="%"
                  max={100}
                  min={0}
                  isActive={isActive}
                  value={config.downPayment}
                  onChange={(e) => handleDownPayment(e)}
                />
                <Input
                  style={{ maxWidth: isFullWidth ? 150 : 'none' }}
                  prefix="$"
                  isActive={isActive}
                  max={formatNumber(config.price)}
                  min={0}
                  value={config.totalRequired}
                  onChange={(e) => handleTotalRequired(e)}
                />
              </div>
            </List>
            <List isFullWidth={isFullWidth} header={'Amortization period'}>
              <div className={getStyle('mortgage__option')}>
                <select
                  disabled={!isActive}
                  onChange={(e) => handleAmortization(e)}
                >
                  {amortizationPeriod.map((el) => (
                    <option>
                      {el}
                      <span> years</span>
                    </option>
                  ))}
                </select>
              </div>
            </List>
            <List isFullWidth={isFullWidth} header={'Mortgage rate'}>
              <div>
                <Input
                  style={{ maxWidth: isFullWidth ? 150 : 'none' }}
                  postfix="%"
                  max={100}
                  isActive={isActive}
                  value={config.rate}
                  onChange={(e) => handleRate(e)}
                />
              </div>
            </List>
            <hr />
            <List isFullWidth={isFullWidth} header={'Total mortgage payment'}>
              <p>{`$${config.totalPayment} / mo`}</p>
            </List>
          </>
        ) : (
          <div>{fallbackMessage}</div>
        )}
      </div>
    </ErrorBoundary>
  )
}

Calculator.defaultProps = defaultProps

export default Calculator
