'use client';

import React, { useState, useRef } from 'react';

export interface ImageUploaderProps {
  photos: string[];
  onChange?: (newPhotos: string[]) => void;
  onPhotosChange?: (newPhotos: string[]) => void;
  mainImage?: string;
  onMainImageChange?: (mainUrl: string) => void;
}

const STOCK_REALESTATE_PHOTOS = [
  { label: 'Modern Exterior', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80' },
  { label: 'Luxury Villa', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80' },
  { label: 'Residential Complex', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
  { label: 'Spacious Living Room', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Modular Kitchen', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Master Bedroom', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80' },
  { label: 'Balcony View', url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Swimming Pool', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' },
];

export function ImageUploader({
  photos,
  onChange,
  onPhotosChange,
  mainImage,
  onMainImageChange,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showStockModal, setShowStockModal] = useState(false);

  const notifyChange = (newPhotos: string[]) => {
    if (onChange) onChange(newPhotos);
    if (onPhotosChange) onPhotosChange(newPhotos);
  };

  // Read local image files as Data URLs
  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          notifyChange([...photos, result]);
          if (!mainImage && onMainImageChange) {
            onMainImageChange(result);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    notifyChange([...photos, urlInput.trim()]);
    if (!mainImage && onMainImageChange) {
      onMainImageChange(urlInput.trim());
    }
    setUrlInput('');
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    const updated = photos.filter((_, idx) => idx !== indexToRemove);
    notifyChange(updated);
  };

  const handleSetMainCover = (url: string) => {
    if (onMainImageChange) {
      onMainImageChange(url);
    }
  };

  const handlePickStockPhoto = (url: string) => {
    if (!photos.includes(url)) {
      notifyChange([...photos, url]);
      if (!mainImage && onMainImageChange) {
        onMainImageChange(url);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* DRAG AND DROP ZONE */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: isDragging ? '2px dashed var(--brand)' : '2px dashed var(--line)',
          borderRadius: '12px',
          padding: '32px 20px',
          textAlign: 'center',
          background: isDragging ? 'var(--brand-lt)' : '#fafbfc',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <div style={{ fontSize: '36px', marginBottom: '8px' }}>📁</div>
        <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--ink)' }}>
          Drag &amp; Drop Property Photos Here
        </div>
        <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
          or <b style={{ color: 'var(--brand)', textDecoration: 'underline' }}>Browse files from device</b> (.jpg, .png, .webp)
        </div>
        <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn line"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            style={{ padding: '6px 14px', fontSize: '13px' }}
          >
            💻 Choose Local Files
          </button>
          <button
            type="button"
            className="btn line"
            onClick={(e) => {
              e.stopPropagation();
              setShowStockModal(!showStockModal);
            }}
            style={{ padding: '6px 14px', fontSize: '13px' }}
          >
            🖼️ Select from Sample Photos
          </button>
        </div>
      </div>

      {/* SAMPLE STOCK PHOTO PICKER GRID */}
      {showStockModal && (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontWeight: '800', fontSize: '13.5px', color: 'var(--brand)' }}>
              Click any photo to add to listing gallery:
            </span>
            <button
              type="button"
              onClick={() => setShowStockModal(false)}
              style={{ background: 'none', border: 0, cursor: 'pointer', fontWeight: '700', fontSize: '14px', color: 'var(--muted)' }}
            >
              ✕ Close
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
            {STOCK_REALESTATE_PHOTOS.map((ph, i) => {
              const isAdded = photos.includes(ph.url);
              return (
                <div
                  key={i}
                  onClick={() => handlePickStockPhoto(ph.url)}
                  style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: isAdded ? '2px solid var(--green)' : '1px solid var(--line)',
                  }}
                >
                  <img src={ph.url} alt={ph.label} style={{ width: '100%', height: '80px', objectFit: 'cover' }} />
                  <div style={{ padding: '4px', fontSize: '10.5px', fontWeight: '700', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', background: '#fff' }}>
                    {isAdded ? '✓ Added' : ph.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* URL INPUT OPTION */}
      <form onSubmit={handleAddUrl} style={{ display: 'flex', gap: '10px' }}>
        <input
          placeholder="Paste image URL directly (e.g. https://...)"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          style={{ flex: 1, padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13.5px' }}
        />
        <button
          type="submit"
          style={{
            background: 'var(--brand-lt)',
            color: 'var(--brand)',
            border: '1px solid var(--brand)',
            padding: '10px 16px',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '13.5px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          ➕ Add URL
        </button>
      </form>

      {/* GALLERY PREVIEW GRID WITH REMOVE / COVER OPTION */}
      {photos.length > 0 && (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontWeight: '800', fontSize: '13.5px', color: 'var(--ink)', marginBottom: '10px' }}>
            Gallery Photos ({photos.length} uploaded) · Drag or click ⭐ to set cover photo:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
            {photos.map((url, idx) => {
              const isMain = mainImage === url || idx === 0;
              return (
                <div
                  key={idx}
                  style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: isMain ? '2px solid var(--brand)' : '1px solid var(--line)',
                    background: '#f8f9fa',
                  }}
                >
                  <img
                    src={url}
                    alt={`Gallery ${idx + 1}`}
                    style={{ width: '100%', height: '90px', objectFit: 'cover' }}
                  />

                  {isMain && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '4px',
                        left: '4px',
                        background: 'var(--brand)',
                        color: '#fff',
                        fontSize: '9.5px',
                        fontWeight: '800',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      Cover Photo
                    </span>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '4px 6px',
                      background: '#fff',
                      borderTop: '1px solid var(--line)',
                    }}
                  >
                    {onMainImageChange && !isMain && (
                      <button
                        type="button"
                        onClick={() => handleSetMainCover(url)}
                        title="Set as Main Cover Photo"
                        style={{ background: 'none', border: 0, cursor: 'pointer', fontSize: '11px', color: 'var(--brand)', fontWeight: '700' }}
                      >
                        ⭐ Cover
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      title="Remove Photo"
                      style={{ background: 'none', border: 0, cursor: 'pointer', fontSize: '11px', color: '#dc2626', fontWeight: '700', marginLeft: 'auto' }}
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
