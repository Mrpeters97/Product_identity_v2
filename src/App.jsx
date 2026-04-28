import VariantSelector from './components/VariantSelector'
import ContentCards from './components/ui/ContentCards'
import PageHeader from './components/layout/PageHeader'
import Sidebar from './components/layout/Sidebar'
import RightAnchorMenu from './components/layout/RightAnchorMenu'
import { ProductProvider } from './context/ProductContext2'
import { ScrollProvider } from './context/ScrollContext'


function App() {
  return (
    <ScrollProvider>
      <ProductProvider>
        <PageHeader />
        <Sidebar />
        <div className="flex w-full min-h-screen bg-[#fcfcfc]" style={{ minHeight: '100vh' }}>
          <div
            className="grid w-full"
            style={{
              marginLeft: '256px',
              marginTop: '180px',
              paddingTop: 'var(--Gap-6, 24px)',
              paddingRight: 'var(--Gap-6, 24px)',
              paddingBottom: 'var(--Gap-0, 0)',
              paddingLeft: 'var(--Gap-6, 24px)',
              gridTemplateColumns: 'minmax(0, 4fr) minmax(220px, 1fr)',
              gap: 'clamp(32px, 3.5vw, 36px)',
              width: '100%',
            }}
          >
            <div className="flex flex-col items-center w-full max-w-full" style={{ minWidth: 0, gap: '28px', paddingBottom: '128px' }}>
              <VariantSelector />
              <main className="w-full">
                <ContentCards />
              </main>
            </div>
            <div className="w-full max-w-full">
              <RightAnchorMenu />
            </div>
          </div>
        </div>
      </ProductProvider>
    </ScrollProvider>
  )
}

export default App
