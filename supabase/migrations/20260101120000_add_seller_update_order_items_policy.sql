-- Add policy for sellers to update order items status
CREATE POLICY "Sellers can update their order items status" ON public.order_items
  FOR UPDATE USING (seller_id = public.get_seller_id(auth.uid()))
  WITH CHECK (seller_id = public.get_seller_id(auth.uid()));
