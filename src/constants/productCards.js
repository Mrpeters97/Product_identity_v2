// Product form schema
export const PROVIDER_OPTIONS = [
  { value: 'samsung', label: 'Samsung' },
  { value: 'apple', label: 'Apple' },
  { value: 'garmin', label: 'Garmin' },
  { value: 'other', label: 'Other' },
]

export const PRODUCT_CARDS = [
  {
    id: 'mpc-identifier',
    title: '',
    hideTitle: true,
    fields: [
      {
        key: 'mpcIdentifier',
        label: 'MPC identifier',
        required: false,
        type: 'text',
        readonly: true,
        placeholder: '',
        differsOn: 'variant',
      },
    ],
  },
  {
    id: 'product-information',
    title: 'Product information',
    fields: [
      {
        key: 'name',
        label: 'Product name',
        required: true,
        type: 'text',
        differsOn: 'variant-language',
        placeholder: 'Samsung Galaxy Watch 13',
      },
      {
        key: 'productIdentifier',
        label: 'Product Identifier (SKU)',
        required: false,
        type: 'text',
        differsOn: 'variant',
        placeholder: 'SKU-GW13-BLK-001',
      },
      {
        key: 'brand',
        label: 'Brand',
        required: false,
        type: 'select',
        options: PROVIDER_OPTIONS,
        placeholder: 'Samsung',
      },
      {
        key: 'validPeriod',
        label: 'Valid period',
        required: false,
        type: 'daterange',
        fields: ['validFrom', 'validUntil'],
      },
    ],
  },
  {
    id: 'product-specifications',
    title: 'Product specifications',
    fields: [
      {
        key: 'model',
        label: 'Model',
        required: true,
        type: 'text',
        placeholder: 'Galaxy Watch 13',
      },
      {
        key: 'color',
        label: 'Color',
        required: true,
        type: 'select',
        options: [
          { value: 'black', label: 'Black' },
          { value: 'silver', label: 'Silver' },
          { value: 'gold', label: 'Gold' },
          { value: 'rose-gold', label: 'Rose Gold' },
        ],
        placeholder: 'Select color',
      },
      {
        key: 'materialCase',
        label: 'Case Material',
        required: false,
        type: 'select',
        options: [
          { value: 'stainless-steel', label: 'Stainless Steel' },
          { value: 'aluminum', label: 'Aluminum' },
          { value: 'titanium', label: 'Titanium' },
        ],
        placeholder: 'Select material',
      },
      {
        key: 'displayType',
        label: 'Display Type',
        required: false,
        type: 'text',
        placeholder: 'AMOLED touchscreen',
      },
    ],
  },
  {
    id: 'general-features',
    title: 'General features',
    fields: [
      {
        key: 'waterResistance',
        label: 'Water Resistance',
        required: false,
        type: 'text',
        placeholder: '5ATM / 50m',
      },
      {
        key: 'fitnessTracking',
        label: 'Fitness Tracking',
        required: false,
        type: 'select',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        placeholder: 'Select option',
      },
      {
        key: 'sleepTracking',
        label: 'Sleep Tracking',
        required: false,
        type: 'select',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        placeholder: 'Select option',
      },
      {
        key: 'healthMonitoring',
        label: 'Health Monitoring (Heart Rate, SpO2, etc.)',
        required: false,
        type: 'select',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        placeholder: 'Select option',
      },
    ],
  },
  {
    id: 'technical-specs',
    title: 'Technical specifications',
    fields: [
      {
        key: 'processor',
        label: 'Processor',
        required: false,
        type: 'text',
        placeholder: 'Exynos W930',
      },
      {
        key: 'ram',
        label: 'RAM',
        required: false,
        type: 'text',
        placeholder: '2GB',
      },
      {
        key: 'storage',
        label: 'Storage',
        required: false,
        type: 'text',
        placeholder: '16GB',
      },
      {
        key: 'operatingSystem',
        label: 'Operating System',
        required: false,
        type: 'text',
        placeholder: 'Wear OS',
      },
    ],
  },
  {
    id: 'connectivity',
    title: 'Connectivity',
    fields: [
      {
        key: 'bluetooth',
        label: 'Bluetooth',
        required: false,
        type: 'text',
        placeholder: 'Bluetooth 5.2',
      },
      {
        key: 'wifi',
        label: 'Wi-Fi',
        required: false,
        type: 'select',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        placeholder: 'Select option',
      },
      {
        key: 'nfc',
        label: 'NFC (Contactless Payments)',
        required: false,
        type: 'select',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        placeholder: 'Select option',
      },
      {
        key: 'gps',
        label: 'GPS',
        required: false,
        type: 'select',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        placeholder: 'Select option',
      },
    ],
  },
  {
    id: 'battery-performance',
    title: 'Battery & Performance',
    fields: [
      {
        key: 'batteryCapacity',
        label: 'Battery Capacity',
        required: false,
        type: 'text',
        placeholder: '800 mAh',
      },
      {
        key: 'batteryLife',
        label: 'Battery Life (typical usage)',
        required: false,
        type: 'text',
        placeholder: '3-4 days',
      },
      {
        key: 'chargingTime',
        label: 'Charging Time',
        required: false,
        type: 'text',
        placeholder: '~2 hours',
      },
      {
        key: 'weight',
        label: 'Weight',
        required: false,
        type: 'text',
        placeholder: '33g',
      },
    ],
  },
  {
    id: 'images-media',
    title: 'Images and Media',
    fields: [
      {
        key: 'productImages',
        label: 'Product Images',
        required: false,
        type: 'text',
        placeholder: 'Unique product image URL',
      },
      {
        key: 'productVideo',
        label: 'Product Video',
        required: false,
        type: 'text',
        placeholder: 'YouTube video URL or video file link',
      },
    ],
  },
  {
    id: 'video-reviews',
    title: 'Video reviews',
    fields: [
      {
        key: 'reviewVideo1',
        label: 'Review Video 1',
        required: false,
        type: 'text',
        placeholder: 'Video URL or link',
      },
      {
        key: 'reviewVideo2',
        label: 'Review Video 2',
        required: false,
        type: 'text',
        placeholder: 'Video URL or link',
      },
      {
        key: 'reviewNotes',
        label: 'Review Notes',
        required: false,
        type: 'text',
        placeholder: 'Additional review information',
      },
    ],
  },
]

export const DIFF_LABELS = {
  'variant-channel-language': 'This attributes differs on variant, channel, and language',
  'variant-channel': 'This attribute differs on variant and channel',
  'variant-language': 'This attribute differs on variant and language',
  'variant': 'This attribute differs on variant',
  'channel': 'This attribute differs on channel',
  'channel-local': 'This attribute differs on channel and is local',
}
