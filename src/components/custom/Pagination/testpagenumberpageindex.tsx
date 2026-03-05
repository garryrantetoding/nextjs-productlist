// // src/app/master/product/page/[pageNumber].tsx

// import { GetServerSideProps } from 'next';
// import Pagination from './pagination-button';

// interface Product {
//   id: number;
//   name: string;
// }

// async function fetchProducts(page: number): Promise<{
//   products: Product[];
//   totalPages: number;
// }> {
//   const res = await fetch(`https://your-backend.com/api/products?page=${page}`, {
//     cache: 'no-store',
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch products');
//   }

//   return res.json();
// }

// interface ProductPageProps {
//   currentPage: number;
//   products: Product[];
//   totalPages: number;
// }

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const currentPage = parseInt(params?.pageNumber as string) || 1;
  
//   // Fetch products
//   const { products, totalPages } = await fetchProducts(currentPage);

//   // If no page number is provided, redirect to page 1
//   if (params?.pageNumber === undefined) {
//     return {
//       redirect: {
//         destination: '/master/product/page/1',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       currentPage,
//       products,
//       totalPages,
//     },
//   };
// };

// export default function ProductPage({ currentPage, products, totalPages }: ProductPageProps) {
//   return (
//     <div className="px-4 py-6">
//       <h1 className="text-xl font-bold mb-4">Products - Page {currentPage}</h1>

//       <ul className="space-y-2">
//         {products.map((product) => (
//           <li key={product.id} className="border p-4 rounded">
//             {product.name}
//           </li>
//         ))}
//       </ul>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={(newPage) => {}}
//         scale={1}
//         routePrefix="/master/product"
//       />
//     </div>
//   );
// }
