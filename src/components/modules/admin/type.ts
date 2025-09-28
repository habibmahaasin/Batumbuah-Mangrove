export type InfoRowProps = {
  label: string;
  value?: string | number | null;
  isLink?: boolean;
  href?: string;
};

export type Participant = {
  id: number;
  name: string;
  total_trees: number;
  total_approved: number;
  created_at: string;
  images: string;
  status: {
    id: number;
    name: string;
  } | null;
};
