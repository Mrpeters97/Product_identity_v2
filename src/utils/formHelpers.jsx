import React from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Combobox } from '../components/ui/combobox'

/**
 * Renders form field based on field configuration
 */
export const renderField = (fieldConfig, value, handleFieldChange, handleArrayFieldChange, handleAddArrayField, getProductFieldValue) => {
  if (fieldConfig.type === 'text-array') {
    return (
      <div className="flex-1 flex flex-col items-start gap-2">
        {value.map((item, index) => (
          <Input
            key={index}
            type="text"
            value={item}
            onChange={(e) => handleArrayFieldChange(fieldConfig.key, index, e.target.value)}
            placeholder={fieldConfig.placeholder}
            className="w-full"
            required={fieldConfig.required}
          />
        ))}
        <Button size="sm" variant="outline" onClick={() => handleAddArrayField(fieldConfig.key)}>
          <span className="text-sm font-medium">+ Add {fieldConfig.label}</span>
        </Button>
      </div>
    )
  }

  if (fieldConfig.type === 'select') {
    return (
      <div className="flex-1">
        <Combobox
          options={fieldConfig.options}
          value={value}
          onValueChange={(newValue) => handleFieldChange(fieldConfig.key, newValue)}
          placeholder={fieldConfig.placeholder}
        />
      </div>
    )
  }

  if (fieldConfig.type === 'price') {
    return (
      <div className="flex-1 flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(fieldConfig.key, e.target.value)}
            placeholder={fieldConfig.placeholder}
            className="flex-1 pr-12"
            required={fieldConfig.required}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">Eur</span>
        </div>
      </div>
    )
  }

  if (fieldConfig.type === 'speed') {
    return (
      <div className="flex-1 flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(fieldConfig.key, e.target.value)}
            placeholder={fieldConfig.placeholder}
            className="flex-1 pr-12"
            required={fieldConfig.required}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">MB/s</span>
        </div>
      </div>
    )
  }

  if (fieldConfig.type === 'date') {
    return (
      <Input
        type="date"
        value={value || ''}
        onChange={(e) => handleFieldChange(fieldConfig.key, e.target.value)}
        placeholder={fieldConfig.placeholder}
        className="flex-1"
        required={fieldConfig.required}
      />
    )
  }

  if (fieldConfig.type === 'daterange') {
    const fromValue = getProductFieldValue(fieldConfig.fields[0])
    const untilValue = getProductFieldValue(fieldConfig.fields[1])
    
    return (
      <div className="flex-1 flex gap-3 items-center">
        <input
          type="date"
          value={fromValue || ''}
          onChange={(e) => handleFieldChange(fieldConfig.fields[0], e.target.value)}
          className="flex-1 px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={untilValue || ''}
          onChange={(e) => handleFieldChange(fieldConfig.fields[1], e.target.value)}
          className="flex-1 px-3 py-2 border border-[#E4E4E7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    )
  }

  // Default text field
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => handleFieldChange(fieldConfig.key, e.target.value)}
      placeholder={fieldConfig.placeholder}
      className="flex-1"
      required={fieldConfig.required}
      style={value && fieldConfig.key === 'name' ? {
        overflow: 'hidden',
        color: 'var(--base-foreground, #18181B)',
        textOverflow: 'ellipsis',
        fontFamily: 'var(--typography-font-family-font-sans, Inter)',
        fontSize: 'var(--typography-base-sizes-small-font-size, 14px)',
        fontStyle: 'normal',
        fontWeight: 'var(--font-weight-normal, 400)',
        lineHeight: 'var(--typography-base-sizes-small-line-height, 20px)',
      } : {}}
    />
  )
}

/**
 * Get copy mode message
 */
export const getCopyModeMessage = (mode) => {
  const messages = {
    'variants': 'Values successfully copied to all variants',
    'channels': 'Values successfully copied to all variants',
    'all': 'Values successfully copied to all variants'
  }
  return messages[mode] || 'Values successfully copied'
}
