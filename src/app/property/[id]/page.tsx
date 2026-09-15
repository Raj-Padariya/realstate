'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import cmsDataRaw from '@/shared/data/mockCmsData.json';
import { CmsData } from '@/shared/types/cms';
import { useProperties } from '@/shared/context/PropertyContext';
import PropertyMap from '@/components/common/PropertyMap';
import { getNearbyLandmarks } from '@/shared/utils/locationLandmarks';
import LocationSearchInput from '@/components/common/LocationSearchInput';
import { NO_PHOTO_PLACEHOLDER, isNoPhotoPlaceholder } from '@/shared/utils/photoPlaceholder';
import { formatPostedOn } from '@/shared/utils/dateUtils';
import { extractLocationParts } from '@/shared/utils/locationUtils';
import { Building2, MapPin, Home, LandPlot, Check, CheckCircle2, ArrowRight, ShieldCheck, Phone, User, Mail, X, Sparkles, Clock, Lock, Calendar, Heart } from 'lucide-react';
import { useLeads } from '@/shared/context/LeadsContext';

const cmsData = cmsDataRaw as unknown as CmsData;

const GALLERY_PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', label: 'Building Exterior' },
  { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', label: 'Living Room' },
  { url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80', label: 'Master Bedroom' },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', label: 'Modular Kitchen' },
  { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', label: 'Balcony View' },
];

const OVICON: Record<string, string> = {
  cake: 'M4 20.5h16M5 20.5v-6.2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6.2M12 12.3V9M12 6.4V4.5M8.5 12.3v-2M15.5 12.3v-2',
  owner: 'M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z M12 12.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8z',
  rupee: 'M7 5h10M7 9h10M13.5 5c2.4 0 4 1.7 4 3.8s-1.6 3.8-4 3.8H7l8 7.4',
  tile: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  build: 'M5 21V6.5l7-3.5 7 3.5V21M9 21v-4.5h6V21M8.5 9.5h2M13.5 9.5h2M8.5 13h2M13.5 13h2',
  carpet: 'M3.5 6.5h17v11h-17z M3.5 10h6v7.5M13 6.5v4h7.5',
  shield: 'M12 3l7.4 2.9v5.4c0 4.6-3.1 8-7.4 9.6-4.3-1.6-7.4-5-7.4-9.6V5.9z M9 12.2l2.2 2.2 4-4.3',
  drop: 'M12 3s6 6.6 6 10.5A6 6 0 0 1 6 13.5C6 9.6 12 3 12 3z',
  bank: 'M3.5 9.5 12 4.5l8.5 5M5 9.5V18M9.5 9.5V18M14.5 9.5V18M19 9.5V18M3 21h18',
  sofa: 'M4.5 13V9.2a2 2 0 0 1 4 0V13M15.5 13V9.2a2 2 0 0 1 4 0V13M4 13h16v4.4H4z M6.5 17.4v2.2M17.5 17.4v2.2',
  facing: 'M12 3.2a8.8 8.8 0 1 0 0 17.6 8.8 8.8 0 0 0 0-17.6z M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z',
  floor: 'M4 20h16M6.5 20V9.5h5V20M13 20V4h5v16',
  car: 'M5 17h14M6.2 17V9.4l1.8-3.6h8l1.8 3.6V17M8 13h8M7.5 17v2.2M16.5 17v2.2',
  cal: 'M4.5 6.5h15v13h-15z M4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  tower: 'M6 21V7.5l6-3.5 6 3.5V21M9.5 11h1.5M13 11h1.5M9.5 14.5h1.5M13 14.5h1.5M10.5 21v-3h3v3',
};

const SPECICON: Record<string, string> = {
  bed: 'M3 18v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5M3 18h18M3 18v2M21 18v2M6.5 11V8.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V11',
  bath: 'M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM7 12V6.5a2 2 0 0 1 4 0M6 19l-1.2 2.2M18 19l1.2 2.2',
  area: 'M4 4h16v16H4z M8 4v3.5M4 8h3.5M16 20v-3.5M20 16h-3.5',
  floor: 'M4 20h16M6.5 20V9.5h5V20M13 20V4h5v16',
  facing: 'M12 3.2a8.8 8.8 0 1 0 0 17.6 8.8 8.8 0 0 0 0-17.6z M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z',
  sofa: 'M4.5 13V9.2a2 2 0 0 1 4 0V13M15.5 13V9.2a2 2 0 0 1 4 0V13M4 13h16v4.4H4z M6.5 17.4v2.2M17.5 17.4v2.2',
  key: 'M15.2 6.6a4.2 4.2 0 1 0-3.6 7.1l-1.3 1.3-1.5-1.5-1.5 1.5-1.5-1.5L4 15.5V19h3.5l4.2-4.2a4.2 4.2 0 0 0 3.5-8.2z M16.4 8.2h.01',
  cal: 'M4.5 6.5h15v13h-15z M4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  balcony: 'M4 20.5V11h16v9.5M4 11V8h16v3M7.5 20.5V14M12 20.5V14M16.5 20.5V14',
  car: 'M5 17h14M6.2 17V9.4l1.8-3.6h8l1.8 3.6V17M8 13h8M7.5 17v2.2M16.5 17v2.2',
  power: 'M3 8.5h13a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3zM20.5 11v2M9.5 9.5 7.5 13h3l-2 3.5',
  clock: 'M12 3.2a8.8 8.8 0 1 0 0 17.6 8.8 8.8 0 0 0 0-17.6z M12 7.2V12l3 2',
};

const AMEN_ICONS: Record<string, string> = {
  'Lift': 'M6 2.5h12v19H6z M9.5 8 12 5.2 14.5 8M9.5 16l2.5 2.8L14.5 16',
  'Power backup': 'M13 2 4.5 14H11l-1 8 8.5-12H12z',
  'Covered parking': 'M5 17.5h14M6.3 17.5V9.6L8 6h8l1.7 3.6v7.9M8 13h8M7.5 17.5v2.2M16.5 17.5v2.2M3 6.5 12 2l9 4.5',
  'Gated security': 'M12 2.6 19.2 5.4v5.3c0 4.5-3 7.9-7.2 9.4-4.2-1.5-7.2-4.9-7.2-9.4V5.4z M9.2 11.9l2.2 2.2 4-4.3',
  '24×7 water': 'M5 6h7v3H5z M12 7.5h4.5v4M16.5 11.5c0 2.5-2 3-2 5.5M8.5 9v3M8.5 15.5c0 1.5 1 2.5 1 4',
  'Clubhouse': 'M3.5 20.5V10L12 4l8.5 6v10.5z M9 20.5V14h6v6.5M2 20.5h20',
  'Gym': 'M4 9v6M20 9v6M7 5.5v13M17 5.5v13M7 12h10',
  'Swimming pool': 'M2.5 17.5c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 3 2M6 14.5V6a2.2 2.2 0 0 1 4.4 0M13.6 14.5V6A2.2 2.2 0 0 1 18 6M6 9.5h4.4M13.6 9.5H18',
  "Kids' play area": 'M12 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z M12 7.5v5M8 20.5l4-8 4 8M6.5 12h11',
  'Landscaped garden': 'M12 21v-6.5M12 14.5c-3.5 0-5.5-2-5.5-5.5 3.5 0 5.5 2 5.5 5.5z M12 14.5c3.5 0 5.5-2 5.5-5.5-3.5 0-5.5 2-5.5 5.5z M12 9c0-2.5 1.5-4.5 3-5.5',
  'Jogging track': 'M3.5 19.5c3-6 6-9 9-9s5.5 2 8 6M14.5 5.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z M8 14.5l3-3.5 3 2 2 4M11 11 9.5 7.5l3.5-1.5 2.5 2.5 2.5.5',
  'Indoor games': 'M8 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M16 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M11.5 12h1M6.5 12h.01M9.5 12h.01',
};

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const propertyId = params?.id || 'prop-1';
  const { getPropertyById, isPropertySaved, toggleSaveProperty } = useProperties();

  const [asyncFetched, setAsyncFetched] = useState<any>(null);
  const matchedListing = getPropertyById(propertyId) || asyncFetched;
  const baseDetail = cmsData.propertyDetail;

  useEffect(() => {
    if (!getPropertyById(propertyId)) {
      fetch(`/api/properties/${propertyId}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && !data.error) {
            setAsyncFetched(data);
          }
        })
        .catch(() => null);
    }
  }, [propertyId]);

  const hasRealPhotos = Boolean(
    (matchedListing?.photos && matchedListing.photos.length > 0 && !isNoPhotoPlaceholder(matchedListing.photos[0])) ||
    (matchedListing?.image && !isNoPhotoPlaceholder(matchedListing.image))
  );

  const galleryPhotos = hasRealPhotos
    ? (matchedListing?.photos && matchedListing.photos.length > 0
        ? matchedListing.photos.map((url: string, idx: number) => ({ url, label: `Photo ${idx + 1}` }))
        : GALLERY_PHOTOS)
    : [{ url: NO_PHOTO_PLACEHOLDER, label: 'No Photos Uploaded' }];

  const mainImage = hasRealPhotos
    ? (matchedListing?.image || galleryPhotos[0]?.url || GALLERY_PHOTOS[0].url)
    : NO_PHOTO_PLACEHOLDER;

  const resolvedSocietyName =
    (matchedListing as any)?.societyName ||
    (matchedListing as any)?.buildingName ||
    (matchedListing?.address && matchedListing.address.includes(',')
      ? matchedListing.address.split(',')[0]
      : 'Magnet Lavish');

  const property = {
    ...baseDetail,
    id: propertyId,
    societyName: resolvedSocietyName,
    buildingName: resolvedSocietyName,
    title: matchedListing?.title || baseDetail.title,
    price: matchedListing?.price || baseDetail.price,
    address: matchedListing?.address || baseDetail.address,
    pricePerSqFt: matchedListing?.pricePerSqFt || baseDetail.pricePerSqFt,
    builtUpArea: matchedListing?.areaSqFt || baseDetail.builtUpArea,
    carpetArea: matchedListing?.carpetArea || matchedListing?.areaSqFt || '1,080 sq.ft',
    description: matchedListing?.description || baseDetail.description,
    isResale: matchedListing?.listingCategory === 'Buy' || !matchedListing?.price.includes('/mo'),
    ownerInfo: {
      name: matchedListing?.ownerName || 'Individual Owner',
      phone: matchedListing?.ownerPhone || '+91 98XXX XXXXX',
      role: matchedListing?.ownerRole || 'Individual Owner',
      avatarInitial: (matchedListing?.ownerName || 'O').charAt(0).toUpperCase(),
      isVerified: true,
      note: 'You are contacting the owner directly. GujjuProperty charges no brokerage on this listing.',
    },
    specs: (() => {
      const isPlot = matchedListing?.listingCategory === 'Plot';
      const isCommercial = matchedListing?.listingCategory === 'Commercial';
      const postedOn = formatPostedOn((matchedListing as any)?.createdAt || matchedListing?.postedTime || 'Just now');

      if (isPlot) {
        const plotAreaVal = matchedListing?.areaSqFt || (matchedListing as any)?.plotArea || 'Plot area';
        return [
          { key: 'Plot / Land', value: matchedListing?.bhk || 'Plot', icon: 'tile' },
          { key: 'Posted on', value: postedOn, icon: 'cal' },
          { key: 'Plot Area', value: plotAreaVal, icon: 'area' },
          { key: 'Possession', value: matchedListing?.possessionStatus || 'Ready to Register', icon: 'key' },
          { key: 'Title Status', value: (matchedListing as any)?.titleStatus || matchedListing?.floorInfo || 'Clear Title', icon: 'shield' },
          { key: 'Facing', value: matchedListing?.facing || 'East', icon: 'facing' },
          { key: 'Road Width', value: (matchedListing as any)?.roadWidth || '40 ft Road', icon: 'floor' },
          { key: 'Village / Locality', value: (matchedListing as any)?.locality || matchedListing?.address?.split(',')[0] || '—', icon: 'facing' },
          { key: 'Zone', value: (matchedListing as any)?.zone || '—', icon: 'tile' },
          { key: 'TP Scheme', value: (matchedListing as any)?.tpScheme || '—', icon: 'build' },
          { key: 'Linear / Non-Linear', value: (matchedListing as any)?.linearType || '—', icon: 'build' },
          { key: 'Age of property', value: matchedListing?.age || 'New launch', icon: 'clock' },
        ];
      }

      if (isCommercial) {
        return [
          { key: 'Type', value: matchedListing?.bhk || 'Commercial', icon: 'build' },
          { key: 'Posted on', value: postedOn, icon: 'cal' },
          { key: 'Built-up area', value: matchedListing?.areaSqFt || '—', icon: 'area' },
          { key: 'Carpet area', value: matchedListing?.carpetArea || matchedListing?.areaSqFt || '—', icon: 'carpet' },
          { key: 'Possession', value: matchedListing?.possessionStatus || 'Ready to move', icon: 'key' },
          { key: 'Parking', value: matchedListing?.parking || 'Available', icon: 'car' },
          { key: 'Floor', value: matchedListing?.floorInfo || 'Ground', icon: 'floor' },
          { key: 'Facing', value: matchedListing?.facing || 'East', icon: 'facing' },
          { key: 'Power backup', value: 'Full backup', icon: 'power' },
          { key: 'Furnishing', value: matchedListing?.furnishing || matchedListing?.chips?.[0] || 'Bare shell', icon: 'sofa' },
          { key: 'Age of property', value: matchedListing?.age || 'New launch', icon: 'clock' },
        ];
      }

      return [
        { key: 'No. of bedrooms', value: matchedListing?.bhk || '3 BHK', icon: 'bed' },
        { key: 'Posted on', value: postedOn, icon: 'cal' },
        { key: 'No. of bathrooms', value: matchedListing?.bathrooms || '2 Bath', icon: 'bath' },
        { key: 'Possession', value: matchedListing?.possessionStatus || 'Ready to move', icon: 'key' },
        { key: 'Balcony', value: matchedListing?.balconies || '2 Balcony', icon: 'balcony' },
        { key: 'Built-up area', value: matchedListing?.areaSqFt || '1,420 sq.ft', icon: 'area' },
        { key: 'Parking', value: matchedListing?.parking || 'Covered parking', icon: 'car' },
        { key: 'Power backup', value: 'Full backup', icon: 'power' },
        { key: 'Floor', value: matchedListing?.floorInfo || 'Ground / 4', icon: 'floor' },
        { key: 'Facing', value: matchedListing?.facing || 'East', icon: 'facing' },
        { key: 'Furnishing', value: matchedListing?.furnishing || matchedListing?.chips?.[0] || 'Semi-furnished', icon: 'sofa' },
        { key: 'Age of property', value: matchedListing?.age || 'New launch', icon: 'clock' },
      ];
    })(),
    overview: (() => {
      const isPlot = matchedListing?.listingCategory === 'Plot';
      const isCommercial = matchedListing?.listingCategory === 'Commercial';

      if (isPlot) {
        return [
          { label: 'Plot / Land Type', value: matchedListing?.bhk || 'Plot' },
          { label: 'Plot Area', value: matchedListing?.areaSqFt || (matchedListing as any)?.plotArea || '—' },
          { label: 'Village / Locality', value: (matchedListing as any)?.locality || matchedListing?.address?.split(',')[0] || '—' },
          { label: 'Zone', value: (matchedListing as any)?.zone || '—' },
          { label: 'TP Scheme', value: (matchedListing as any)?.tpScheme || '—' },
          { label: 'Linear / Non-Linear', value: (matchedListing as any)?.linearType || '—' },
          { label: 'Title Status', value: (matchedListing as any)?.titleStatus || matchedListing?.floorInfo || 'Clear Title' },
          { label: 'Facing', value: matchedListing?.facing || 'East facing' },
          { label: 'Road Width', value: (matchedListing as any)?.roadWidth || '40 ft Road' },
          { label: 'Possession', value: matchedListing?.possessionStatus || 'Immediate' },
        ];
      }

      if (isCommercial) {
        return [
          { label: 'Type', value: matchedListing?.bhk || 'Commercial' },
          { label: 'Super built-up area', value: matchedListing?.areaSqFt || '—' },
          { label: 'Carpet area', value: matchedListing?.carpetArea || matchedListing?.areaSqFt || '—' },
          { label: 'Floor', value: matchedListing?.floorInfo || 'Ground' },
          { label: 'Facing', value: matchedListing?.facing || 'East facing' },
          { label: 'Furnishing', value: matchedListing?.furnishing || 'Bare shell' },
          { label: 'Property age', value: matchedListing?.age || 'New' },
          { label: 'Possession', value: matchedListing?.possessionStatus || 'Immediate' },
          { label: 'Parking', value: matchedListing?.parking || 'Available' },
          { label: 'Power backup', value: 'Full backup' },
        ];
      }

      return [
        { label: 'Super built-up area', value: matchedListing?.areaSqFt || '1,420 sq.ft' },
        { label: 'Carpet area', value: matchedListing?.carpetArea || matchedListing?.areaSqFt || '1,080 sq.ft' },
        { label: 'Bedrooms', value: matchedListing?.bhk || '3 BHK' },
        { label: 'Bathrooms', value: matchedListing?.bathrooms || '2 Bath' },
        { label: 'Balconies', value: matchedListing?.balconies || '2 Balconies' },
        { label: 'Floor', value: matchedListing?.floorInfo || 'Ground / 4' },
        { label: 'Facing', value: matchedListing?.facing || 'East facing' },
        { label: 'Property age', value: matchedListing?.age || '1-3 years' },
        { label: 'Possession', value: matchedListing?.possessionStatus || 'Immediate' },
        { label: 'Parking', value: matchedListing?.parking || 'Covered' },
      ];
    })(),
    amenities: matchedListing?.amenities && matchedListing.amenities.length > 0
      ? matchedListing.amenities
      : ['Lift', 'Power backup', 'Covered parking', 'Gated security', '24×7 water', 'Clubhouse'],
  };

  const [galIdx, setGalIdx] = useState(0);
  const [galTab, setGalTab] = useState<'photos' | 'location'>('photos');
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const [showAllAmen, setShowAllAmen] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);

  const currentPhoto = galleryPhotos[galIdx] || { url: mainImage, label: 'Property View' };

  const galStep = (delta: number) => {
    setGalIdx((prev) => (prev + delta + galleryPhotos.length) % galleryPhotos.length);
  };

  const isRentListing = matchedListing?.listingCategory === 'Rent' || matchedListing?.price?.includes('/mo');

  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [searchTag, setSearchTag] = useState(property.address);

  const handleSearchSubmit = (queryStr?: string) => {
    const target = queryStr || searchInput || searchTag;
    if (target) {
      router.push(`/properties?q=${encodeURIComponent(target)}`);
    }
  };

  const { addLead } = useLeads();
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [visitForm, setVisitForm] = useState({ name: '', phone: '', date: '', time: 'Morning (10 AM - 1 PM)' });
  const [visitSubmitted, setVisitSubmitted] = useState(false);

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      name: visitForm.name,
      phone: visitForm.phone,
      city: property.address?.split(',').slice(-1)[0]?.trim() || 'Gujarat / India',
      type: 'site-visit',
      source: `Property Detail #${property.id}`,
      details: {
        'Property Title': property.title,
        'Price': property.price,
        'Address': property.address,
        'Preferred Date': visitForm.date || 'Earliest available',
        'Time Slot': visitForm.time,
      }
    });
    setVisitSubmitted(true);
  };

  // OWNER CONCIERGE CONNECT MODAL STATE
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [connectForm, setConnectForm] = useState({
    name: '',
    phone: '',
    email: '',
    intent: 'Immediate Purchase (Ready Funds / Loan)',
    message: '',
  });
  const [connectSubmitted, setConnectSubmitted] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string>('');

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectForm.name.trim() || !connectForm.phone.trim()) return;

    const newLead = addLead({
      type: 'owner-connect',
      name: connectForm.name,
      phone: connectForm.phone,
      email: connectForm.email,
      city: property.address?.split(',').slice(-1)[0]?.trim() || 'Gujarat / India',
      source: `Direct Owner Connect Desk (${property.title})`,
      details: {
        buyerIntent: connectForm.intent,
        buyerMessage: connectForm.message || 'Direct owner connection requested.',
        ownerName: property.ownerInfo.name || 'Verified Owner',
        ownerPhone: property.ownerInfo.phone || '+91 98765 43210',
        propertyId: property.id,
        propertyTitle: property.title,
        propertyPrice: property.price,
        propertyLocation: property.address,
        propertyType: (property as any).type || 'Residential',
      },
      notes: `Buyer ${connectForm.name} requested direct contact with owner ${property.ownerInfo.name}.`,
    });

    setSubmittedLeadId(newLead.id);
    setConnectSubmitted(true);
  };

  // LOCK BACKGROUND BODY SCROLL WHEN ANY MODAL IS OPEN
  useEffect(() => {
    if (connectModalOpen || visitModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || '';
      };
    }
  }, [connectModalOpen, visitModalOpen]);

  return (
    <>
      {/* SEARCH / NAVIGATION BAR */}
      <div className="filterbar">
        <div className="wrap fbrow">
          <LocationSearchInput
            value={searchInput}
            onChange={(val) => setSearchInput(val)}
            onSelectLocation={(locName) => {
              setSearchTag(locName);
              handleSearchSubmit(locName);
            }}
            onSearch={() => handleSearchSubmit()}
            placeholder="Type city, locality, village or landmark across All India…"
            searchTag={searchTag}
            onRemoveTag={() => setSearchTag('')}
          />

          <Link className="savesearch" href="/properties">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            All 248 <span>results</span>
          </Link>
        </div>
      </div>

      <div className="wrap detail" id="detailview">
        {/* REFINED PREMIUM PROPERTY SUMMARY HEADER */}
        <div className="prop-summary-card">
          {/* Top Section: Badges, Title, Location & Price */}
          <div className="prop-summary-top">
            <div className="prop-summary-main">
              {/* Badges Row */}
              <div className="prop-badge-row">
                <span className="prop-type-badge">
                  {isRentListing ? (
                    <>
                      <Home className="w-3.5 h-3.5" /> For Rent
                    </>
                  ) : matchedListing?.listingCategory === 'Commercial' ? (
                    <>
                      <Building2 className="w-3.5 h-3.5" /> Commercial
                    </>
                  ) : matchedListing?.listingCategory === 'Plot' ? (
                    <>
                      <LandPlot className="w-3.5 h-3.5" /> Plot / Land
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> For Sale / Resale
                    </>
                  )}
                </span>

                <span className="prop-verified-badge">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {matchedListing?.badgeText || 'Owner Verified'}
                </span>

                {property.societyName && (
                  <span className="prop-society-badge">
                    <Building2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>Society: <b>{property.societyName}</b></span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="prop-title" id="dtitle">
                {property.title}
              </h1>

              {/* Location */}
              <div className="prop-location">
                <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>{property.address}</span>
              </div>
            </div>

            {/* Price & Shortlist Column */}
            <div className="prop-price-col">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
                <div className="prop-price-val" id="dprice1">
                  {property.price}
                </div>
                <button
                  type="button"
                  onClick={() => toggleSaveProperty(property.id)}
                  aria-label={isPropertySaved(property.id) ? "Remove from Shortlist" : "Save to Shortlist"}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid',
                    borderColor: isPropertySaved(property.id) ? '#FDA4AF' : '#E2E8F0',
                    background: isPropertySaved(property.id) ? '#FFF1F2' : '#FFFFFF',
                    color: isPropertySaved(property.id) ? '#E11D48' : '#475569',
                    fontSize: '13px',
                    fontWeight: 750,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isPropertySaved(property.id)) {
                      e.currentTarget.style.borderColor = '#C4B5FD';
                      e.currentTarget.style.background = '#FAF5FF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isPropertySaved(property.id)) {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.background = '#FFFFFF';
                    }
                  }}
                >
                  <Heart
                    style={{
                      width: 16,
                      height: 16,
                      fill: isPropertySaved(property.id) ? '#E11D48' : 'none',
                      color: isPropertySaved(property.id) ? '#E11D48' : 'currentColor',
                      transition: 'all 0.15s ease',
                    }}
                  />
                  <span>{isPropertySaved(property.id) ? 'Shortlisted' : 'Shortlist'}</span>
                </button>
              </div>
              <div className="prop-price-sub" id="dpsf">
                {property.pricePerSqFt || (isRentListing ? 'Rent per month' : 'Inclusive of all charges')} · <span className="prop-neg">Negotiable</span>
              </div>
            </div>
          </div>

          {/* Bottom Section: Key Specs & Quick Action Cards */}
          <div className="prop-summary-bottom">
            <div className="prop-stat-pill">
              <div className="prop-stat-icon">📐</div>
              <div>
                <div className="prop-stat-val" id="dbuilt">{property.builtUpArea || '2,345 sq.ft'}</div>
                <div className="prop-stat-lbl">Built-up area</div>
              </div>
            </div>

            <div className="prop-stat-pill">
              <div className="prop-stat-icon">🛏️</div>
              <div>
                <div className="prop-stat-val">{matchedListing?.bhk || property.title.match(/\d\s*BHK/i)?.[0] || 'Independent Layout'}</div>
                <div className="prop-stat-lbl">Configuration</div>
              </div>
            </div>

            {isRentListing ? (
              <div className="prop-stat-pill">
                <div className="prop-stat-icon">🛡️</div>
                <div>
                  <div className="prop-stat-val" id="ddeposit">2 Months Rent</div>
                  <div className="prop-stat-lbl">Refundable Deposit</div>
                </div>
              </div>
            ) : (
              <div className="prop-stat-pill">
                <div className="prop-stat-icon">💳</div>
                <div>
                  <div className="prop-stat-val" id="demi">{property.estimatedEmi || '₹42,500/mo'}</div>
                  <div className="prop-stat-lbl">Estimated EMI</div>
                </div>
              </div>
            )}

            {/* Quick Action Pill */}
            {isRentListing ? (
              <div className="prop-action-pill">
                <div>
                  <div className="prop-action-title">Rent Agreement?</div>
                  <div className="prop-action-sub">Instant legal e-draft</div>
                </div>
                <Link href="/rent-agreement" className="prop-action-btn">
                  Draft agreement <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                </Link>
              </div>
            ) : (
              <div className="prop-action-pill">
                <div>
                  <div className="prop-action-title">Need a Home Loan?</div>
                  <div className="prop-action-sub">Low rates from 8.35%</div>
                </div>
                <button type="button" className="prop-action-btn">
                  Apply loan <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>

        {(() => {
          const loc = extractLocationParts(property.address, property.title);
          return (
            <nav className="crumbs" style={{ padding: 0 }}>
              <Link href="/properties">← Back to results</Link> ·{' '}
              <Link href={`/properties?q=${encodeURIComponent(loc.state)}`}>{loc.state}</Link> ›{' '}
              <Link href={`/properties?q=${encodeURIComponent(loc.city)}`}>{loc.city}</Link>{' '}
              {loc.locality && loc.locality.toLowerCase() !== loc.city.toLowerCase() && (
                <>
                  › <Link href={`/properties?q=${encodeURIComponent(loc.locality)}`}>{loc.locality}</Link>{' '}
                </>
              )}
              › <span id="dbcrumb">{property.title}</span>
            </nav>
          );
        })()}

        {/* MAIN COLUMN */}
        <div className="dmain">
          {/* GALLERY */}
          <div className={`gal ${galTab === 'location' ? 'loc' : ''}`}>
            <div className="galmain" id="galmain">
              {galTab === 'photos' ? (
                <img
                  src={galIdx === 0 && matchedListing?.image ? matchedListing.image : currentPhoto.url}
                  alt={currentPhoto.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <PropertyMap address={property.address} height="100%" showTitleBadge={false} />
              )}
            </div>

            <div
              className="galtop"
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                gap: '8px',
                zIndex: 10,
                whiteSpace: 'nowrap',
              }}
            >
              <button
                className={`galtab ${galTab === 'photos' ? 'on' : ''}`}
                id="tabPhotos"
                type="button"
                onClick={() => setGalTab('photos')}
                style={{
                  whiteSpace: 'nowrap',
                  background: galTab === 'photos' ? '#522ab0' : 'rgba(255,255,255,0.95)',
                  color: galTab === 'photos' ? '#ffffff' : '#1C1F23',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  border: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                  <path d="M3 8h4l2-3h6l2 3h4v12H3z" />
                  <circle cx="12" cy="13" r="3.6" />
                </svg>
                Photos
              </button>
              <button
                className={`galtab ${galTab === 'location' ? 'on' : ''}`}
                id="tabLoc"
                type="button"
                onClick={() => setGalTab('location')}
                style={{
                  whiteSpace: 'nowrap',
                  background: galTab === 'location' ? '#522ab0' : 'rgba(255,255,255,0.95)',
                  color: galTab === 'location' ? '#ffffff' : '#1C1F23',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  border: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                  <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.6" />
                </svg>
                Location
              </button>

              <button
                type="button"
                className={isShortlisted ? 'on' : ''}
                onClick={() => setIsShortlisted(!isShortlisted)}
                style={{
                  whiteSpace: 'nowrap',
                  background: isShortlisted ? '#522ab0' : 'rgba(255,255,255,0.95)',
                  color: isShortlisted ? '#ffffff' : '#1C1F23',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  border: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: isShortlisted ? '#ffffff' : 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                  <path d="M12 20.5 4.6 13a4.7 4.7 0 0 1 6.6-6.6l.8.8.8-.8a4.7 4.7 0 1 1 6.6 6.6z" />
                </svg>
                Shortlist
              </button>
              <button
                type="button"
                style={{
                  whiteSpace: 'nowrap',
                  background: 'rgba(255,255,255,0.95)',
                  color: '#1C1F23',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  border: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                  <circle cx="18" cy="5" r="2.6" />
                  <circle cx="6" cy="12" r="2.6" />
                  <circle cx="18" cy="19" r="2.6" />
                  <path d="M8.6 13.4l6.8 4M15.4 6.6l-6.8 4" />
                </svg>
                Share
              </button>
            </div>

            {galTab === 'photos' && (
              <>
                <button
                  className="galnav prev"
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => galStep(-1)}
                >
                  ‹
                </button>
                <button
                  className="galnav next"
                  type="button"
                  aria-label="Next photo"
                  onClick={() => galStep(1)}
                >
                  ›
                </button>
                <span
                  className="galtag"
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '14px',
                    top: 'auto',
                    right: 'auto',
                    zIndex: 10,
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#1EA672',
                    padding: '5px 11px',
                    borderRadius: '999px',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                  }}
                >
                  <svg viewBox="0 0 24 24" style={{ width: 12, height: 12, fill: 'none', stroke: 'currentColor', strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {property.ownerVerified ? 'Owner verified' : 'Verified'}
                </span>
                <span
                  className="galidx"
                  id="galidx"
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    top: 'auto',
                    left: 'auto',
                    zIndex: 10,
                    background: 'rgba(28,31,35,.78)',
                    color: '#fff',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '6px',
                  }}
                >
                  {hasRealPhotos ? `${galIdx + 1} / ${galleryPhotos.length} · ${currentPhoto.label}` : '📷 No Photos Uploaded'}
                </span>
                {hasRealPhotos && galleryPhotos.length > 1 && (
                  <div className="galthumbs" id="galthumbs">
                    {galleryPhotos.map((ph: { url: string; label: string }, n: number) => (
                      <button
                        key={n}
                        className={`gth ${n === galIdx ? 'on' : ''}`}
                        type="button"
                        onClick={() => setGalIdx(n)}
                        aria-label={ph.label}
                      >
                        <img
                          src={ph.url}
                          alt={ph.label}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* NEARBY */}
          <div className="nearbar">
            <b>Nearby:</b>
            {getNearbyLandmarks(property.address).map((item, idx) => (
              <span key={idx}>{item.name}</span>
            ))}
          </div>

          {/* OVERVIEW */}
          <section className="dcard">
            <h2>Overview</h2>
            <div className="ovgrid" id="dov">
              {((property as any).societyName || (property as any).buildingName) && (
                <div className="ovrow">
                  <span className="oi">
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="#522ab0"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                  </span>
                  <span className="ol">Scheme / Project Name</span>
                  <span className="ov" style={{ color: '#522ab0', fontWeight: 800 }}>{(property as any).societyName || (property as any).buildingName}</span>
                </div>
              )}
              {property.overview.map((item, idx) => {
                const iconKey = ['cake', 'owner', 'rupee', 'tile', 'build', 'carpet', 'tower', 'shield', 'drop', 'bank', 'sofa', 'facing', 'floor', 'car', 'cal'][idx % 15];
                return (
                  <div key={idx} className="ovrow">
                    <span className="oi">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d={OVICON[iconKey] || OVICON['cake']} />
                      </svg>
                    </span>
                    <span className="ol">{item.label}</span>
                    <span className="ov">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* AMENITIES */}
          <section className="dcard">
            <h2 id="amenhead">{property.title} — top amenities</h2>
            <div className="amgrid" id="damen">
              {property.amenities.map((name: string, i: number) => (
                <div key={i} className={`amtile ${!showAllAmen && i >= 8 ? 'hide' : ''}`}>
                  <span className="ai">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={AMEN_ICONS[name] || AMEN_ICONS['Lift']} />
                    </svg>
                  </span>
                  <span>{name}</span>
                </div>
              ))}
              {property.amenities.length > 8 && (
                <button
                  className={`ammore ${showAllAmen ? 'open' : ''}`}
                  id="ammore"
                  type="button"
                  onClick={() => setShowAllAmen(!showAllAmen)}
                >
                  {showAllAmen ? 'Show less ' : `+${property.amenities.length - 8} more `}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 9.5l6 6 6-6" />
                  </svg>
                </button>
              )}
            </div>
          </section>

          {/* ABOUT THIS PROPERTY */}
          <section className="dcard">
            <h2>About this property</h2>
            <div className="ddesc" id="ddesc">
              <p>{property.description}</p>
            </div>
          </section>

          {/* LOCATION */}
          <section className="dcard">
            <h2>Location &amp; nearby</h2>
            <div style={{ marginTop: '12px', marginBottom: '16px' }}>
              <PropertyMap
                address={property.address}
                buildingName={(property as any).societyName || (property as any).buildingName}
                height="340px"
                showTitleBadge={false}
              />
            </div>
            <div className="nearby" id="dnearby">
              {getNearbyLandmarks(property.address).map((item, idx) => (
                <div key={idx}>
                  {item.name}<span>{item.distance}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR RAIL */}
        <aside className="drail">
          <section className="dcard">
            <h2>Property details</h2>
            <div className="dgrid" id="dspecs">
              {property.specs.map((s, idx) => (
                <div key={idx}>
                  <span className="di">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={SPECICON[s.icon || 'bed'] || SPECICON['bed']} />
                    </svg>
                  </span>
                  <span className="txt">
                    <span className="v">{s.value}</span>
                    <span className="k">{s.key}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* GUJJUPROPERTY VERIFIED DIRECT CONCIERGE CARD */}
          <section
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #E4DCFA',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 8px 24px -6px rgba(82, 42, 176, 0.08)',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* Header: GujjuProperty Branding & Shield */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #522AB0 0%, #7C3AED 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(82, 42, 176, 0.25)',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, fontSize: '15.5px', fontWeight: 800, color: '#1E1B4B' }}>
                    GujjuProperty Concierge
                  </h3>
                  <span
                    style={{
                      background: '#ECFDF5',
                      color: '#047857',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: '4px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      border: '1px solid #A7F3D0',
                    }}
                  >
                    ✓ Verified Owner
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', fontWeight: 600 }}>
                  Direct Owner Listing · Zero Brokerage
                </div>
              </div>
            </div>

            {/* Privacy Protection Strip */}
            <div
              style={{
                background: '#FAF9FE',
                border: '1px solid #EBE6F7',
                borderRadius: '10px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock className="w-4 h-4 text-[#522AB0]" />
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155' }}>
                  Owner Contact:
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  fontSize: '12.5px',
                  color: '#522AB0',
                  background: '#EFE9FB',
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}
              >
                🔒 Protected by Gujju
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  setConnectSubmitted(false);
                  setConnectModalOpen(true);
                }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #522AB0 0%, #6D28D9 100%)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '14px',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(82, 42, 176, 0.28)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Phone className="w-4 h-4" /> Get Owner Details &amp; Callback
              </button>

              <button
                type="button"
                onClick={() => {
                  setVisitSubmitted(false);
                  setVisitModalOpen(true);
                }}
                style={{
                  width: '100%',
                  background: '#FFFFFF',
                  color: '#1E1B4B',
                  fontWeight: 700,
                  fontSize: '13px',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '1.5px solid #CBD5E1',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Calendar className="w-4 h-4 text-[#522AB0]" /> Schedule a Site Visit
              </button>
            </div>

            {/* Assurance footer */}
            <div
              style={{
                background: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11.5px',
                color: '#166534',
                lineHeight: 1.4,
              }}
            >
              <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>
                <strong>Zero Brokerage Guarantee:</strong> GujjuProperty coordinates with the verified owner without any middleman fees.
              </span>
            </div>
          </section>

          {/* REPORT CARD */}
          <section className="dcard reportcard">
            <div className="rephead">
              <span className="repi">!</span>Report what was not correct in this property
            </div>
            <div className="repchips">
              {property.reportOptions.map((opt, idx) => (
                <button
                  key={idx}
                  className={`repchip ${activeReport === opt ? 'on' : ''}`}
                  type="button"
                  onClick={() => setActiveReport(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="repnote">
              Reports are checked within 24 hours. Listings that fail a check are taken down.
            </p>
          </section>

          {/* RAIL PROMOS */}
          <div className="railpromo">
            <b>Want us to handle the visit?</b>
            <p>A property expert visits on your behalf, sends a video and negotiates. ₹2,499 one time.</p>
            <Link href="/services/site-visit" className="btn line" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
              See the Relax plan
            </Link>
          </div>

          <div className="railpromo" style={{ background: '#fff', borderColor: 'var(--line)' }}>
            <b>Check the papers first</b>
            <p>Title and 7/12 verification by an advocate before you pay any token amount.</p>
            <Link href="/services/title-check" className="btn line" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
              Book title check
            </Link>
          </div>

          {/* SIMILAR PROPERTIES */}
          <section className="dcard">
            <h2>Similar properties nearby</h2>
            <div className="simlist" id="dsim">
              {cmsData.listingPage.listings.filter(x => x.id !== property.id).slice(0, 4).map((x, j) => (
                <Link key={x.id} className="simcard" href={`/property/${x.id}`}>
                  <span className="sp">
                    <img src={x.image} alt={x.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className="sptag">{x.badgeText}</span>
                  </span>
                  <span className="sb">
                    <h4>{x.title}</h4>
                    <span className="sad">{x.address}</span>
                    <span className="sdist">Within {j + 1} km</span>
                    <span className="simmeta">
                      <div><span className="k">Price</span><span className="v">{x.price}</span></div>
                      <div><span className="k">Built-up area</span><span className="v">{x.areaSqFt}</span></div>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <div className="mobibar">
        <button
          className="btn line"
          type="button"
          onClick={() => {
            setVisitSubmitted(false);
            setVisitModalOpen(true);
          }}
        >
          Schedule visit
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => {
            setConnectSubmitted(false);
            setConnectModalOpen(true);
          }}
        >
          Get owner details
        </button>
      </div>

      {/* SCHEDULE VISIT MODAL */}
      {visitModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20, 10, 40, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 500,
            backdropFilter: 'blur(5px)',
            overflowY: 'auto',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setVisitModalOpen(false);
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              maxWidth: '460px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#41208C' }}>
                Schedule a Property Visit
              </h3>
              <button
                type="button"
                onClick={() => setVisitModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#64748B' }}
              >
                &times;
              </button>
            </div>

            <div style={{ background: '#FAF9FD', border: '1px solid #EBE6F7', borderRadius: '10px', padding: '10px 14px', marginBottom: '18px', fontSize: '12.5px', color: '#41208C' }}>
              <div style={{ fontWeight: 800 }}>{property.title}</div>
              <div style={{ color: '#64748B', marginTop: '2px' }}>{property.price} · {property.address}</div>
            </div>

            {visitSubmitted ? (
              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '22px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📅</div>
                <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 800, color: '#065F46' }}>
                  Visit Scheduled!
                </h4>
                <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#047857', lineHeight: 1.5 }}>
                  The owner / field associate will coordinate with you at <strong>{visitForm.phone}</strong> for your site inspection.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setVisitModalOpen(false);
                    setVisitSubmitted(false);
                    setVisitForm({ name: '', phone: '', date: '', time: 'Morning (10 AM - 1 PM)' });
                  }}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '8px',
                    background: '#059669',
                    color: '#fff',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleVisitSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                    Your Full Name *
                  </label>
                  <input
                    required
                    placeholder="Enter your name"
                    value={visitForm.name}
                    onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                    style={{ width: '100%', padding: '11px 13px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={visitForm.phone}
                    onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value.replace(/[^0-9]/g, '').slice(0, 10) })}
                    style={{ width: '100%', padding: '11px 13px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={visitForm.date}
                      onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                      Time Slot
                    </label>
                    <select
                      value={visitForm.time}
                      onChange={(e) => setVisitForm({ ...visitForm, time: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    >
                      <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                      <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '13px',
                    borderRadius: '10px',
                    background: '#522AB0',
                    color: '#fff',
                    border: 'none',
                    fontSize: '14.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    marginTop: '4px',
                    boxShadow: '0 4px 12px rgba(82, 42, 176, 0.25)',
                  }}
                >
                  Confirm Free Visit Booking →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* OWNER CONCIERGE CONNECT MODAL */}
      {connectModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20, 10, 40, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 500,
            backdropFilter: 'blur(5px)',
            overflowY: 'auto',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setConnectModalOpen(false);
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '24px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
              boxShadow: '0 25px 60px -12px rgba(82, 42, 176, 0.35)',
              border: '1px solid #E4DCFA',
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFE9FB', color: '#522AB0', padding: '4px 12px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                  <ShieldCheck className="w-3.5 h-3.5" /> GujjuProperty Direct Concierge
                </div>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#1E1B4B' }}>
                  Connect with Property Owner
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setConnectModalOpen(false)}
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'grid', placeItems: 'center', fontSize: '16px', cursor: 'pointer', color: '#64748B' }}
              >
                ✕
              </button>
            </div>

            {/* Property Mini Banner */}
            <div style={{ background: '#FAF9FD', border: '1px solid #EBE6F7', borderRadius: '12px', padding: '12px 16px', marginBottom: '18px' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#522AB0', textTransform: 'uppercase' }}>
                Listing: {(property as any).type || 'Residential Property'}
              </div>
              <div style={{ fontWeight: 800, color: '#1E1B4B', fontSize: '14px', marginTop: '2px', lineHeight: 1.35 }}>
                {property.title}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '12.5px', color: '#64748B' }}>
                <span style={{ fontWeight: 700, color: '#059669' }}>{property.price}</span>
                <span>Verification: <strong style={{ color: '#522AB0' }}>Verified Direct Owner</strong></span>
              </div>
            </div>

            {connectSubmitted ? (
              <div style={{ background: '#ECFDF5', border: '1.5px solid #10B981', borderRadius: '16px', padding: '26px 20px', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#D1FAE5', color: '#059669', display: 'grid', placeItems: 'center', margin: '0 auto 14px', fontSize: '24px' }}>
                  ✓
                </div>
                <span style={{ background: '#10B981', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                  Ref: {submittedLeadId}
                </span>
                <h4 style={{ margin: '12px 0 6px', fontSize: '18px', fontWeight: 800, color: '#065F46' }}>
                  Connect Request Registered!
                </h4>
                <p style={{ margin: '0 0 16px', fontSize: '13.5px', color: '#047857', lineHeight: 1.55 }}>
                  Your inquiry to connect with the <strong>Verified Property Owner</strong> has been logged. Our GujjuProperty Relationship Desk will verify your details and connect you directly with the owner without any middleman fees.
                </p>
                <div style={{ background: '#fff', borderRadius: '10px', padding: '10px 14px', border: '1px solid #A7F3D0', fontSize: '12px', color: '#065F46', marginBottom: '18px', textAlign: 'left' }}>
                  <div>📞 We will reach you on: <strong>+91 {connectForm.phone}</strong></div>
                  <div>⏱️ Estimated Callback: <strong>Within 15 - 30 minutes</strong></div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setConnectModalOpen(false);
                    setConnectSubmitted(false);
                    setConnectForm({ name: '', phone: '', email: '', intent: 'Immediate Purchase (Ready Funds / Loan)', message: '' });
                  }}
                  style={{
                    padding: '11px 24px',
                    borderRadius: '10px',
                    background: '#059669',
                    color: '#fff',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    width: '100%',
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConnectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '10px', padding: '8px 12px', fontSize: '12px', color: '#92400E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🔒</span>
                  <span><strong>Zero Brokerage Assurance:</strong> We verify prospective buyers to protect both you and the owner from unauthorized dealer spam.</span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                    Your Full Name *
                  </label>
                  <input
                    required
                    placeholder="Enter your name"
                    value={connectForm.name}
                    onChange={(e) => setConnectForm({ ...connectForm, name: e.target.value })}
                    style={{ width: '100%', padding: '11px 13px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={connectForm.phone}
                      onChange={(e) => setConnectForm({ ...connectForm, phone: e.target.value.replace(/[^0-9]/g, '').slice(0, 10) })}
                      style={{ width: '100%', padding: '11px 13px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={connectForm.email}
                      onChange={(e) => setConnectForm({ ...connectForm, email: e.target.value })}
                      style={{ width: '100%', padding: '11px 13px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                    Your Buying / Renting Intent *
                  </label>
                  <select
                    value={connectForm.intent}
                    onChange={(e) => setConnectForm({ ...connectForm, intent: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  >
                    <option value="Immediate Purchase (Ready Funds / Loan)">Immediate Purchase (Ready Funds / Loan)</option>
                    <option value="Planning to Buy within 30-60 Days">Planning to Buy within 30-60 Days</option>
                    <option value="Schedule Direct Physical Site Visit">Schedule Direct Physical Site Visit</option>
                    <option value="Discuss Price Negotiation / Token Offer">Discuss Price Negotiation / Token Offer</option>
                    <option value="Need Land Revenue Title Check / 7/12 Support">Need Land Revenue Title Check / 7/12 Support</option>
                    <option value="Rental Move-in Inquiry">Rental Move-in Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                    Note for Owner / GujjuProperty Desk <span style={{ color: '#94A3B8', fontWeight: 500 }}>(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Interested in booking after title verification..."
                    value={connectForm.message}
                    onChange={(e) => setConnectForm({ ...connectForm, message: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '13px',
                    borderRadius: '10px',
                    background: '#522AB0',
                    color: '#fff',
                    border: 'none',
                    fontSize: '14.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    marginTop: '4px',
                    boxShadow: '0 4px 14px rgba(82, 42, 176, 0.3)',
                  }}
                >
                  🚀 Request Owner Call &amp; Details
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
