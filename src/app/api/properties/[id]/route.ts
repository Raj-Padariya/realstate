import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const property = await prisma.property.findUnique({
      where: { id },
      include: { photos: true },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...property,
      photos: property.photos.map((ph) => ph.url),
    });
  } catch (error) {
    console.error('Error fetching property detail:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { photos = [], ...updateData } = body;

    // Delete existing photos and recreate
    if (photos && photos.length > 0) {
      await prisma.propertyPhoto.deleteMany({
        where: { propertyId: id },
      });
    }

    const updated = await prisma.property.update({
      where: { id },
      data: {
        ...updateData,
        photos: photos && photos.length > 0
          ? { create: photos.map((url: string) => ({ url })) }
          : undefined,
      },
      include: { photos: true },
    });

    return NextResponse.json({
      ...updated,
      photos: updated.photos.map((ph) => ph.url),
    });
  } catch (error) {
    console.error('Error updating property in DB:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.property.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: `Property ${id} deleted` });
  } catch (error) {
    console.error('Error deleting property from DB:', error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}
