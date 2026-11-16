import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

dotenv.config({ path: path.join(__dirname, '../.env') });

import { UserModel } from './modules/users/user.model';
import { PlaceModel } from './modules/places/place.model';
import { ReviewModel } from './modules/reviews/review.model';
import { CategoryModel } from './modules/categories/category.model';
import { NotificationModel } from './modules/notifications/notification.model';
import { MOCK_PLACES } from './data/seedVenues';

export const seedDatabase = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/placezy';
  console.log(`Connecting to MongoDB at: ${mongoUri}`);

  try {
    await mongoose.connect(mongoUri);
    console.log('✓ Successfully connected to MongoDB.');

    // 1. Seed Categories
    await CategoryModel.deleteMany({});
    const categoriesList = [
      { name: 'Cafés', slug: 'cafes', iconName: 'Coffee', count: 18 },
      { name: 'Restaurants', slug: 'restaurants', iconName: 'Utensils', count: 24 },
      { name: 'Shopping', slug: 'shopping', iconName: 'ShoppingBag', count: 12 },
      { name: 'Nature & Parks', slug: 'nature-parks', iconName: 'Trees', count: 14 },
      { name: 'Attractions', slug: 'attractions', iconName: 'Compass', count: 20 },
      { name: 'Entertainment', slug: 'entertainment', iconName: 'Tv', count: 9 },
      { name: 'Culture & Heritage', slug: 'culture', iconName: 'Landmark', count: 15 },
      { name: 'Religious Places', slug: 'religious-places', iconName: 'Church', count: 11 },
    ];
    await CategoryModel.insertMany(categoriesList);
    console.log(`✓ Seeded ${categoriesList.length} primary categories.`);

    // 2. Seed Users (Preserve all user-registered accounts; only upsert default baseline accounts)
    const salt = await bcrypt.genSalt(10);
    const userPass = process.env.DEMO_USER_PASSWORD || 'userPass123!';
    const ownerPass = process.env.DEMO_OWNER_PASSWORD || 'ownerPass123!';
    const adminPass = process.env.DEMO_ADMIN_PASSWORD || 'adminPass123!';

    const userPassHash = await bcrypt.hash(userPass, salt);
    const ownerPassHash = await bcrypt.hash(ownerPass, salt);
    const adminPassHash = await bcrypt.hash(adminPass, salt);

    const baselineAccounts = [
      {
        name: 'Aarav Patel',
        email: 'user@placezy.com',
        phone: '9876543210',
        passwordHash: userPassHash,
        role: 'user' as const,
        city: 'Rajkot',
        gender: 'male' as const,
        interests: ['Heritage & Architecture', 'Cafés', 'Nature & Parks'],
        status: 'active' as const,
      },
      {
        name: 'Mahek Patel',
        email: 'mahek@placezy.com',
        phone: '9825012345',
        passwordHash: userPassHash,
        role: 'user' as const,
        city: 'Rajkot',
        gender: 'female' as const,
        interests: ['Cafés', 'Artisan Roasteries'],
        status: 'active' as const,
      },
      {
        name: 'Pooja Mehta',
        email: 'owner@placezy.com',
        phone: '9898011223',
        passwordHash: ownerPassHash,
        role: 'owner' as const,
        city: 'Rajkot',
        gender: 'female' as const,
        status: 'active' as const,
      },
      {
        name: 'Raviraj Dhadhal',
        email: 'owner2@placezy.com',
        phone: '9898022334',
        passwordHash: ownerPassHash,
        role: 'owner' as const,
        city: 'Rajkot',
        gender: 'male' as const,
        status: 'active' as const,
      },
      {
        name: 'Devang Jadeja',
        email: 'owner3@placezy.com',
        phone: '9898033445',
        passwordHash: ownerPassHash,
        role: 'owner' as const,
        city: 'Rajkot',
        gender: 'male' as const,
        status: 'active' as const,
      },
      {
        name: 'Admin Supervisor',
        email: 'admin@placezy.com',
        phone: '9898099887',
        passwordHash: adminPassHash,
        role: 'admin' as const,
        city: 'Rajkot',
        gender: 'male' as const,
        status: 'active' as const,
      },

      // Dummy User Accounts for User Logins (dummy1 to dummy6)
      {
        name: 'Dummy 1 User',
        email: 'dummy1@placezy.com',
        phone: '9898111111',
        passwordHash: userPassHash,
        role: 'user' as const,
        city: 'Rajkot',
        gender: 'female' as const,
        interests: ['Cafés', 'Attractions'],
        status: 'active' as const,
      },
      {
        name: 'Dummy 2 User',
        email: 'dummy2@placezy.com',
        phone: '9898222222',
        passwordHash: userPassHash,
        role: 'user' as const,
        city: 'Rajkot',
        gender: 'male' as const,
        interests: ['Cafés', 'Fine Dining'],
        status: 'active' as const,
      },
      {
        name: 'Dummy 3 User',
        email: 'dummy3@placezy.com',
        phone: '9898333333',
        passwordHash: userPassHash,
        role: 'user' as const,
        city: 'Rajkot',
        gender: 'female' as const,
        interests: ['Heritage & Architecture', 'Restaurants'],
        status: 'active' as const,
      },
      {
        name: 'Dummy 4 User',
        email: 'dummy4@placezy.com',
        phone: '9898444444',
        passwordHash: userPassHash,
        role: 'user' as const,
        city: 'Rajkot',
        gender: 'male' as const,
        interests: ['Nature & Parks', 'Attractions'],
        status: 'active' as const,
      },
      {
        name: 'Dummy 5 User',
        email: 'dummy5@placezy.com',
        phone: '9898555555',
        passwordHash: userPassHash,
        role: 'user' as const,
        city: 'Rajkot',
        gender: 'female' as const,
        interests: ['Cafés', 'Shopping'],
        status: 'active' as const,
      },
      {
        name: 'Dummy 6 User',
        email: 'dummy6@placezy.com',
        phone: '9898666666',
        passwordHash: userPassHash,
        role: 'user' as const,
        city: 'Rajkot',
        gender: 'male' as const,
        interests: ['Shopping', 'Street Food'],
        status: 'active' as const,
      },
    ];

    for (const acc of baselineAccounts) {
      await UserModel.findOneAndUpdate(
        { email: acc.email },
        { $set: acc },
        { upsert: true, new: true }
      );
    }
    console.log(`✓ Baseline accounts synchronized without deleting registered user accounts.`);

    const userAarav = (await UserModel.findOne({ email: 'user@placezy.com' }))!;
    const userMahek = (await UserModel.findOne({ email: 'mahek@placezy.com' }))!;
    const owner1 = (await UserModel.findOne({ email: 'owner@placezy.com' }))!;
    const owner2 = (await UserModel.findOne({ email: 'owner2@placezy.com' }))!;
    const owner3 = (await UserModel.findOne({ email: 'owner3@placezy.com' }))!;
    const adminUser = (await UserModel.findOne({ email: 'admin@placezy.com' }))!;

    // 3. Seed Venues and assign to the 3 Owners:
    // Owner 1 (Pooja Mehta - owner@placezy.com):
    //   - The Grand Courtyard Roastery
    //   - Kavita Artisan Tea & Coffee
    //   - The Secret Garden Bistro
    //   - Indroda Nature Reserve
    // Owner 2 (Raviraj Dhadhal - owner2@placezy.com):
    //   - Kathiyawadi Rasoi Heritage
    //   - Dumas Promenade Pavilion
    //   - Sidi Saiyyed Mosque
    //   - Polo Forest Riverside Camp & Ruins
    // Owner 3 (Devang Jadeja - owner3@placezy.com):
    //   - Watson Museum & Gardens
    //   - Laxmi Vilas Palace Estate
    //   - Oasis Heritage Pavilions
    //   - Adalaj Ni Vav Stepwell Artisans
    //   - Lakhota Lake Palace

    const ownerDistribution: { [index: number]: any } = {
      0: owner1._id, // The Grand Courtyard Roastery
      1: owner3._id, // Watson Museum & Gardens
      2: owner1._id, // Kavita Artisan Tea & Coffee
      3: owner2._id, // Kathiyawadi Rasoi Heritage
      4: owner2._id, // Sidi Saiyyed Mosque
      5: owner3._id, // Laxmi Vilas Palace Estate
      6: owner2._id, // Dumas Promenade Pavilion
      7: owner1._id, // Indroda Nature Reserve
      8: owner3._id, // Oasis Heritage Pavilions
      9: owner3._id, // Adalaj Ni Vav Stepwell Artisans
      10: owner2._id, // Polo Forest Riverside Camp & Ruins
      11: owner3._id, // Lakhota Lake Palace
      12: owner1._id, // The Secret Garden Bistro
    };

    await PlaceModel.deleteMany({});
    const createdPlaces = [];

    for (let i = 0; i < MOCK_PLACES.length; i++) {
      const p = MOCK_PLACES[i];
      const assignedOwnerId = ownerDistribution[i] || owner1._id;

      const placeDoc = await PlaceModel.create({
        name: p.name,
        slug: p.id,
        category: p.category,
        subCategory: p.subCategory,
        tagline: p.tagline,
        rating: 0,
        reviewsCount: 0,
        address: p.address,
        locationDetails: p.location,
        city: p.city || 'Rajkot',
        imageUrl: p.coverImage,
        coverImage: p.coverImage,
        galleryImages: p.galleryImages || [],
        priceLevel: p.priceLevel,
        cuisines: [p.subCategory],
        features: p.facilities || [],
        facilities: p.facilities || [],
        isVerified: true,
        status: 'active',
        openingStatus: p.openingStatus,
        timings: p.timings,
        phone: p.phone,
        email: p.email,
        website: p.website,
        description: p.description,
        distanceKm: p.distanceKm,
        latitude: p.coordinates.lat,
        longitude: p.coordinates.lng,
        location: {
          type: 'Point',
          coordinates: [p.coordinates.lng, p.coordinates.lat],
        },
        matchPercentage: p.matchPercentage,
        featured: p.featured || false,
        trending: p.trending || false,
        hiddenGem: p.hiddenGem || false,
        ownerId: assignedOwnerId,
      });
      createdPlaces.push(placeDoc);
    }
    console.log(`✓ Seeded ${createdPlaces.length} venues mapped across the 3 business owners.`);

    // 4. Seed Reviews from real users across venues
    await ReviewModel.deleteMany({});

    const reviewsToSeed = [
      // Venue 0: The Grand Courtyard Roastery (Owner: Pooja Mehta)
      {
        placeId: createdPlaces[0]._id,
        userId: userAarav._id,
        userName: userAarav.name,
        userGender: 'male',
        rating: 5.0,
        foodRating: 5,
        ambienceRating: 5,
        serviceRating: 5,
        title: 'Outstanding artisanal roastery in Rajkot!',
        content: 'Single origin pour-over coffee and sourdough sandwiches were exceptional. Quiet ambient music and high-speed Wi-Fi.',
        status: 'approved',
        moderatedBy: adminUser._id,
        moderatedAt: new Date(),
        likes: 14,
        ownerReply: {
          date: new Date(),
          content: 'Thank you Aarav for visiting us! We source our single origin beans directly from Chikmagalur estates.',
        },
      },
      {
        placeId: createdPlaces[0]._id,
        userId: userMahek._id,
        userName: userMahek.name,
        userGender: 'female',
        rating: 4.6,
        foodRating: 5,
        ambienceRating: 4.5,
        serviceRating: 4.5,
        title: 'Best place for remote work & meetings',
        content: 'Loved the open courtyard seating and cold brews. Extremely polite staff and plenty of power outlets.',
        status: 'approved',
        moderatedBy: adminUser._id,
        moderatedAt: new Date(),
        likes: 8,
      },

      // Venue 1: Watson Museum & Gardens (Owner: Devang Jadeja)
      {
        placeId: createdPlaces[1]._id,
        userId: userAarav._id,
        userName: userAarav.name,
        userGender: 'male',
        rating: 4.5,
        foodRating: 4,
        ambienceRating: 5,
        serviceRating: 4.5,
        title: 'Breathtaking historical discovery!',
        content: 'The colonial architecture and Saurashtra royal artefacts are preserved with great care. Very educational visit.',
        status: 'approved',
        moderatedBy: adminUser._id,
        moderatedAt: new Date(),
        likes: 12,
        ownerReply: {
          date: new Date(),
          content: 'Thank you for exploring our museum galleries! We are continuously adding archival documentation.',
        },
      },

      // Venue 2: Tea Post - The Desi Cafe (Owner: Pooja Mehta)
      {
        placeId: createdPlaces[2]._id,
        userId: userMahek._id,
        userName: userMahek.name,
        userGender: 'female',
        rating: 4.8,
        foodRating: 5,
        ambienceRating: 4.5,
        serviceRating: 5,
        title: 'Authentic Gujarati Chai & Desi Snacks!',
        content: 'Loved the ginger pudina chai and hot handvo. Unbeatable evening hangout on Kalawad Road in Rajkot.',
        status: 'approved',
        moderatedBy: adminUser._id,
        moderatedAt: new Date(),
        likes: 15,
        ownerReply: {
          date: new Date(),
          content: 'Thank you Mahek! We take immense pride in serving authentic desi chai and freshly made Gujarati snacks.',
        },
      },

      // Venue 3: Kathiyawadi Rasoi Heritage (Owner: Raviraj Dhadhal)
      {
        placeId: createdPlaces[3]._id,
        userId: userAarav._id,
        userName: userAarav.name,
        userGender: 'male',
        rating: 5.0,
        foodRating: 5,
        ambienceRating: 4.5,
        serviceRating: 5,
        title: 'Authentic Kathiyawadi flavors!',
        content: 'Unmatched hospitality. The Ringan No Olo and hot Bajra No Rotlo with fresh white makhan were out of this world.',
        status: 'approved',
        moderatedBy: adminUser._id,
        moderatedAt: new Date(),
        likes: 18,
        ownerReply: {
          date: new Date(),
          content: 'Thank you for honoring our heritage dining tradition! Look forward to welcoming you back.',
        },
      },

      // Venue 6: Dumas Promenade Pavilion (Owner: Raviraj Dhadhal)
      {
        placeId: createdPlaces[6]._id,
        userId: userMahek._id,
        userName: userMahek.name,
        userGender: 'female',
        rating: 4.7,
        foodRating: 5,
        ambienceRating: 5,
        serviceRating: 4,
        title: 'Spectacular seaside sunset ambiance',
        content: 'Fresh coastal snacks and lively sea breeze. Perfect spot for relaxing evenings.',
        status: 'approved',
        moderatedBy: adminUser._id,
        moderatedAt: new Date(),
        likes: 9,
      },

      // Venue 12: The Secret Garden Bistro (Owner: Pooja Mehta)
      {
        placeId: createdPlaces[12]._id,
        userId: userAarav._id,
        userName: userAarav.name,
        userGender: 'male',
        rating: 4.9,
        foodRating: 5,
        ambienceRating: 5,
        serviceRating: 4.8,
        title: 'A botanical heaven in the heart of the city',
        content: 'Lush greenery, peaceful acoustic music, and delicious wood-fired pizzas.',
        status: 'approved',
        moderatedBy: adminUser._id,
        moderatedAt: new Date(),
        likes: 11,
        ownerReply: {
          date: new Date(),
          content: 'We are thrilled you enjoyed the serene garden seating! See you again soon.',
        },
      },

      // Pending review for Admin moderation queue
      {
        placeId: createdPlaces[3]._id,
        userId: userMahek._id,
        userName: userMahek.name,
        userGender: 'female',
        rating: 4.2,
        foodRating: 4.5,
        ambienceRating: 4.0,
        serviceRating: 4.0,
        title: 'Great dining experience with family',
        content: 'Authentic Kathiyawadi sweets and buttermilk. Can get busy on Sunday lunch hours.',
        status: 'pending',
      },
    ];

    await ReviewModel.insertMany(reviewsToSeed);
    console.log(`✓ Seeded ${reviewsToSeed.length} reviews from users in MongoDB.`);

    // 5. Compute dynamic ratings and counts in MongoDB based on approved reviews
    for (const place of createdPlaces) {
      const approved = await ReviewModel.find({ placeId: place._id, status: 'approved' });
      const count = approved.length;
      let avg = 0;
      if (count > 0) {
        const sum = approved.reduce((acc, curr) => acc + curr.rating, 0);
        avg = Math.round((sum / count) * 10) / 10;
      }
      await PlaceModel.findByIdAndUpdate(place._id, {
        rating: avg,
        reviewsCount: count,
      });
    }
    console.log(`✓ Recalculated dynamic ratings and review counts for all venues from database reviews.`);

    // 6. Seed Notifications for Users and Owners
    await NotificationModel.deleteMany({});
    await NotificationModel.insertMany([
      {
        userId: userAarav._id,
        title: 'New places you may like',
        message: 'Based on your love for heritage cafes, 2 new spots were added near Kalawad Road: The Grand Courtyard Roastery & The Secret Garden Bistro.',
        type: 'system',
        read: false,
      },
      {
        userId: userAarav._id,
        title: 'Owner replied to your review',
        message: 'Pooja Mehta from The Grand Courtyard Roastery replied to your 5-star review.',
        type: 'review',
        read: false,
      },
      {
        userId: owner1._id,
        title: 'New review posted on your venue',
        message: 'Aarav Patel posted a 5-star review on The Grand Courtyard Roastery.',
        type: 'owner',
        read: false,
      },
      {
        userId: owner2._id,
        title: 'New review posted on your venue',
        message: 'Aarav Patel posted a 5-star review on Kathiyawadi Rasoi Heritage.',
        type: 'owner',
        read: false,
      },
      {
        userId: owner3._id,
        title: 'New review posted on your venue',
        message: 'Aarav Patel posted a 4.5-star review on Watson Museum & Gardens.',
        type: 'owner',
        read: false,
      },
      {
        userId: adminUser._id,
        title: 'Pending review requires moderation',
        message: 'A customer review from Mahek Patel is waiting in the moderation queue.',
        type: 'review',
        read: false,
      },
    ]);
    console.log('✓ Seeded notifications for users, owners, and admin in MongoDB.');

    console.log('🎉 Full database migration & seeding completed successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
