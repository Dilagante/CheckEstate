export const getImageUrl = (path) => {
  const base = import.meta.env.BASE_URL || '/'
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path
  
  // Combine base and path
  return `${base}${cleanPath}`
}