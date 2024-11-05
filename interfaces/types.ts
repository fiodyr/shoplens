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

interface Category {
  id: string;
  name: string;
  code: string;
  childrenCount: number;
  parentId: string | null;
  parentName: string | null;
}

interface SlideData {
  href: string;
  src: string;
  alt: string;
  name: string;
}

interface MainSliderProps {
  slides: SlideData[];
}