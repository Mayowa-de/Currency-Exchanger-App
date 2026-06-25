const flags = import.meta.glob('../assets/images/flags/*.webp', { eager: true }, as 'url');

export const getFlag = (code) =>{
   const country = code.slice(0, 2).toLowerCase()
   const key = `../assets/images/flags/${country}.webp`
   return flags[key];
}
