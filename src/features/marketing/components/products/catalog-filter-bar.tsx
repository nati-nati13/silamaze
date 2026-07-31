'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { ProductCard } from '@/features/marketing/components/products/product-card';
import { ProductCardSkeleton } from '@/features/marketing/components/products/product-card-skeleton';
import type { ProductListResult } from '@/features/product/types/product.types';
import { Button } from '@/shared/components/ui/button';
import { EyebrowLabel } from '@/shared/components/ui/eyebrow-label';
import { Input } from '@/shared/components/ui/input';
import { NativeSelect } from '@/shared/components/ui/select';
import { PRODUCT_CATEGORIES } from '@/shared/const/product-categories.const';
import { http } from '@/shared/lib/http';

// TODO: enable when /api/products/brands or a facets endpoint exists
const DISABLED_FILTER_LABELS = ['ბრენდი', 'კანის ტიპი', 'კანის პრობლემა'];
const FILTER_KEYS = ['division', 'category', 'brand', 'skinType', 'skinConcern', 'search'];
const SEARCH_DEBOUNCE_MS = 400;
const SKELETON_COUNT = 6;

export const ProductCatalogFilterBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get('category') ?? '';
  const page = Number(searchParams.get('page') ?? '1');
  const hasActiveFilters = FILTER_KEYS.some((key) => Boolean(searchParams.get(key)));

  const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '');
  const [result, setResult] = useState<ProductListResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) next.set(key, value);
        else next.delete(key);
      });
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    const handle = setTimeout(() => {
      const current = searchParams.get('search') ?? '';
      if (searchInput !== current) {
        updateParams({ search: searchInput || undefined, page: undefined });
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await http.get<ProductListResult>('/products', {
        params: {
          division: searchParams.get('division') ?? undefined,
          category: searchParams.get('category') ?? undefined,
          brand: searchParams.get('brand') ?? undefined,
          skinType: searchParams.get('skinType') ?? undefined,
          skinConcern: searchParams.get('skinConcern') ?? undefined,
          search: searchParams.get('search') ?? undefined,
          page: searchParams.get('page') ?? undefined,
        },
      });
      setResult(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (value: string) => {
    updateParams({ category: value || undefined, page: undefined });
  };

  const handlePrevPage = () => {
    if (page > 1) updateParams({ page: String(page - 1) });
  };

  const handleNextPage = () => {
    if (result && page < result.totalPages) updateParams({ page: String(page + 1) });
  };

  const handleClearFilters = () => {
    setSearchInput('');
    router.push(pathname, { scroll: false });
  };

  return (
    <section id="product-catalog" className="bg-background py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
            <Input
              placeholder="პროდუქტის ძიება"
              className="sm:col-span-2"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <NativeSelect value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
              <option value="">კატეგორია</option>
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </NativeSelect>
            {DISABLED_FILTER_LABELS.map((label) => (
              <NativeSelect key={label} disabled defaultValue="">
                <option value="" disabled>
                  {label}
                </option>
              </NativeSelect>
            ))}
          </div>

          <div className="mt-10">
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <p className="text-base text-muted-foreground">ვერ ჩაიტვირთა, სცადეთ თავიდან.</p>
                <Button onClick={fetchProducts}>სცადეთ თავიდან</Button>
              </div>
            ) : !result || result.products.length === 0 ? (
              hasActiveFilters ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <p className="text-base text-muted-foreground">
                    თქვენი მოთხოვნით პროდუქტი ვერ მოიძებნა — სცადეთ სხვა კრიტერიუმები.
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    ფილტრის გასუფთავება
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
                  {/* TODO: replace with real illustration */}
                  <div className="aspect-4/3 rounded-2xl border border-border bg-muted" />

                  <div>
                    <EyebrowLabel>PRODUCT CATALOG</EyebrowLabel>
                    <h3 className="mt-4 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                      პროდუქციის კატალოგი მალე დაემატება
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      პროფესიონალური მოვლის საშუალებების შერჩევისთვის დაგვიკავშირდით.
                    </p>
                    <Button
                      size="lg"
                      className="mt-8 bg-brand-academy text-primary hover:bg-brand-academy/90"
                      asChild
                    >
                      <Link href="/kontakti">კონსულტაციის მიღება</Link>
                    </Button>
                  </div>
                </div>
              )
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {result.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {result.totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <Button variant="outline" disabled={page <= 1} onClick={handlePrevPage}>
                      წინა
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {page} / {result.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      disabled={page >= result.totalPages}
                      onClick={handleNextPage}
                    >
                      შემდეგი
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
