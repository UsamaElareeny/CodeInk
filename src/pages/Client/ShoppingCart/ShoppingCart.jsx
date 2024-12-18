import CartItems from "./CartItems.jsx";
import OrderSummary from "./OrderSummary";
export default function ShoppingCart() {
  return (
    <section className="py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold sm:text-2xl">Shopping Cart</h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <CartItems />
          <OrderSummary />
        </div>
      </div>
    </section>
  );
}
