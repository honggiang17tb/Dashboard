import { ROUTES } from "./routes";

const MENU = [
	{
        id:1,
		key: 'order',
		title: 'Orders',
        icon:'fa-solid fa-inbox',
		submenus: [],
	},
	{
        id:2,
		key: 'catalog',
		title: 'Catalog',
        icon:'fa-solid fa-tag',
		submenus: [
			{
                parent_id:2,
				key: 'c_products',
				path: ROUTES.product,
				title: 'Products',
			},
            {
                parent_id:2,
				key: 'c_review',
				path: ROUTES.reviews,
				title: 'Reviews',
			},			
            {
                parent_id:2,
				key: 'c_brand',
				path: ROUTES.brand,
				title: 'Brand',
			},
		],
	},
	{
        id:3,
		key: 'user',
		title: 'User',
        icon:'fa-solid fa-user-group',
		submenus: [
			{
                parent_id:3,
				key: 'u_user',
				path: ROUTES.user,
				title: 'User list',
			}

		],
	},
    {
        id:4,
		key: 'sale',
		title: 'Sale Channels',
        icon:'fa-solid fa-globe',
		submenus: [],
	},
];

export default MENU;
