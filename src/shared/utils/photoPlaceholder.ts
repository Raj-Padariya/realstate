/**
 * Clean SVG Data URI placeholder displayed when an owner posts a property without uploading photos.
 * Replaces random stock photos with an explicit, professional "No Photos Uploaded" graphic.
 */
export const NO_PHOTO_PLACEHOLDER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="none"><rect width="800" height="600" fill="%23EFE9FB"/><rect x="220" y="150" width="360" height="260" rx="24" fill="%23FFFFFF" stroke="%23522AB0" stroke-width="4"/><path d="M340 230C340 218.954 348.954 210 360 210H440C451.046 210 460 218.954 460 230V235H340V230Z" fill="%23522AB0"/><circle cx="400" cy="300" r="48" stroke="%23522AB0" stroke-width="8" fill="none"/><circle cx="400" cy="300" r="22" fill="%23FEDC00"/><text x="400" y="460" font-family="system-ui, sans-serif" font-size="24" font-weight="800" fill="%231C1F23" text-anchor="middle">No Photos Uploaded</text><text x="400" y="495" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="%236C757D" text-anchor="middle">Contact owner directly to request property images</text></svg>`;

export function isNoPhotoPlaceholder(url?: string): boolean {
  if (!url) return true;
  return url.startsWith('data:image/svg+xml') || url.includes('No%20Photos') || url.includes('placeholder');
}
