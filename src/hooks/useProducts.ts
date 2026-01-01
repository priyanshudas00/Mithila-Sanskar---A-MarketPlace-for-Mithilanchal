import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  story: string | null;
  price: number;
  compare_at_price: number | null;
  stock_quantity: number;
  is_handmade: boolean;
  materials: string[] | null;
  dimensions: string | null;
  craft_time: string | null;
  is_gi_tagged: boolean;
  is_featured: boolean;
  views_count: number;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  seller: {
    id: string;
    business_name: string;
    village: string | null;
    rating: number;
    years_experience: number;
    avatar_url: string | null;
  };
  images: {
    id: string;
    image_url: string;
    alt_text: string | null;
    is_primary: boolean;
  }[];
}

export const useProducts = (filters?: {
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          id,
          name,
          slug,
          description,
          story,
          price,
          compare_at_price,
          stock_quantity,
          is_handmade,
          materials,
          dimensions,
          craft_time,
          is_gi_tagged,
          is_featured,
          views_count,
          categories (
            id,
            name,
            slug
          ),
          sellers (
            id,
            business_name,
            village,
            rating,
            years_experience,
            avatar_url
          ),
          product_images (
            id,
            image_url,
            alt_text,
            is_primary
          )
        `)
        .eq('is_approved', true)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (filters?.categoryId) {
        query = query.eq('category_id', filters.categoryId);
      }
      
      if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }
      
      if (filters?.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }
      
      if (filters?.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }
      
      if (filters?.featured) {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      return (data || []).map(product => ({
        ...product,
        category: product.categories,
        seller: product.sellers,
        images: product.product_images || [],
      })) as Product[];
    },
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          slug,
          description,
          story,
          price,
          compare_at_price,
          stock_quantity,
          is_handmade,
          materials,
          dimensions,
          craft_time,
          is_gi_tagged,
          is_featured,
          views_count,
          categories (
            id,
            name,
            slug
          ),
          sellers (
            id,
            business_name,
            village,
            rating,
            years_experience,
            avatar_url,
            story,
            user_id
          ),
          product_images (
            id,
            image_url,
            alt_text,
            is_primary,
            display_order
          )
        `)
        .eq('id', productId)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) return null;
      
      return {
        ...data,
        category: data.categories,
        seller: data.sellers,
        images: (data.product_images || []).sort((a: any, b: any) => a.display_order - b.display_order),
      } as Product & { seller: any };
    },
    enabled: !!productId,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (error) throw error;
      return data || [];
    },
  });
};
