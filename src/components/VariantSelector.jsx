import React, { useState, useRef, useEffect } from 'react'
import { useProduct } from '../context/ProductContext2'
import { useScroll } from '../context/ScrollContext'
import { Combobox } from './ui/combobox'
import { Button } from './ui/button'
import {
  VARIANT_OPTIONS,
  LANGUAGE_OPTIONS,
  STICKY_CONFIG,
  LABEL_STYLE,
  HEADING_STYLE,
  DESCRIPTION_STYLE,
  BUTTON_STYLE,
  DIVIDER_STYLE,
} from '../constants/selectorConfig'

export default function VariantSelector() {
  const { variant, handleVariantChange, language, handleLanguageChange } = useProduct()
  const { scrollY } = useScroll()
  const [selectorWidth, setSelectorWidth] = useState(null)
  const containerRef = useRef(null)
  const selectorRef = useRef(null)

  const progress = Math.min(scrollY / 60, 1)
  const isSticky = scrollY >= STICKY_CONFIG.triggerScroll

  useEffect(() => {
    // Measure the actual width of the selector container
    const measureWidth = () => {
      if (selectorRef.current) {
        setSelectorWidth(selectorRef.current.offsetWidth)
      }
    }

    // Initial measurement
    measureWidth()

    // Measure on window resize
    window.addEventListener('resize', measureWidth)

    return () => {
      window.removeEventListener('resize', measureWidth)
    }
  }, [])

  return (
    <div className="w-full max-w-full">
        <div className="flex items-center justify-between" style={{ marginBottom: '24px', display: isSticky ? 'none' : 'flex' }}>
          <div>
            <h2 style={HEADING_STYLE}>Select variant + language</h2>
            <p style={DESCRIPTION_STYLE}>
              Select the product variant + language combination to adjust the specific product information.
            </p>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 h-9 px-4 border-gray-200"
            style={BUTTON_STYLE}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.33334 4.08333H11.6667V5.25H2.33334V4.08333ZM4.08334 6.41667H9.91668V7.58333H4.08334V6.41667ZM5.83334 8.75H8.16668V9.91667H5.83334V8.75Z" fill="black"/>
            </svg>
            Filter
          </Button>
        </div>
        {/* Selectors container */}
        <div
          ref={selectorRef}
          style={{
            display: 'flex',
            padding: 'var(--Gap-3, 12px) var(--Gap-6, 24px)',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: isSticky ? '0px 0px 6px 6px' : '6px',
            border: '1px solid var(--base-border, #E4E4E7)',
            borderTop: isSticky ? 'none' : '1px solid var(--base-border, #E4E4E7)',
            background: '#FFFFFF',
            gap: '24px',
            position: isSticky ? 'fixed' : 'relative',
            top: isSticky ? `${STICKY_CONFIG.stickyTop}px` : 'auto',
            left: isSticky ? '288px' : 'auto',
            right: isSticky ? '0' : 'auto',
            width: isSticky && selectorWidth ? `${selectorWidth}px` : 'auto',
            marginRight: isSticky ? '32px' : 'auto',
            zIndex: isSticky ? STICKY_CONFIG.zIndex : 1000,
            boxShadow: isSticky ? '0 4px 4px 0 rgba(0, 0, 0, 0.10)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="flex-1 flex flex-col gap-2">
            <label style={LABEL_STYLE}>Variant</label>
            <Combobox
              options={VARIANT_OPTIONS}
              value={variant}
              onValueChange={handleVariantChange}
              placeholder="Monthly terminable - 1 GB"
              className="bg-white border-gray-200 h-10 shadow-none"
            />
          </div>

          <div style={DIVIDER_STYLE} />

          <div className="flex-0 flex flex-col gap-2" style={{ minWidth: '180px' }}>
            <label style={LABEL_STYLE}>Language</label>
            <Combobox
              options={LANGUAGE_OPTIONS}
              value={language}
              onValueChange={handleLanguageChange}
              placeholder="English"
              className="bg-white border-gray-200 h-10 shadow-none"
            />
          </div>
        </div>
    </div>
  )
}
