import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
    isPublished: { type: Boolean, default: true },
    author: { type: String, default: 'Aryans Buildcon Research Desk' },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const blogData = {
    title: 'Why Land is the Smartest Long-Term Investment in Nagpur',
    subtitle: 'Explore why land investment in Nagpur is attracting long-term buyers. Learn about plots, infrastructure, location, due diligence and future investment considerations.',
    slug: 'why-land-is-the-smartest-long-term-investment-in-nagpur',
    content: `<p>Land investment in Nagpur is increasingly being considered by buyers looking for long-term asset ownership, future flexibility and potential capital appreciation. With the city's expanding infrastructure, improving connectivity and development across emerging residential corridors, land has become an important part of the broader real estate conversation.</p>
    <p>But investing in land is not simply about buying a plot and waiting for its value to increase. Location, connectivity, surrounding development, legal documentation and the long-term demand for the area all play an important role.</p>
    <p>For anyone considering Nagpur real estate investment, understanding these factors can help turn a property purchase into a more informed long-term decision.</p>

    <h3>Why Nagpur's Real Estate Market Is Attracting Attention</h3>
    <p>Nagpur has evolved into an important transportation, logistics, education and commercial centre in central India. Development around major roads, employment hubs, industrial areas and transportation infrastructure has contributed to the city's expanding urban footprint.</p>

    <h3>1. Land Offers Long-Term Ownership</h3>
    <p>One of the biggest attractions of purchasing land is straightforward ownership of the underlying asset. Unlike a constructed property, where the building and its maintenance become part of the investment, a plot gives the owner greater control over future development, subject to applicable permissions and regulations.</p>

    <h3>2. Infrastructure Can Influence Future Demand</h3>
    <p>Infrastructure is an important factor when evaluating any real estate investment. Improved roads, public transportation, employment centres, educational institutions, healthcare facilities and commercial development can make an area more accessible and potentially increase its attractiveness to residents and businesses.</p>

    <h3>3. Plots Give Buyers Greater Construction Flexibility</h3>
    <p>A ready property comes with an existing structure. A plot provides a different kind of flexibility. Depending on the applicable rules and permissions, buyers can plan construction according to their future requirements.</p>

    <h3>4. Lower Maintenance Before Construction</h3>
    <p>Land generally involves fewer maintenance requirements than a constructed property. A vacant plot does not typically involve the same level of physical maintenance before construction.</p>

    <h3>5. Location Is More Important Than a Low Price</h3>
    <p>A common mistake among first-time land buyers is choosing a plot simply because it appears inexpensive. Prioritize verified connectivity, layout sanctions, and accessibility over raw lowest price per sq. ft.</p>
    <ul>
      <li>Connectivity to major roads and highways</li>
      <li>Distance from employment centres & MIHAN</li>
      <li>Nearby residential development</li>
      <li>Schools, hospitals, and Metro connectivity</li>
      <li>Layout and RERA/NMRDA approvals</li>
    </ul>

    <h3>6. Nagpur Has Multiple Real Estate Micro-Markets</h3>
    <p>Different parts of the city have different characteristics, price levels, connectivity and development patterns. Compare micro-locations based on your budget, intended use, and holding period.</p>

    <h3>What Should You Check Before Buying a Plot?</h3>
    <ol>
      <li><strong>Verify Ownership:</strong> Check the seller's title history.</li>
      <li><strong>Check Legal Documents:</strong> Review 7/12 extracts, sale deeds, tax receipts.</li>
      <li><strong>Verify Layout Approval:</strong> Confirm NMRDA/NIT/RERA layout sanctions.</li>
      <li><strong>Check for Encumbrances:</strong> Ensure clear title without loans or claims.</li>
      <li><strong>Confirm Road Access:</strong> Verify legally usable road access to the plot.</li>
    </ol>`,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Why Land is the Smartest Long-Term Investment in Nagpur',
    metaDescription: 'Explore why land investment in Nagpur is attracting long-term buyers. Learn about plots, infrastructure, location, due diligence and future investment considerations.',
    keywords: ['land investment in Nagpur', 'plots in Nagpur', 'Nagpur real estate investment', 'residential plots in Nagpur'],
    isPublished: true,
  };

  const updated = await Blog.findOneAndUpdate(
    { slug: blogData.slug },
    blogData,
    { upsert: true, new: true }
  );

  console.log('SUCCESS_BLOG_SEEDED: ID=' + updated._id);
  mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
