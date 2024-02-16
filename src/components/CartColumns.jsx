import React from 'react';

function CartColumns() {
  return (
    <div className="hidden md:block">
      <div className="grid grid-cols-[350px_1fr_1fr_1fr_auto] justify-items-center gap-4 font-oswald">
        <h5 className="text-primaryOne font-semibold uppercase">item</h5>
        <h5 className="text-primaryOne font-semibold uppercase">price</h5>
        <h5 className="text-primaryOne font-semibold uppercase">quantity</h5>
        <h5 className="text-primaryOne font-semibold uppercase">subtotal</h5>
        <span className="w-8 h-8" />
      </div>
    </div>
  );
}

export default CartColumns;
