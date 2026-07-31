import { ProductDocument, ProductModel } from '@/features/product/schema/product.schema';
import { mongo } from '@/shared/lib/mongo';

export const productRepository = {
  async find(filter: Record<string, unknown>, skip: number, limit: number): Promise<ProductDocument[]> {
    await mongo.connect();
    return ProductModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean<ProductDocument[]>()
      .exec();
  },

  async count(filter: Record<string, unknown>): Promise<number> {
    await mongo.connect();
    return ProductModel.countDocuments(filter).exec();
  },

  async create(data: {
    name: string;
    slug: string;
    description?: string;
    division: string;
    category?: string;
    brand?: string;
    price: number;
    discountPrice?: number | null;
    skinType?: string[];
    skinConcern?: string[];
    images?: string[];
    sku?: string | null;
    stock?: number;
    isActive?: boolean;
  }): Promise<string> {
    await mongo.connect();
    const doc = await ProductModel.create(data);
    return doc._id.toString();
  },

  async findById(id: string): Promise<ProductDocument | null> {
    await mongo.connect();
    return ProductModel.findById(id).lean<ProductDocument | null>().exec();
  },

  async findBySlug(slug: string): Promise<ProductDocument | null> {
    await mongo.connect();
    return ProductModel.findOne({ slug }).lean<ProductDocument | null>().exec();
  },

  async updateById(
    id: string,
    patch: Partial<{
      name: string;
      slug: string;
      description: string;
      division: string;
      category: string | null;
      brand: string;
      price: number;
      discountPrice: number | null;
      skinType: string[];
      skinConcern: string[];
      images: string[];
      sku: string | null;
      stock: number;
      isActive: boolean;
    }>
  ): Promise<ProductDocument | null> {
    await mongo.connect();
    return ProductModel.findByIdAndUpdate(id, { $set: patch }, { new: true })
      .lean<ProductDocument | null>()
      .exec();
  },
};
