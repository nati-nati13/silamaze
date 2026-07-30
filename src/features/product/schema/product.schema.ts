import mongoose, { InferSchemaType, Schema } from 'mongoose';

import { PRODUCT_CATEGORY_IDS } from '@/shared/const/product-categories.const';
import { PRODUCT_DIVISIONS } from '@/shared/const/product.const';

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    division: {
      type: String,
      enum: [...PRODUCT_DIVISIONS],
      required: true,
    },
    category: {
      type: String,
      enum: [...PRODUCT_CATEGORY_IDS],
    },
    brand: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    discountPrice: {
      type: Number,
      default: null,
      min: 0,
      validate: {
        validator: function (this: { price: number }, value: number | null | undefined) {
          return value === null || value === undefined || value < this.price;
        },
        message: 'discountPrice must be less than price',
      },
    },
    skinType: { type: [String], default: [] },
    skinConcern: { type: [String], default: [] },
    images: { type: [String], default: [] },
    sku: { type: String, default: null },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ProductSchema.index({ sku: 1 }, { unique: true, sparse: true });

export type ProductDocument = InferSchemaType<typeof ProductSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);
