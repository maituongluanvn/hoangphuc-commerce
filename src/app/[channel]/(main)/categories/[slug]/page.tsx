/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { notFound } from 'next/navigation';
import { type ResolvingMetadata, type Metadata } from 'next';
import { ProductListByCategoryDocument } from '@/gql/graphql';
import { executeGraphQL } from '@/lib/graphql';
import { ProductList } from '@/ui/components/ProductList';

export const generateMetadata = async (
	{ params }: { params: { slug: string; channel: string } },
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	const { category }: any = await executeGraphQL(ProductListByCategoryDocument, {
		variables: { slug: params.slug, channel: params.channel },
		revalidate: 60,
	});
	console.log('🚀 ~ category 222:', category);

	return {
		title: `${category?.name || 'Categroy'} | ${category?.seoTitle || (await parent).title?.absolute}`,
		description: category?.seoDescription || category?.description || category?.seoTitle || category?.name,
	};
};

export default async function Page({ params }: { params: { slug: string; channel: string } }) {
	const { category }: any = await executeGraphQL(ProductListByCategoryDocument, {
		variables: { slug: params.slug, channel: params.channel },
		revalidate: 60,
	});
	console.log('🚀 ~ category 111:', category);

	if (!category || !category.products) {
		notFound();
	}

	const { name, products } = category;

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="pb-8 text-xl font-semibold">{name}</h1>
			<ProductList products={products.edges.map((e: any) => e.node)} />
		</div>
	);
}
