import { faker } from '@faker-js/faker';

//Generacion de productos
export const generateProduct = (index) => {
  const categories = [
    'category_1',
    'category_2',
    'category_3',
    'category_4',
    'category_3',
  ];
  const randomCategory = faker.helpers.arrayElement(categories);

  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: `P-${String(index).padStart(8, '0')}`,
    price: faker.commerce.price(),
    status: true,
    category: randomCategory,
    stock: Number(faker.number.bigInt({ min: 10n, max: 100n })),
    // id: faker.database.mongodbObjectId(),
    thumbnail: Array.from({ length: 3 }, () => faker.image.url()),
  };
};
