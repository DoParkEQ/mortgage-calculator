type CalculatorProps = {
  price: string
  downPayment: string
  totalRequired: string
  amortization: string
  amortizationPeriod: string[]
  rate: string
  totalPayment: string
  mobileThreshold: number
  style: React.CSSProperties
  fallbackThreshold: number
  fallbackMessage: string
  errorBoundaryComponent: ComponentType<FallbackProps>
}

type ListProps = {
  isFullWidth: boolean
  header: string
  children: React.ReactNode
}

interface Config {
  price: string
  downPayment: string
  totalRequired: string
  amortization: string
  rate: string
  totalPayment: string
}

interface ResizeObserverEntry {
  readonly target: Element
  readonly contentRect: DOMRectReadOnly
  readonly borderBoxSize: ResizeObserverSize
  readonly contentBoxSize: ResizeObserverSize
}

type ObserverHook = {
  ref: React.LegacyRef<HTMLDivElement>
  entry: ResizeObserverEntry | any
}
type InputProps = {
  isActive: boolean
  min: number
  max: number
  prefix: string
  postfix: string
  onChange: (e) => void
  value: string
  style: React.CSSProperties
}
