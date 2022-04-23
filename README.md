# Intro 👋
A portable mortgage calculator widget. [Demo](https://zuva-challenge-9jdt389o0-doparkeq.vercel.app/)

# Quick start 👟
At a root directory:
```
yarn install
yarn start
```
# Component Usage 🔨
```jsx
import Calculator from './components/Calculator'

function myApp() {
  return (
    <div>
      <Calculator/>
    </div>
  )
}
```

# Component APIs 📕

|Props|Type|Description|
|--|--|--|
|price|string|Total mortgage price|
|downPayment|string|Downpayment rate in percentage|
|totalRequired|string|Total loan amount minus down payment|
|amortization|string|Currently selected amortization period|
|amortizationPeriod|string[]|List of amortization period options|
|rate|string|Loan interest rate|
|totalPayment|string|Total needs to be paid monthly|
|mobileThreshold|number|Widget's width threshold for compact view|
|fallbackThreshold|number|Width threshold for showing the error message|
|fallbackMessage|string|An error message for widget width being too small to display content|
|errorBoundaryComponent|node|Fallback UI for component crash|

# Highlights ✨
- Incorporated error boundary for preventing the entire app from being crashed.
- Used polyfills and browser-specific CSS styling attributes for a consistent experience.
- Wrote own data handling logic and custom hooks to minimize the component size.
- Use ResizeObserver to adaptively alter UI layout based on the dimension where the component is imported.
