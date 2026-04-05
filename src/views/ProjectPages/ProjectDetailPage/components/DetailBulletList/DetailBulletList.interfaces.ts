export interface DetailBulletListItem {
  title: string;
  description?: string;
}

export interface DetailBulletListProps {
  items: (string | DetailBulletListItem)[];
}
