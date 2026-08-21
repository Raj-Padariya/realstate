'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import cmsDataRaw from '@/shared/data/mockCmsData.json';
import { CmsData, PropertyListingItem } from '@/shared/types/cms';

const cmsData = cmsDataRaw as unknown as CmsData;

export interface FullPropertyItem extends PropertyListingItem {
  listingCategory?: 'Rent' | 'Buy' | 'Commercial' | 'Plot';
  societyName?: string;
  buildingName?: string;
  carpetArea?: string;
  furnishing?: string;
  possessionStatus?: string;
  parking?: string;
  balconies?: string;
  bathrooms?: string;
  age?: string;
  description?: string;
  photos?: string[];
  amenities?: string[];
  ownerName?: string;
  ownerPhone?: string;
  ownerRole?: string;
  createdAt?: string | Date;
}

interface PropertyContextType {
  properties: FullPropertyItem[];
  addProperty: (property: Partial<FullPropertyItem>) => FullPropertyItem;
  updateProperty: (id: string, updatedFields: Partial<FullPropertyItem>) => void;
  deleteProperty: (id: string) => void;
  toggleVerification: (id: string) => void;
  getPropertyById: (id: string) => FullPropertyItem | undefined;
  refetchFromDb: () => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const LOCAL_STORAGE_KEY = 'gujjuproperty_listings_v10_live';

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<FullPropertyItem[]>(() => {
    const MOCK_BUILDINGS = [
      'Magnet Lavish',
      'Godrej Garden City',
      'Savvy Swaraaj',
      'Shivalik Highstreet',
      'Panchshil Towers',
      'Balewadi High Street Residences',
      'Adani Shantigram',
      'Runwal Elegante',
      'VIP Plaza Heights',
    ];

    const defaultItems: FullPropertyItem[] = cmsData.listingPage.listings.map((l: any, idx: number) => {
      const building = l.societyName || l.buildingName || MOCK_BUILDINGS[idx % MOCK_BUILDINGS.length];
      const cat = l.listingCategory || (l.price.includes('/mo') ? 'Rent' : l.title.toLowerCase().includes('plot') ? 'Plot' : 'Buy');
      return {
        ...l,
        societyName: building,
        buildingName: building,
        listingCategory: cat,
        photos: l.photos && l.photos.length > 0 ? l.photos : [
          l.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['Lift', 'Power backup', 'Covered parking', 'Gated security', '24×7 water', 'Clubhouse'],
        ownerName: l.ownerName || 'Sandeep Kumar (Owner)',
        ownerPhone: l.ownerPhone || '+91 98XXX XXXXX',
        ownerRole: l.ownerRole || 'Individual Owner',
        description: l.description || 'Spacious verified property directly from owner with zero brokerage fees. Excellent connectivity and top-tier amenities.',
      };
    });

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Merge default items so newly added default listings (like Ahmedabad) are included
            const existingIds = new Set(parsed.map((p: any) => p.id));
            const missingDefaults = defaultItems.filter((d) => !existingIds.has(d.id));
            return [...missingDefaults, ...parsed];
          }
        }
      } catch (err) {}
    }

    return defaultItems;
  });

  const refetchFromDb = async () => {
    try {
      await fetch('/api/seed').catch(() => null);
      const res = await fetch('/api/properties');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProperties((prev) => {
            // Merge DB items with existing local items so user posted items aren't overwritten
            const existingIds = new Set(data.map((d: any) => d.id));
            const localOnly = prev.filter((p) => !existingIds.has(p.id));
            const merged = [...data, ...localOnly];
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
        }
      }
    } catch (err) {
      console.warn('API fetch error, using local state:', err);
    }
  };

  // On mount, load from SQL Database API
  useEffect(() => {
    refetchFromDb();
  }, []);

  const saveProperties = (newList: FullPropertyItem[]) => {
    setProperties(newList);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newList));
    } catch (err) {
      console.error('Error saving properties', err);
    }
  };

  const addProperty = (newProp: Partial<FullPropertyItem>): FullPropertyItem => {
    const newId = `prop-${Date.now()}`;
    const mainImg = newProp.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';
    const galleryPhotos = newProp.photos && newProp.photos.length > 0 ? newProp.photos : [mainImg];

    const fullProp: FullPropertyItem = {
      id: newId,
      listingCategory: newProp.listingCategory || (newProp.price?.includes('/mo') ? 'Rent' : 'Buy'),
      title: newProp.title || 'New Verified Property Listing',
      price: newProp.price || '₹85 Lakh',
      pricePerSqFt: newProp.pricePerSqFt || '₹7,200 / sq.ft',
      address: newProp.address || 'Baner, Pune, Maharashtra',
      bhk: newProp.bhk || '2 BHK',
      areaSqFt: newProp.areaSqFt || '1,100 sq.ft',
      floorInfo: newProp.floorInfo || '4th / 10',
      facing: newProp.facing || 'East',
      chips: newProp.chips || [newProp.furnishing || 'Semi-furnished', 'Ready to move', 'Covered parking'],
      badgeText: newProp.badgeText || 'Owner verified',
      createdAt: (newProp as any)?.createdAt || new Date().toISOString(),
      postedTime: 'Just now',
      photoCount: galleryPhotos.length,
      image: mainImg,
      photos: galleryPhotos,
      amenities: newProp.amenities || ['Lift', 'Power backup', 'Covered parking', 'Gated security', '24×7 water'],
      carpetArea: newProp.carpetArea || '850 sq.ft',
      possessionStatus: newProp.possessionStatus || 'Ready to Move',
      parking: newProp.parking || '1 Covered Parking',
      balconies: newProp.balconies || '2 Balconies',
      bathrooms: newProp.bathrooms || '2 Bathrooms',
      age: newProp.age || 'New Launch',
      description: newProp.description || 'Newly added property with zero brokerage.',
      ownerName: newProp.ownerName || 'Sandeep Kumar',
      ownerPhone: newProp.ownerPhone || '+91 98XXX XXXXX',
      ownerRole: newProp.ownerRole || 'Individual Owner',
    };

    const updated = [fullProp, ...properties];
    saveProperties(updated);

    // Async persist to SQL DB API
    fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullProp),
    }).catch((err) => console.error('SQL DB API POST error:', err));

    return fullProp;
  };

  const updateProperty = (id: string, updatedFields: Partial<FullPropertyItem>) => {
    const updated = properties.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          ...updatedFields,
          image: updatedFields.image || p.image,
          photos: updatedFields.photos && updatedFields.photos.length > 0 ? updatedFields.photos : p.photos,
        };
      }
      return p;
    });
    saveProperties(updated);

    // Async persist to SQL DB API
    fetch(`/api/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields),
    }).catch((err) => console.error('SQL DB API PUT error:', err));
  };

  const deleteProperty = (id: string) => {
    const updated = properties.filter((p) => p.id !== id);
    saveProperties(updated);

    // Async persist to SQL DB API
    fetch(`/api/properties/${id}`, {
      method: 'DELETE',
    }).catch((err) => console.error('SQL DB API DELETE error:', err));
  };

  const toggleVerification = (id: string) => {
    const updated = properties.map((p) => {
      if (p.id === id) {
        const isVer = p.badgeText === 'Owner verified';
        const newBadge = isVer ? 'Title checked' : 'Owner verified';
        // Async update to DB
        fetch(`/api/properties/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ badgeText: newBadge }),
        }).catch(() => null);

        return {
          ...p,
          badgeText: newBadge,
        };
      }
      return p;
    });
    saveProperties(updated);
  };

  const getPropertyById = (id: string) => {
    return properties.find((p) => p.id === id);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        toggleVerification,
        getPropertyById,
        refetchFromDb,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}
