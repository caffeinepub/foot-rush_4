import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  size: number;
  quantity: number;
}

interface CartStore {
  cartId: string;
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, size: number) => void;
  updateQuantity: (productId: number, size: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartStore | null>(null);

function generateCartId(): string {
  return `cart_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId] = useState<string>(() => {
    const stored = localStorage.getItem("foot_rush_cart_id");
    if (stored) return stored;
    const newId = generateCartId();
    localStorage.setItem("foot_rush_cart_id", newId);
    return newId;
  });

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("foot_rush_cart_items");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("foot_rush_cart_items", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === newItem.productId && i.size === newItem.size,
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === newItem.productId && i.size === newItem.size
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i,
        );
      }
      return [...prev, newItem];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: number, size: number) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size)),
    );
  };

  const updateQuantity = (
    productId: number,
    size: number,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size ? { ...i, quantity } : i,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartId,
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
