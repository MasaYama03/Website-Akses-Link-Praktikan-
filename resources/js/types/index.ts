export interface PraktikanCategory {
    id: number;
    name: string;
    icon: string | null;
    color: string | null;
    description: string | null;
    sort_order: number;
    links_count?: number;
    links?: PraktikanLink[];
    active_links?: PraktikanLink[];
}

export interface PraktikanLink {
    id: number;
    category_id: number;
    title: string;
    url: string;
    description: string | null;
    icon: string | null;
    is_active: boolean;
    sort_order: number;
    sub_group: string | null;
    category?: PraktikanCategory;
}

export interface HeroImage {
    id: number;
    image_path: string;
    is_active: boolean;
    visibility: 'both' | 'asisten' | 'praktikan';
    sort_order: number;
}

export interface PageProps {
    [key: string]: any;
}

