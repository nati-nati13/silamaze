import Link from 'next/link';

import { ProductRowActions } from '@/features/product/components/product-row-actions';
import { listProductsForAdminService } from '@/features/product/service/product.service';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { PRODUCT_CATEGORIES } from '@/shared/const/product-categories.const';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'პროდუქტები — Admin',
};

type PageProps = {
  searchParams: Promise<{ page?: string; search?: string }>;
};

const categoryLabel = (id: string | null): string =>
  PRODUCT_CATEGORIES.find((c) => c.id === id)?.label ?? '—';

export default async function ProductsAdminPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? '1');
  const search = params.search ?? '';

  const { data } = await listProductsForAdminService({ page, search: search || undefined });
  const result = 'products' in data ? data : { products: [], total: 0, page: 1, totalPages: 1 };

  const pageHref = (targetPage: number) =>
    `/dashboard/products?page=${targetPage}${search ? `&search=${encodeURIComponent(search)}` : ''}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">პროდუქტები</h1>
        <Button asChild>
          <Link href="/dashboard/products/new">+ პროდუქტის დამატება</Link>
        </Button>
      </div>

      <form method="GET" className="flex gap-3">
        <Input
          name="search"
          placeholder="ძებნა (სახელი/ბრენდი)"
          defaultValue={search}
          className="max-w-sm"
        />
        <Button type="submit" variant="outline">
          ძებნა
        </Button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>სახელი</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>კატეგორია</TableHead>
              <TableHead>ბრენდი</TableHead>
              <TableHead>ფასი</TableHead>
              <TableHead>მარაგი</TableHead>
              <TableHead>სტატუსი</TableHead>
              <TableHead className="text-right">მოქმედებები</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                  პროდუქტი ვერ მოიძებნა.
                </TableCell>
              </TableRow>
            ) : (
              result.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-foreground">{product.name}</TableCell>
                  <TableCell>{product.division}</TableCell>
                  <TableCell>{categoryLabel(product.category)}</TableCell>
                  <TableCell>{product.brand || '—'}</TableCell>
                  <TableCell>
                    {product.discountPrice != null ? (
                      <span className="flex items-center gap-2">
                        <span className="text-muted-foreground line-through">
                          {product.price} ₾
                        </span>
                        <span className="font-semibold">{product.discountPrice} ₾</span>
                      </span>
                    ) : (
                      <span>{product.price} ₾</span>
                    )}
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span
                      className={
                        product.isActive
                          ? 'inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary'
                          : 'inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground'
                      }
                    >
                      {product.isActive ? 'აქტიური' : 'დეაქტივირებული'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <ProductRowActions productId={product.id} productName={product.name} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {result.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          {page > 1 ? (
            <Button variant="outline" asChild>
              <Link href={pageHref(page - 1)}>წინა</Link>
            </Button>
          ) : (
            <Button variant="outline" disabled>
              წინა
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            {page} / {result.totalPages}
          </span>
          {page < result.totalPages ? (
            <Button variant="outline" asChild>
              <Link href={pageHref(page + 1)}>შემდეგი</Link>
            </Button>
          ) : (
            <Button variant="outline" disabled>
              შემდეგი
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
