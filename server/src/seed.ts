import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

import { UserModel } from './modules/users/user.model';
import { PlaceModel } from './modules/places/place.model';
import bcrypt from 'bcryptjs';

const seedData = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/placezy';
  console.log(`Connecting to MongoDB at: ${mongoUri}`);

  try {
    await mongoose.connect(mongoUri);
    console.log('✓ Successfully connected to MongoDB.');

    // 1. Seed demo user accounts
    await UserModel.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const userPass = process.env.DEMO_USER_PASSWORD || 'user0000';
    const ownerPass = process.env.DEMO_OWNER_PASSWORD || 'owner0000';
    const adminPass = process.env.DEMO_ADMIN_PASSWORD || 'admin0000';

    const userPassHash = await bcrypt.hash(userPass, salt);
    const ownerPassHash = await bcrypt.hash(ownerPass, salt);
    const adminPassHash = await bcrypt.hash(adminPass, salt);

    const demoUsers = await UserModel.create([
      {
        name: 'Aarav Patel',
        email: 'user@placezy.com',
        passwordHash: userPassHash,
        role: 'user',
        city: 'Rajkot',
        gender: 'male',
        interests: ['Heritage & Architecture', 'Specialty Cafes & Bistros', 'Wildlife & Nature Parks'],
      },
      {
        name: 'Pooja Mehta',
        email: 'owner@placezy.com',
        passwordHash: ownerPassHash,
        role: 'owner',
        city: 'Rajkot',
        gender: 'female',
      },
      {
        name: 'Admin Supervisor',
        email: 'admin@placezy.com',
        passwordHash: adminPassHash,
        role: 'admin',
        city: 'Rajkot',
      },
    ]);
    console.log(`✓ Seeded ${demoUsers.length} user accounts (User, Owner, Admin).`);

    // 2. Seed Places (Rajkot venues matching mock data & image assets)
    await PlaceModel.deleteMany({});
    const ownerId = demoUsers[1]._id;

    const places = [
      {
        name: 'Khambhalida Buddhist Caves',
        category: 'Heritage & Architecture',
        rating: 4.8,
        reviewsCount: 342,
        address: 'Gondal Highway, Khambhalida, Rajkot District',
        city: 'Rajkot',
        imageUrl: '/images/places/heritage-khambhalida.png',
        priceLevel: '$',
        cuisines: ['Heritage', 'Historic Site', 'Cave Shrines'],
        features: ['Guide Tours', 'Parking Available', 'Photography Permitted'],
        isVerified: true,
        openingStatus: 'Open Now',
        phone: '+91 281 247 1234',
        description: 'Ancient 4th-5th century CE rock-cut Buddhist caves featuring majestic Bodhisattva sculptures.',
        distanceKm: 42.5,
        latitude: 21.8486,
        longitude: 70.8385,
        ownerId,
      },
      {
        name: 'The Grand Thakar Gujarati Thali',
        category: 'Specialty Cafes & Bistros',
        rating: 4.9,
        reviewsCount: 890,
        address: 'Jawahar Road, Opp. Jubilee Garden, Rajkot',
        city: 'Rajkot',
        imageUrl: '/images/places/cafe-grand-thakar.png',
        priceLevel: '$$',
        cuisines: ['Authentic Kathiyawadi', 'Traditional Thali', 'Sweets'],
        features: ['Pure Vegetarian', 'Family Dining', 'Valet Parking', 'AC Hall'],
        isVerified: true,
        openingStatus: 'Open Now',
        phone: '+91 281 223 1111',
        description: 'Renowned destination offering legendary royal Saurashtra dining experiences since 1968.',
        distanceKm: 1.2,
        latitude: 22.3024,
        longitude: 70.8022,
        ownerId,
      },
      {
        name: 'Pradhyuman Zoological Park',
        category: 'Wildlife & Nature Parks',
        rating: 4.7,
        reviewsCount: 512,
        address: 'Near Lalpari Lake, Rajkot',
        city: 'Rajkot',
        imageUrl: '/images/places/nature-pradhyuman.png',
        priceLevel: '$',
        cuisines: ['Zoo & Safari', 'Picnic Spot', 'Botanical Garden'],
        features: ['Battery Vehicles', 'Kids Play Area', 'Lakeside Walkways'],
        isVerified: true,
        openingStatus: 'Open Now',
        phone: '+91 281 258 7700',
        description: 'Sprawling 137-acre modern zoological habitat home to Asiatic lions, leopards, and migratory birds.',
        distanceKm: 6.8,
        latitude: 22.2855,
        longitude: 70.8427,
      },
      {
        name: 'Watson Museum & Jubilee Hall',
        category: 'Museums & Cultural Centers',
        rating: 4.6,
        reviewsCount: 284,
        address: 'Jubilee Garden, Rajkot City Center',
        city: 'Rajkot',
        imageUrl: '/images/places/culture-watson-museum.png',
        priceLevel: '$',
        cuisines: ['Colonial Museum', 'Numismatics', 'Textile Arts'],
        features: ['Audio Guides', 'Wheelchair Access', 'Student Discounts'],
        isVerified: true,
        openingStatus: 'Closes 5 PM',
        phone: '+91 281 222 2844',
        description: 'Gujarat’s oldest archaeological museum preserving precious Indus Valley artifacts and royal memorabilia.',
        distanceKm: 0.8,
        latitude: 22.3015,
        longitude: 70.8038,
      },
      {
        name: 'Ishwariya Temple & Adventure Park',
        category: 'Temples & Spiritual Sites',
        rating: 4.7,
        reviewsCount: 420,
        address: 'Jamnagar Highway, Madhapar, Rajkot',
        city: 'Rajkot',
        imageUrl: '/images/places/spirituality-ishwariya.png',
        priceLevel: '$',
        cuisines: ['Shiva Temple', 'Musical Fountain', 'Boating'],
        features: ['Boating Lake', 'Scenic Sunset Point', 'Prasad Counter'],
        isVerified: true,
        openingStatus: 'Open Now',
        phone: '+91 281 278 4500',
        description: 'Serene temple sanctuary perched amidst lush hillocks and musical fountain adventure gardens.',
        distanceKm: 8.5,
        latitude: 22.3392,
        longitude: 70.7428,
      },
      {
        name: 'Race Course Ring Road & Food Plaza',
        category: 'Street Food & Night Bazaars',
        rating: 4.8,
        reviewsCount: 1250,
        address: 'Race Course Ring Road, Rajkot Central',
        city: 'Rajkot',
        imageUrl: '/images/places/food-street-race-course.png',
        priceLevel: '$',
        cuisines: ['Street Eats', 'Kulfi & Falooda', 'Bhaji Pav'],
        features: ['Late Night Open', 'Walking Track', 'Open-Air Seating'],
        isVerified: true,
        openingStatus: 'Open 24h',
        phone: '+91 281 245 9999',
        description: 'Vibrant cultural heartbeat of Rajkot known for evening walks and authentic Saurashtra street food.',
        distanceKm: 1.5,
        latitude: 22.2965,
        longitude: 70.7932,
      },
    ];

    for (const p of places) {
      await PlaceModel.create(p as any);
    }
    console.log(`✓ Seeded ${places.length} curated Rajkot venues.`);

    console.log('🎉 Database seeding complete!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
