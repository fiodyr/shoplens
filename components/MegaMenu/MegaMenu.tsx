// components/MegaMenu/MegaMenu.tsx
import Link from 'next/link';
import { generateLocalizedLink } from '@/utils/locale';
import styles from './MegaMenu.module.css';

interface Category {
  id: string | number;
  name: string;
  code: string;
  parentId?: string | number;
}

interface MegaMenuProps {
  categories: Category[];
  currentLocale: string;
  onClose: () => void;
}

// Группировка категорий по уровням вложенности
const groupCategoriesByLevel = (
  categories: Category[]
): Record<number, Category[]> => {
  const levels: Record<number, Category[]> = {};
  const categoryMap = new Map(categories.map(cat => [cat.id, cat]));

  categories.forEach(category => {
    let level = 0;
    let parentId = category.parentId;

    // Итерируемся по parentId, чтобы определить уровень категории
    while (parentId) {
      level++;
      parentId = categoryMap.get(parentId)?.parentId;
    }

    if (!levels[level]) levels[level] = [];
    levels[level].push(category);
  });

  return levels;
};

const MegaMenu: React.FC<MegaMenuProps> = ({ categories, currentLocale, onClose }) => {
  const categoriesByLevel = groupCategoriesByLevel(categories);

  return (
    <div className={styles.megaMenu}>
      <div className={styles.megaMenuContent}>
        {Object.keys(categoriesByLevel).map(level => (
          <div key={level} className={styles.row}>
            {categoriesByLevel[parseInt(level)].map(category => (
              <div key={category.id} className={styles.item}>
                <Link href={`/category/${category.code}`} onClick={onClose}>
                  {category.name}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
