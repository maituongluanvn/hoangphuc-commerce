/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { notFound, redirect } from 'next/navigation';
import { Pagination } from '@/ui/components/Pagination';
import { ProductList } from '@/ui/components/ProductList';
// import { ProductsPerPage } from '@/app/config';

export const metadata = {
	title: 'Search products · Saleor Storefront example',
	description: 'Search products in Saleor Storefront example',
};

export default async function Page({
	searchParams,
}: {
	searchParams: Record<'query' | 'cursor', string | string[] | undefined>;
	params: { channel: string };
}) {
	// const cursor = typeof searchParams.cursor === 'string' ? searchParams.cursor : null;
	const searchValue = searchParams.query;

	if (!searchValue) {
		notFound();
	}

	if (Array.isArray(searchValue)) {
		const firstValidSearchValue = searchValue.find(v => v.length > 0);
		if (!firstValidSearchValue) {
			notFound();
		}
		redirect(`/search?${new URLSearchParams({ query: firstValidSearchValue }).toString()}`);
	}

	let products: any;
	if (!products) {
		notFound();
	}

	const newSearchParams = new URLSearchParams({
		query: searchValue,
		...(products.pageInfo.endCursor && { cursor: products.pageInfo.endCursor }),
	});

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			{products.totalCount && products.totalCount > 0 ? (
				<div>
					<h1 className="pb-8 text-xl font-semibold">Search results for &quot;{searchValue}&quot;:</h1>
					<ProductList products={products.edges.map((e: any) => e.node)} />
					<Pagination
						pageInfo={{
							...products.pageInfo,
							basePathname: `/search`,
							urlSearchParams: newSearchParams,
						}}
					/>
				</div>
			) : (
				<h1 className="mx-auto pb-8 text-center text-xl font-semibold">Nothing found :(</h1>
			)}
		</section>
	);
}
