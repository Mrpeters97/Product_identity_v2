import { useState, useEffect, useRef, useCallback } from 'react'
import { useProduct } from '../../context/ProductContext2'
import { PRODUCT_CARDS, DIFF_LABELS } from '../../constants/productCards'
import { Button } from './button'
import { Input } from './input'
import { Combobox } from './combobox'
import { TooltipProvider } from '.'
import Toast from './Toast'
import Skeleton from './Skeleton'
import FormRow from './FormRow'
import CopyAction from './CopyAction'
import TranslateAction from './TranslateAction'
import AttributeBadge from './AttributeBadge'
import { LinkIcon, UnlinkIcon, ClipboardIcon } from './Icons'
import { useProductAutoFill } from '../../hooks/useProductAutoFill'
import { renderField, getCopyModeMessage } from '../../utils/formHelpers'

export default function ProductInformation() {
  const { productData, updateProductField, getProductFieldValue, markFieldAsCopied, updateProductFieldTranslations, variant, channel, language, activeTab } = useProduct()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('Values successfully copied')
  const [isLoading, setIsLoading] = useState(false)
  const [showSystemNotification, setShowSystemNotification] = useState(false)
  const [systemNotificationMessage, setSystemNotificationMessage] = useState('')
  const prevValuesRef = useRef({ variant, channel, language })

  // Use auto-fill hook
  useProductAutoFill(variant, channel, language, getProductFieldValue, updateProductField)

  useEffect(() => {
    const prev = prevValuesRef.current
    let changeMessage = ''

    if (prev.variant !== variant) {
      changeMessage = `You are now editing ${variant}`
    } else if (prev.channel !== channel) {
      changeMessage = `You are now editing on ${channel}`
    } else if (prev.language !== language) {
      changeMessage = `You are now editing in ${language}`
    }

    if (changeMessage) {
      setIsLoading(true)
      setSystemNotificationMessage(changeMessage)

      const timer = setTimeout(() => {
        setIsLoading(false)
        setShowSystemNotification(true)
      }, 1500)

      const hideTimer = setTimeout(() => {
        setShowSystemNotification(false)
      }, 5500)

      prevValuesRef.current = { variant, channel, language }

      return () => {
        clearTimeout(timer)
        clearTimeout(hideTimer)
      }
    }
  }, [variant, channel, language])

  const handleFieldChange = useCallback((field, value) => {
    updateProductField(field, value)
  }, [updateProductField])

  const handleArrayFieldChange = useCallback((field, index, value) => {
    const currentArray = getProductFieldValue(field)
    const newArray = [...currentArray]
    newArray[index] = value
    updateProductField(field, newArray)
  }, [getProductFieldValue, updateProductField])

  const handleAddArrayField = useCallback((field) => {
    const currentArray = getProductFieldValue(field)
    updateProductField(field, [...currentArray, ''])
  }, [getProductFieldValue, updateProductField])

  const handleCopyConfirm = useCallback((field, copyMode) => {
    markFieldAsCopied(field, copyMode)
    const message = getCopyModeMessage(copyMode)
    setToastMessage(message)
    setTimeout(() => {
      setShowToast(true)
    }, 300)
  }, [markFieldAsCopied])

  const isChannelSpecific = useCallback((field) => {
    return field.differsOn && field.differsOn.includes('channel')
  }, [])

  const isTranslatable = useCallback((field) => {
    return field.differsOn && field.differsOn.includes('language')
  }, [])

  const handleTranslateConfirm = useCallback((field, translations) => {
    updateProductFieldTranslations(field, translations)
    const languageCount = Object.keys(translations).length
    const message = `Value successfully translated to ${languageCount} language${languageCount !== 1 ? 's' : ''}`
    setToastMessage(message)
    setTimeout(() => {
      setShowToast(true)
    }, 300)
  }, [updateProductFieldTranslations])

  const renderFieldElement = useCallback((field) => {
    return renderField(field, getProductFieldValue(field.key), handleFieldChange, handleArrayFieldChange, handleAddArrayField, getProductFieldValue)
  }, [handleFieldChange, handleArrayFieldChange, handleAddArrayField, getProductFieldValue])

  const shouldShowField = useCallback((card, field) => {
    return true
  }, [activeTab])

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex justify-center w-full">
        {showToast && (
          <Toast
            message={toastMessage}
            onClose={() => setShowToast(false)}
            variant="success"
          />
        )}

        {showSystemNotification && (
          <Toast
            message={systemNotificationMessage}
            onClose={() => setShowSystemNotification(false)}
            variant="system"
            duration={4000}
          />
        )}

        <div className="flex flex-col gap-6 w-full max-w-full">
          {PRODUCT_CARDS.map((card, cardIndex) => {
            // For numbering, skip special cards (like mpc-identifier)
            const regularCardIndex = PRODUCT_CARDS.filter((c, i) => !c.isSpecial && i <= cardIndex).length
            
            return (
              <div
                key={card.id}
                id={card.id}
                className={`relative flex flex-col items-start gap-6 rounded-[6px] border border-[#E4E4E7] bg-white ${card.isSpecial ? 'p-0 border-0 bg-transparent' : ''} ${card.id === 'mpc-identifier' ? 'py-4 px-8' : 'p-8'}`}
              >
                {isLoading ? (
                  <div className="flex flex-col gap-6 w-full">
                    <Skeleton className="h-7 w-72" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <>
                    {!card.isSpecial && !card.hideTitle && <h2 className="text-xl font-semibold">{regularCardIndex}. {card.title}</h2>}

                    <div className="w-full flex flex-col gap-6">
                      {card.fields.map((field) => {
                        if (!shouldShowField(card, field)) return null

                        const shouldBeReadonly = activeTab === 'channel-specific' && (!field.differsOn || !field.differsOn.includes('channel'))
                        const fieldConfig = {
                          ...field,
                          readonly: shouldBeReadonly ? true : field.readonly
                        }

                        return (
                          <div key={field.key} className="w-full">
                            <FormRow label={field.label} required={field.required}>
                              <div className="flex-1 flex items-center gap-3 h-10">
                                <div className="flex-1 h-10">
                                  {renderFieldElement(fieldConfig)}
                                </div>
                                {!card.isSpecial && (
                                  <div className="flex items-center h-10 gap-[var(--Gap-2,8px)] shrink-0">
                                    {field.differsOn ? (
                                      <>
                                        {activeTab === 'default' && (
                                          <>
                                            <CopyAction
                                              field={field.key}
                                              onCopyConfirm={handleCopyConfirm}
                                              disabled={!getProductFieldValue(field.key) || (Array.isArray(getProductFieldValue(field.key)) && getProductFieldValue(field.key).every(v => !v))}
                                              icon={<ClipboardIcon />}
                                            />
                                            {isTranslatable(field) ? (
                                              <TranslateAction
                                                field={field.key}
                                                currentValue={getProductFieldValue(field.key)}
                                                currentLanguage={language}
                                                onTranslateConfirm={handleTranslateConfirm}
                                                disabled={!getProductFieldValue(field.key) || (Array.isArray(getProductFieldValue(field.key)) && getProductFieldValue(field.key).every(v => !v))}
                                              />
                                            ) : (
                                              <div className="h-10 w-10 shrink-0"></div>
                                            )}
                                            <div className="h-10 border-l border-[#E4E4E7]"></div>
                                          </>
                                        )}
                                        {activeTab === 'channel-specific' && isChannelSpecific(field) && (
                                          <>
                                            <button className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer shrink-0">
                                              {false ? <UnlinkIcon /> : <LinkIcon />}
                                            </button>
                                            {isTranslatable(field) ? (
                                              <TranslateAction
                                                field={field.key}
                                                currentValue={getProductFieldValue(field.key)}
                                                currentLanguage={language}
                                                onTranslateConfirm={handleTranslateConfirm}
                                                disabled={!getProductFieldValue(field.key) || (Array.isArray(getProductFieldValue(field.key)) && getProductFieldValue(field.key).every(v => !v))}
                                              />
                                            ) : (
                                              <div className="h-10 w-10 shrink-0"></div>
                                            )}
                                            <div className="h-10 border-l border-[#E4E4E7]"></div>
                                          </>
                                        )}
                                        <AttributeBadge differsOn={field.differsOn} diffLabels={DIFF_LABELS} />
                                      </>
                                    ) : (
                                      <>
                                        <div className="h-10 w-10 shrink-0"></div>
                                        <div className="h-10 w-10 shrink-0"></div>
                                        <div className="h-10 w-px"></div>
                                        <div className="h-10 w-12 shrink-0"></div>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </FormRow>
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}
