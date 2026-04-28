import React, { createContext, useState, useCallback, useContext } from 'react'

const ProductContext = createContext()

const ARRAY_FIELDS = new Set(['ean'])
export const SUPPORTED_LANGUAGES = ['English', 'German', 'Dutch', 'French', 'Italian']

const VARIANT_MPC_SUFFIXES = {
  'Monthly terminable - 1 GB': '01',
  'Monthly terminable - Unlimited': '02',
  '1 year terminable - 1 GB': '03',
  '1 year terminable - Unlimited': '04',
  '2 years terminable - 1 GB': '05',
  '2 years terminable - Unlimited': '06',
}

const generateMPCIdentifier = (variant) => {
  const suffix = VARIANT_MPC_SUFFIXES[variant] || '00'
  return `ajhkdjhNN11__WW${suffix}`
}

export function ProductProvider({ children }) {
  // Variant Selector State
  const [variant, setVariant] = useState('Monthly terminable - 1 GB')
  const [channel, setChannel] = useState('Belsimpel.nl')
  const [language, setLanguage] = useState('English')
  const [activeTab, setActiveTab] = useState('default') // 'default' or 'channel-specific'
  
  // Helper to generate variant-channel key
  const getVariantChannelKey = useCallback((v = variant, c = channel) => {
    return `${v}_${c}`
  }, [variant, channel])

  // Helper to generate variant-channel-language key
  const getVariantChannelLanguageKey = useCallback((v = variant, c = channel, l = language) => {
    return `${v}_${c}_${l}`
  }, [variant, channel, language])

  // Product Data State
  const [productData, setProductData] = useState({
    // MPC Identifier
    mpcIdentifier: { variantChannelValues: {}, differsOn: null },
    
    // Product Information
    name: { variantChannelValues: {}, differsOn: 'variant-language' },
    productIdentifier: { variantChannelValues: {}, differsOn: 'variant' },
    brand: { variantChannelValues: {}, differsOn: null },
    validFrom: { variantChannelValues: {}, differsOn: null },
    validUntil: { variantChannelValues: {}, differsOn: null },
    
    // Product Specifications
    model: { variantChannelValues: {}, differsOn: null },
    color: { variantChannelValues: {}, differsOn: null },
    materialCase: { variantChannelValues: {}, differsOn: null },
    displayType: { variantChannelValues: {}, differsOn: null },
    
    // General Features
    waterResistance: { variantChannelValues: {}, differsOn: null },
    fitnessTracking: { variantChannelValues: {}, differsOn: null },
    sleepTracking: { variantChannelValues: {}, differsOn: null },
    healthMonitoring: { variantChannelValues: {}, differsOn: null },
    
    // Technical Specs
    processor: { variantChannelValues: {}, differsOn: null },
    ram: { variantChannelValues: {}, differsOn: null },
    storage: { variantChannelValues: {}, differsOn: null },
    operatingSystem: { variantChannelValues: {}, differsOn: null },
    
    // Connectivity
    bluetooth: { variantChannelValues: {}, differsOn: null },
    wifi: { variantChannelValues: {}, differsOn: null },
    nfc: { variantChannelValues: {}, differsOn: null },
    gps: { variantChannelValues: {}, differsOn: null },
    
    // Battery & Performance
    batteryCapacity: { variantChannelValues: {}, differsOn: null },
    batteryLife: { variantChannelValues: {}, differsOn: null },
    chargingTime: { variantChannelValues: {}, differsOn: null },
    weight: { variantChannelValues: {}, differsOn: null },
    
    // Images & Media
    productImages: { variantChannelValues: {}, differsOn: null },
    productVideo: { variantChannelValues: {}, differsOn: null },
    
    // Video Reviews
    reviewVideo1: { variantChannelValues: {}, differsOn: null },
    reviewVideo2: { variantChannelValues: {}, differsOn: null },
    reviewNotes: { variantChannelValues: {}, differsOn: null },
  })

  const getProductFieldValue = useCallback((field) => {
    // Special handling for mpcIdentifier
    if (field === 'mpcIdentifier') {
      return generateMPCIdentifier(variant)
    }

    const fieldData = productData[field]
    if (!fieldData) return ''

    // Use language-keyed value for language-specific fields
    const isLanguageField = fieldData.differsOn?.includes('language')
    const key = isLanguageField ? getVariantChannelLanguageKey() : getVariantChannelKey()

    const value = fieldData.variantChannelValues[key]
    if (value === undefined || value === null) {
      return ARRAY_FIELDS.has(field) ? [''] : ''
    }
    return value
  }, [productData, getVariantChannelKey, getVariantChannelLanguageKey])

  const updateProductField = useCallback((field, value) => {
    setProductData(prev => {
      const fieldData = prev[field] || { variantChannelValues: {}, differsOn: null }
      const isLanguageField = fieldData.differsOn?.includes('language')
      const key = isLanguageField ? getVariantChannelLanguageKey() : getVariantChannelKey()

      return {
        ...prev,
        [field]: {
          ...fieldData,
          variantChannelValues: {
            ...(fieldData?.variantChannelValues || {}),
            [key]: value
          }
        }
      }
    })
  }, [getVariantChannelKey, getVariantChannelLanguageKey])

  const updateProductFieldTranslations = useCallback((field, translations) => {
    setProductData(prev => {
      const fieldData = prev[field] || { variantChannelValues: {}, differsOn: null }
      const updatedValues = { ...fieldData.variantChannelValues }

      // Update each language translation
      Object.entries(translations).forEach(([lang, value]) => {
        const key = `${variant}_${channel}_${lang}`
        updatedValues[key] = value
      })

      return {
        ...prev,
        [field]: {
          ...fieldData,
          variantChannelValues: updatedValues
        }
      }
    })
  }, [variant, channel])

  const markFieldAsCopied = useCallback((field, copyMode) => {
    const currentKey = getVariantChannelKey()
    const currentValue = productData[field]?.variantChannelValues?.[currentKey]
    
    if (currentValue === undefined || currentValue === null || currentValue === '' || (Array.isArray(currentValue) && currentValue.every(v => !v))) {
      return
    }
    
    setProductData(prev => {
      const updated = { ...prev }
      const fieldData = updated[field]
      
      if (!fieldData) {
        return prev
      }
      
      if (!fieldData.variantChannelValues) {
        fieldData.variantChannelValues = {}
      }
      
      const VARIANTS = ['Monthly terminable - 1 GB', 'Monthly terminable - Unlimited', '1 year terminable - 1 GB', '1 year terminable - Unlimited', '2 years terminable - 1 GB', '2 years terminable - Unlimited']
      const CHANNELS = ['Belsimpel.nl', 'Gomibo.hu', 'Gomibo.pl', 'Gomibo.be', 'Gomibo.ie', 'Gomibo.pt', 'Gomibo.bg', 'Gomibo.it', 'Gomibo.ro', 'Gomibo.cy', 'Gomibo.hr', 'Gomibo.si', 'Gomibo.dk', 'Gomibo.lv', 'Gomibo.sk', 'Gomibo.de', 'Gomibo.lt', 'Gomibo.es', 'Gomibo.ee', 'Gomibo.lu', 'Gomibo.cz', 'Gomibo.fi', 'Gomibo.mt', 'Gomibo.co.uk', 'Gomibo.fr', 'Gomibo.no', 'Gomibo.se', 'Gomibo.gr', 'Gomibo.at', 'Gomibo.ch']
      
      const keysToUpdate = []
      
      if (copyMode === 'variants') {
        VARIANTS.forEach(v => {
          keysToUpdate.push(`${v}_${channel}`)
        })
      } else if (copyMode === 'channels') {
        CHANNELS.forEach(c => {
          keysToUpdate.push(`${variant}_${c}`)
        })
      } else if (copyMode === 'all') {
        VARIANTS.forEach(v => {
          CHANNELS.forEach(c => {
            keysToUpdate.push(`${v}_${c}`)
          })
        })
      }
      
      keysToUpdate.forEach(key => {
        fieldData.variantChannelValues[key] = currentValue
      })
      
      return updated
    })
  }, [getVariantChannelKey, variant, channel, productData])

  const handleVariantChange = useCallback((newVariant) => {
    setVariant(newVariant)
  }, [])

  const handleChannelChange = useCallback((newChannel) => {
    setChannel(newChannel)
  }, [])

  const handleLanguageChange = useCallback((newLanguage) => {
    setLanguage(newLanguage)
  }, [])

  const value = {
    variant,
    channel,
    language,
    activeTab,
    setActiveTab,
    handleVariantChange,
    handleChannelChange,
    handleLanguageChange,
    productData,
    updateProductField,
    getProductFieldValue,
    markFieldAsCopied,
    updateProductFieldTranslations,
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProduct must be used within ProductProvider')
  }
  return context
}
