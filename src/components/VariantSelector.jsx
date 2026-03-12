import { useProduct } from '../context/ProductContext'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Combobox } from './ui/combobox'

// Channel list
const CHANNELS = [
  'Belsimpel.nl',
  'Gomibo.hu',
  'Gomibo.pl',
  'Gomibo.be',
  'Gomibo.ie',
  'Gomibo.pt',
  'Gomibo.bg',
  'Gomibo.it',
  'Gomibo.ro',
  'Gomibo.cy',
  'Gomibo.hr',
  'Gomibo.si',
  'Gomibo.dk',
  'Gomibo.lv',
  'Gomibo.sk',
  'Gomibo.de',
  'Gomibo.lt',
  'Gomibo.es',
  'Gomibo.ee',
  'Gomibo.lu',
  'Gomibo.cz',
  'Gomibo.fi',
  'Gomibo.mt',
  'Gomibo.co.uk',
  'Gomibo.fr',
  'Gomibo.no',
  'Gomibo.se',
  'Gomibo.gr',
  'Gomibo.at',
  'Gomibo.ch',
]

// Language availability mapping
const LANGUAGE_AVAILABILITY = {
  'English': ['Belsimpel.nl', 'Gomibo.hu', 'Gomibo.pl', 'Gomibo.be', 'Gomibo.ie', 'Gomibo.pt', 'Gomibo.bg', 'Gomibo.it', 'Gomibo.ro', 'Gomibo.cy', 'Gomibo.hr', 'Gomibo.si', 'Gomibo.dk', 'Gomibo.lv', 'Gomibo.sk', 'Gomibo.de', 'Gomibo.lt', 'Gomibo.es', 'Gomibo.ee', 'Gomibo.lu', 'Gomibo.cz', 'Gomibo.fi', 'Gomibo.mt', 'Gomibo.co.uk', 'Gomibo.fr', 'Gomibo.no', 'Gomibo.se', 'Gomibo.gr', 'Gomibo.at', 'Gomibo.ch'],
  'Dutch': ['Belsimpel.nl', 'Gomibo.be'],
  'German': ['Gomibo.de', 'Gomibo.at', 'Gomibo.ch', 'Gomibo.lu'],
  'French': ['Gomibo.fr', 'Gomibo.be', 'Gomibo.ch', 'Gomibo.lu'],
  'Italian': ['Gomibo.it', 'Gomibo.ch'],
}

const LANGUAGES = ['English', 'Dutch', 'German', 'French', 'Italian']

const VARIANTS = [
  { value: '128-black', label: '128 Black' },
  { value: '128-white', label: '128 White' },
  { value: '128-silver', label: '128 Silver' },
  { value: '128-gold', label: '128 Gold' },
  { value: '256-black', label: '256 Black' },
  { value: '256-white', label: '256 White' },
  { value: '256-silver', label: '256 Silver' },
  { value: '256-gold', label: '256 Gold' },
  { value: '512-black', label: '512 Black' },
  { value: '512-white', label: '512 White' },
]

function BoxHeader() {
  return (
    <div className="flex flex-col items-start gap-1 flex-1">
      <h3 className="text-lg font-semibold leading-normal text-foreground">
        Select variant + channel + language
      </h3>
      <p className="text-sm leading-normal text-muted-foreground">
        Select the product variant + channel + language combination to adjust the specific product information.
      </p>
    </div>
  )
}

export default function VariantSelector() {
  const {
    variant,
    channel,
    language,
    handleVariantChange,
    handleChannelChange,
    handleLanguageChange,
  } = useProduct()

  // Get available languages for current channel
  const getAvailableLanguagesForChannel = () => {
    return LANGUAGES.filter(lang => LANGUAGE_AVAILABILITY[lang].includes(channel))
  }

  // Get available channels for current language
  const getAvailableChannelsForLanguage = () => {
    return LANGUAGE_AVAILABILITY[language]
  }

  // Create grouped options for language select
  const getLanguageOptions = () => {
    const available = getAvailableLanguagesForChannel()
    const unavailable = LANGUAGES.filter(lang => !available.includes(lang))

    return [
      {
        label: 'Available on this channel',
        items: available.map(lang => ({ value: lang, label: lang }))
      },
      ...(unavailable.length > 0 ? [{
        label: 'Unavailable on this channel',
        items: unavailable.map(lang => ({ value: lang, label: lang, disabled: true }))
      }] : [])
    ]
  }

  // Create grouped options for channel combobox
  const getChannelOptions = () => {
    const available = getAvailableChannelsForLanguage()
    const unavailable = CHANNELS.filter(ch => !available.includes(ch))

    return [
      {
        label: 'Available in this language',
        items: available.map(ch => ({ value: ch, label: ch }))
      },
      ...(unavailable.length > 0 ? [{
        label: 'Unavailable in this language',
        items: unavailable.map(ch => ({ value: ch, label: ch, disabled: true }))
      }] : [])
    ]
  }

  // Ensure selected language is available for channel, otherwise switch to default
  const handleChannelChangeWithValidation = (newChannel) => {
    handleChannelChange(newChannel)
    const availableLanguages = LANGUAGES.filter(lang => LANGUAGE_AVAILABILITY[lang].includes(newChannel))
    if (!availableLanguages.includes(language)) {
      handleLanguageChange('English')
    }
  }

  // Ensure selected channel is available for language, otherwise switch to first available
  const handleLanguageChangeWithValidation = (newLanguage) => {
    handleLanguageChange(newLanguage)
    const availableChannels = LANGUAGE_AVAILABILITY[newLanguage]
    if (!availableChannels.includes(channel)) {
      handleChannelChange(availableChannels[0])
    }
  }

  const channelOptions = CHANNELS.map(ch => ({ value: ch, label: ch }))
  const languageOptions = LANGUAGES.map(lang => ({ value: lang, label: lang }))

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-[816px] flex flex-col items-start gap-3">
        <BoxHeader />
        <div className="w-full bg-[var(--base-background,#FFF)] rounded-[var(--border-radius-md,6px)] border border-[var(--base-border,#E4E4E7)] py-3 px-6">
          {/* Selectors Container */}
          <div className="flex items-center gap-0">
            {/* Variant Selector */}
            <div className="flex-[5.2] min-w-0">
              <label className="block text-xs font-medium text-foreground mb-2">
                Variant
              </label>
              <Combobox
                options={VARIANTS.map(v => ({ value: v.value, label: v.label }))}
                value={variant}
                onValueChange={handleVariantChange}
                placeholder="Select variant"
              />
            </div>

            {/* divider */}
            <div className="h-14 border-l border-[#E4E4E7] mx-6"></div>

            {/* Channel Combobox */}
            <div className="flex-[2.3] min-w-0">
              <label className="block text-xs font-medium text-foreground mb-2">
                Channel
              </label>
              <Combobox
                options={channelOptions}
                value={channel}
                onValueChange={handleChannelChangeWithValidation}
                placeholder="Select channel"
                groupedOptions={getChannelOptions()}
              />
            </div>

            {/* divider */}
            <div className="h-14 border-l border-[#E4E4E7] mx-6"></div>

            {/* Language Selector */}
            <div className="flex-[2.5] min-w-0">
              <label className="block text-xs font-medium text-foreground mb-2">
                Language
              </label>
              <Select value={language} onValueChange={handleLanguageChangeWithValidation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {getLanguageOptions().map(group => (
                    <SelectGroup key={group.label}>
                      <SelectLabel>{group.label}</SelectLabel>
                      {group.items.map(item => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          disabled={item.disabled}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
