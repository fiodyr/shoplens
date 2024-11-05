// components/mockData.ts
type FilterType = 'color' | 'size' | 'price';

export interface FilterSection {
  id: string;
  title: string;
  type: FilterType;
  isExpanded?: boolean;
}

export interface ColorFilter {
  id: string;
  name: string;
  color: string;
}

export interface SizeFilter {
  id: string;
  name: string;
}

export interface PriceConfig {
  min: number;
  max: number;
  step?: number;
}

export interface FilterConfig {
  sections: FilterSection[];
  colors: ColorFilter[];
  sizes: SizeFilter[];
  priceConfig: PriceConfig;
}

export const filterConfig: FilterConfig = {
  sections: [
    {
      id: 'colors',
      title: 'Colors',
      type: 'color',
      isExpanded: false
    },
    {
      id: 'sizes',
      title: 'Sizes',
      type: 'size',
      isExpanded: false
    },
    {
      id: 'price',
      title: 'Price Range',
      type: 'price',
      isExpanded: false
    }
  ],
  colors: [
    { id: 'black', name: 'Black', color: '#000000' },
    { id: 'white', name: 'White', color: '#FFFFFF' },
    { id: 'red', name: 'Red', color: '#FF0000' },
    { id: 'blue', name: 'Blue', color: '#0000FF' },
    { id: 'green', name: 'Green', color: '#00FF00' }
  ],
  sizes: [
    { id: 'xs', name: 'XS' },
    { id: 's', name: 'S' },
    { id: 'm', name: 'M' },
    { id: 'l', name: 'L' },
    { id: 'xl', name: 'XL' },
    { id: 'xxl', name: 'XXL' }
  ],
  priceConfig: {
    min: 0,
    max: 1000,
    step: 1
  }
};


export const footerData = {
  infoblock1:
  {
	url: "#",
	png: "/images/icons/phone-contact.png",
	alt: "phone contact",
	loading: "lazy",
	width: "32",
	height: "32",
	links: [
		{ name: "+1 XXX XXX XXXX", url: "tel:+1 XXX XXX XXXX"},
		{ name: "+1 XXX XXX XXXX", url: "tel:+1 XXX XXX XXXX"},
		{ name: "+1 XXX XXX XXXX", url: "tel:+1 XXX XXX XXXX"},
		{ name: "+1 XXX XXX XXXX", url: "tel:+1 XXX XXX XXXX"},
	],
  },
  infoblock2:
  {
	url: "https://maps.app.goo.gl",
	png: "/images/icons/address-contact.png",
	alt: "email contact",
	loading: "lazy",
	width: "32",
	height: "32",
	links: [
		{ 
		  name: [
			  "str. Street, 01/1, 33550",
			  "Province, City..."
			],
		  url: "https://maps.app.goo.gl"
		},
	],
  },
  infoblockIcons: [
   {
	url: "#",
	png: "/images/icons/facebook.png",
	alt: "facebook",
	loading: "lazy",
	width: "32",
    height: "32", 
   },
   {
	url: "#",
	png: "/images/icons/instagram.png",
	alt: "email contact",
	loading: "lazy",
	width: "32",
    height: "32", 
   },
   {
	url: "#",
	png: "/images/icons/tweeter.png",
	alt: "tweeter",
	loading: "lazy",
	width: "32",
    height: "32", 
   },
   {
	url: "#",
	png: "/images/icons/youtube.png",
	alt: "youtube",
	loading: "lazy",
	width: "32",
    height: "32", 
   },
  ],
  columns: [
	{
	  title: "Information:",
	  links: [
		{ name: "How to buy", url: "#" },
		{ name: "Service center", url: "#" },
		{ name: "Credit", url: "#" },
		{ name: "Delivery", url: "#" },
		{ name: "Gifts", url: "#" },
		{ name: "Privacy policy", url: "#" },
		{ name: "Cookie policy", url: "#" },
		{ name: "Returns and exchanges", url: "#" },
	  ],
	},
	{
	  title: "More:",
	  links: [
		{ name: "Discounts and Sales", url: "#" },
		{ name: "Clearance items", url: "#" },
		{ name: "Promotions and Gifts", url: "#" },
		{ name: "Tips and Reviews", url: "#" },
		{ name: "Manufacturers", url: "#" },
		{ name: "Compare", url: "#" },
		{ name: "Favorites", url: "#" },
		{ name: "Personal Account", url: "#" },
	  ],
	},
  ],
};
