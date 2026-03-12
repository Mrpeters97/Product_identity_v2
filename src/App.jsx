import VariantSelector from './components/VariantSelector'
import ProductInformation from './components/ui/ProductInformation'
import { ProductProvider } from './context/ProductContext'

function App() {
  return (
    <ProductProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-7">
        <VariantSelector />
        <ProductInformation />
      </div>
    </ProductProvider>
  )
}

export default App
