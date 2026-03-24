import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { useCart } from "../store/cartStore";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    toast.success(
      "Order placed successfully! Thank you for shopping at Foot Rush.",
    );
    clearCart();
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={closeCart}
            data-ocid="cart.modal"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-card border-l border-white/8 z-50 flex flex-col shadow-2xl"
            data-ocid="cart.sheet"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-electric" />
                <h2 className="font-display font-bold text-lg text-white">
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="text-[10px] bg-electric text-black font-bold rounded-full px-2 py-0.5">
                    {items.length}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeCart}
                className="text-white/50 hover:text-white hover:bg-white/8"
                data-ocid="cart.close_button"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-full gap-5 text-center"
                  data-ocid="cart.empty_state"
                >
                  <ShoppingBag className="w-16 h-16 text-white/10" />
                  <div>
                    <p className="font-semibold text-white">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-white/35 mt-1">
                      Add some shoes to get started!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="bg-electric hover:bg-electric/90 text-black font-bold px-6 py-2.5 rounded-full text-sm"
                    data-ocid="cart.continue_button"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item, idx) => (
                    <li
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-3"
                      data-ocid={`cart.item.${idx + 1}`}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-secondary shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-white truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-white/35">
                          Size: {item.size}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.size,
                                item.quantity - 1,
                              )
                            }
                            className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center hover:border-electric text-white/60 hover:text-electric transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-5 text-center text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.size,
                                item.quantity + 1,
                              )
                            }
                            className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center hover:border-electric text-white/60 hover:text-electric transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between shrink-0">
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId, item.size)}
                          className="text-white/30 hover:text-sale transition-colors"
                          aria-label="Remove"
                          data-ocid={`cart.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-sm text-white">
                          ₹
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-5 border-t border-white/8 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Subtotal</span>
                  <span className="font-semibold text-white">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                {totalPrice < 6250 && (
                  <p className="text-xs text-electric bg-electric/10 border border-electric/20 rounded-lg px-3 py-2.5 flex items-center gap-2">
                    <Zap className="w-3 h-3 shrink-0" strokeWidth={3} />
                    Add ₹{(6250 - totalPrice).toLocaleString("en-IN")} more for
                    free shipping!
                  </p>
                )}
                <Separator className="bg-white/8" />
                <div className="flex justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-white">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full bg-electric hover:bg-electric/90 text-black font-bold py-3 rounded-full transition-all hover:shadow-electric"
                  onClick={handleCheckout}
                  data-ocid="cart.confirm_button"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  className="w-full border border-white/15 text-white/50 hover:text-white hover:border-white/30 font-medium py-2.5 rounded-full text-sm transition-colors"
                  onClick={closeCart}
                  data-ocid="cart.cancel_button"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
