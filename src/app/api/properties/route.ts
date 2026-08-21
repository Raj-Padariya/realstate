import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { NO_PHOTO_PLACEHOLDER } from '@/shared/utils/photoPlaceholder';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        photos: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formatted = properties.map((p) => ({
      ...p,
      photos: p.photos.map((photo) => photo.url),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Failed to fetch properties from DB:', error);
    return NextResponse.json({ error: 'Database error fetching properties' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      listingCategory,
      title,
      price,
      pricePerSqFt,
      address,
      bhk,
      areaSqFt,
      carpetArea,
      floorInfo,
      facing,
      furnishing,
      age,
      possessionStatus,
      parking,
      balconies,
      bathrooms,
      badgeText,
      description,
      ownerName,
      ownerPhone,
      ownerRole,
      image,
      photos = [],
    } = body;

    const newProperty = await prisma.property.create({
      data: {
        listingCategory: listingCategory || (price?.includes('/mo') ? 'Rent' : 'Buy'),
        title: title || 'Property Listing',
        price: price || 'Price on Call',
        pricePerSqFt: pricePerSqFt || '',
        address: address || '',
        bhk: bhk || '3 BHK',
        areaSqFt: areaSqFt || '1,000 sq.ft',
        carpetArea,
        floorInfo,
        facing,
        furnishing,
        age,
        possessionStatus,
        parking,
        balconies,
        bathrooms,
        badgeText: badgeText || 'Owner verified',
        description,
        ownerName,
        ownerPhone,
        ownerRole,
        image: image || (photos.length > 0 ? photos[0] : NO_PHOTO_PLACEHOLDER),
        photos: {
          create: (photos.length > 0 ? photos : [image || NO_PHOTO_PLACEHOLDER]).map((url: string) => ({ url })),
        },
      },
      include: {
        photos: true,
      },
    });

    return NextResponse.json({
      ...newProperty,
      photos: newProperty.photos.map((ph) => ph.url),
    });
  } catch (error) {
    console.error('Failed to create property in DB:', error);
    return NextResponse.json({ error: 'Database error creating property' }, { status: 500 });
  }
}
