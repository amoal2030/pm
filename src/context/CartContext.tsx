import React, { createContext, useContext, useEffect, useState } from 'react';
import { MenuItem, PriceVariant } from '../data/menuData';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedVariant?: PriceVariant;
  isSpicy?: boolean;
  notes?: string;
  quantity: number;
  unitPrice: number;
}

export type OrderType = 'car_pickup' | 'dine_in' | 'delivery';

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, variant?: PriceVariant, isSpicy?: boolean, notes?: string, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  customerNotes: string;
  setCustomerNotes: (notes: string) => void;
  generateWhatsAppLink: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'meshwar_alforsan_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('car_pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addItem = (
    item: MenuItem,
    variant?: PriceVariant,
    isSpicy?: boolean,
    notes?: string,
    quantity = 1
  ) => {
    const effectivePrice = variant ? variant.price : item.price;
    const cartItemId = `${item.id}-${variant ? variant.name : 'default'}-${isSpicy ? 'spicy' : 'normal'}-${notes || ''}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          cartItemId,
          item,
          selectedVariant: variant,
          isSpicy,
          notes,
          quantity,
          unitPrice: effectivePrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.cartItemId === cartItemId) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const getOrderTypeLabel = (type: OrderType) => {
    switch (type) {
      case 'car_pickup':
        return '🚗 اتصل قبل أن تصل (استلام من السيارة / المحطة)';
      case 'dine_in':
        return '🍽️ استلام وسفري من الفرع (محطة بترو هلا)';
      case 'delivery':
        return '🛵 توصيل إلى موقعي';
    }
  };

  const generateWhatsAppLink = () => {
    const orderLines = items.map((i, index) => {
      const variantText = i.selectedVariant ? ` (${i.selectedVariant.name})` : '';
      const spicyText = i.isSpicy ? ' [حراق 🌶️]' : '';
      const notesText = i.notes ? ` - ملاحظة: ${i.notes}` : '';
      const lineTotal = (i.quantity * i.unitPrice).toFixed(2);
      return `${index + 1}. *${i.item.name}*${variantText}${spicyText} × ${i.quantity} = ${lineTotal} ر.س${notesText}`;
    });

    const message = [
      `*طلب جديد من موقع بروستد مشوار الفرسان* 🍗`,
      `---------------------------------`,
      `*نوع الاستلام:* ${getOrderTypeLabel(orderType)}`,
      customerName ? `*اسم العميل:* ${customerName}` : '',
      customerPhone ? `*رقم الجوال:* ${customerPhone}` : '',
      `---------------------------------`,
      `*الأصناف المطلوبة:*`,
      ...orderLines,
      `---------------------------------`,
      `*الإجمالي النهائي:* *${totalPrice.toFixed(2)} ر.س*`,
      customerNotes ? `*ملاحظات إضافية:* ${customerNotes}` : '',
      `\nشكراً لكم، بانتظار تأكيد الطلب والوقت المتوقع للتجهيز.`
    ]
      .filter(Boolean)
      .join('\n');

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalCount,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        orderType,
        setOrderType,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        customerNotes,
        setCustomerNotes,
        generateWhatsAppLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
