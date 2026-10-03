import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Service from './models/Service.js';
import Package from './models/Package.js';
import Nurse from './models/Nurse.js';
import Testimonial from './models/Testimonial.js';
import FAQ from './models/FAQ.js';
import Rental from './models/Rental.js';

// The data lives in the website code, so the database always matches it.
import { SERVICES, PACKAGES, NURSES, TESTIMONIALS, FAQS } from '../client/src/data/siteData.js';
import { RENTALS } from '../client/src/data/rentalData.js';

dotenv.config();

// The database creates its own ids, so drop the ones used in the website code
const strip = ({ _id, ...rest }) => rest;

const replaceAll = async (Model, label, docs) => {
  await Model.deleteMany({});
  const saved = await Model.insertMany(docs);
  console.log(`✔ ${label}: ${saved.length}`);
};

const run = async () => {
  await connectDB();
  console.log('Seeding... (bookings and admin users are NOT touched)');

  await replaceAll(
    Service,
    'Services',
    SERVICES.map((s, i) => ({ ...strip(s), description: s.description || s.shortDescription, order: i }))
  );
  await replaceAll(Package, 'Packages', PACKAGES.map(strip));
  await replaceAll(Nurse, 'Nurses', NURSES.map((n) => ({ experience: '', languages: [], ...strip(n) })));
  await replaceAll(Testimonial, 'Testimonials', TESTIMONIALS.map(strip));
  await replaceAll(FAQ, 'FAQs', FAQS.map((f, i) => ({ ...strip(f), order: i })));
  await replaceAll(Rental, 'Rentals', RENTALS.map(strip));

  console.log('Done. Restart the server and refresh the admin page.');
  process.exit(0);
};

run().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});