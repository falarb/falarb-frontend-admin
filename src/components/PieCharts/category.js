
  export const category = [
    {
      label: 'Bueiro',
      value: 42,
      color: '#a110b9',
    },
    {
      label: 'Estrada',
      value: 26,
        color: '#10b981',
    },
    {
      label: 'Iluminação',
      value: 32,
      color: '#1049b9',
    },
    {
      label: 'Iluminação',
      value: 32,
      color: '#a1b910',
    },
    {
      label: 'Iluminação',
      value: 32,
      color: '#b93910',
    },
    {
      label: 'Iluminação',
      value: 32,
      color: '#b91061',
    },
  ];
  
  export const mobileAndDesktopOS = [
    ...category.map((v2) => ({
      ...v2,
      label: v2.label === 'Other' ? 'Other (Desktop)' : v2.label,
    })),
  ];
  
  export const valueFormatterCategory = (item) => `${item.value}%`;