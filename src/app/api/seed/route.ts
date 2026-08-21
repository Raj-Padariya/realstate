import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import cmsDataRaw from '@/shared/data/mockCmsData.json';

export async function GET() {
  try {
    const existingCount = await prisma.property.count();
    if (existingCount > 0) {
      return NextResponse.json({ message: `Database already seeded with ${existingCount} properties.`, count: existingCount });
    }

    const initialListings = cmsDataRaw.listingPage.listings;

    for (const listing of (initialListings as any[])) {
      await prisma.property.create({
        data: {
          id: listing.id,
          title: listing.title,
          price: listing.price,
          pricePerSqFt: listing.pricePerSqFt || '₹8,500 / sq.ft',
          address: listing.address,
          bhk: listing.bhk || '3 BHK',
          areaSqFt: listing.areaSqFt || '1,420 sq.ft',
          badgeText: listing.badgeText || 'Owner verified',
          image: listing.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
          description: 'Spacious verified property directly from owner with zero brokerage.',
          ownerName: 'Sandeep Kumar',
          ownerPhone: '+91 98765 43210',
          photos: {
            create: (listing.photos || [listing.image]).map((url: string) => ({ url })),
          },
        },
      });
    }

    const newCount = await prisma.property.count();
    return NextResponse.json({ success: true, message: `Seeded ${newCount} properties into SQL DB!`, count: newCount });
  } catch (error) {
    console.error('Seeder error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
