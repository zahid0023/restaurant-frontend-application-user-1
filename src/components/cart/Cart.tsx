"use client";

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartButton() {
  const { count, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      aria-label={`Open cart (${count} item${count === 1 ? "" : "s"})`}
      className="fixed bottom-6 right-6 z-40 hidden h-14 items-center gap-2 rounded-full border border-border bg-card/90 px-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-200 hover:scale-105 sm:flex"
    >
      <ShoppingBag className="h-5 w-5" />
      <span className="text-sm font-semibold">{count}</span>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[10px] font-bold text-background">
          {count}
        </span>
      )}
    </button>
  );
}

export function CartSummaryBar() {
  const { count, total, openCart } = useCart();
  const empty = count === 0;
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.6)] sm:hidden"
      role="region"
      aria-label="Cart summary"
    >
      <button
        onClick={openCart}
        disabled={empty}
        className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-foreground px-4 py-3 text-left text-background transition-transform duration-200 active:scale-[0.98] disabled:opacity-50"
      >
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background/20">
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-background px-1.5 text-[10px] font-bold text-foreground">
              {count}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[11px] uppercase tracking-widest opacity-70">
            {empty ? "Your cart" : `${count} item${count === 1 ? "" : "s"}`}
          </p>
          <p className="truncate text-lg font-bold tabular-nums">
            {empty ? "Add something delicious" : `$${total.toFixed(2)}`}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-background/20 px-3 py-1.5 text-xs font-semibold">
          {empty ? "Browse" : "View cart"}
        </span>
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { items, total, count, isOpen, closeCart, setQty, removeItem, clear } = useCart();

  return (
    <>
      <div
        aria-hidden
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Your order"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="text-2xl font-semibold">Your order</h2>
            <p className="text-xs text-muted-foreground">
              {count} item{count === 1 ? "" : "s"}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-9 w-9 text-muted-foreground" />
              </div>
              <p className="mt-6 text-xl font-semibold">Your cart is empty</p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Browse the menu and tap the + button on any dish to add it here.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.id} className="flex gap-4 rounded-2xl border border-border bg-muted/20 p-3">
                  <div className="h-20 w-20 flex-none rounded-xl bg-muted flex items-center justify-center">
                    <ShoppingBag className="h-7 w-7 text-muted-foreground/50" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-base font-semibold leading-tight">
                          {it.name}
                        </p>
                        {it.variantName && (
                          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                            {it.variantName}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(it.id)}
                        aria-label={`Remove ${it.name}`}
                        className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-2">
                      <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
                        <button
                          onClick={() => setQty(it.id, it.qty - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold tabular-nums">
                          {it.qty}
                        </span>
                        <button
                          onClick={() => setQty(it.id, it.qty + 1)}
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-lg font-bold tabular-nums">
                        ${(it.price * it.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-2xl font-bold tabular-nums">
                ${total.toFixed(2)}
              </span>
            </div>
            <button className="w-full rounded-2xl bg-foreground py-4 text-sm font-semibold text-background transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
              Proceed to Checkout
            </button>
            <button
              onClick={clear}
              className="w-full rounded-2xl border border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
