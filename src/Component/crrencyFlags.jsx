const flags = import.meta.glob('../assets/images/flags/*.webp', { eager: true });

export const getFlag = (code) =>{
   const key = `../../assets/flags/${code.toLowerCase()}.webp`
   return flags[key]?.default;
}
