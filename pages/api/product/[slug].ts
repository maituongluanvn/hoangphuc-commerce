'use server'
import { promises as fs } from 'fs';
import { type NextApiRequest, type NextApiResponse } from 'next';
import type { IProduct } from '@definition/index';
// type ResponseData = {
// 	message?: string;
// 	product?: IProduct;
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { slug } = req.query;
	const result = await fs.readFile(process.cwd() + '/products.json', 'utf8');

	// const result = await fetch(process.env.PRODUCT_JSON_URL as string, {
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		'API-Key': process.env.DATA_API_KEY as string,
	// 	},
	// });
	// const data: any = await result.json();
	const { products }: { products: IProduct[] } = JSON.parse(result) as { products: IProduct[] } ;
	const product: IProduct | undefined = products.find((product: { slug: any }) => product.slug === slug);
	if (!product) {
		res.status(400).json({ message: `Not found product with slug: ${slug as string}` });
	}

	res.status(200).json(product);
}