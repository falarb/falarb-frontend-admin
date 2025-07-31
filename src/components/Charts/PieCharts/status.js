export const status = [
    {
      label: 'Concluídos',
      value: 42,
      color: '#10B981',
    },
    {
      label: 'Agendados',
      value: 26,
        color: '#ffbe40',
    },
    {
      label: 'Em espera',
      value: 32,
      color: '#ff4040',
    },
    
  ];
  
  export const mobileAndDesktopOS = [
    ...status.map((v) => ({
      ...v,
      label: v.label === 'Other' ? 'Other (Desktop)' : v.label,
    })),
  ];
  
  export const valueFormatterStatus = (item) => `${item.value}%`;