import React from 'react'
import CartItem from './CartItem.jsx'

function Cart({ open, onClose, items, total, count, onIncrease, onDecrease, onRemove, onClear }) {
  return (
    <>
      <div
        className={`cart-scrim ${open ? 'cart-scrim--visible' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside className={`receipt ${open ? 'receipt--open' : ''}`} aria-label="สรุปตะกร้าสินค้า">
        <div className="receipt__top">
          <div>
            <p className="mono receipt__eyebrow">ใบเสร็จรับเงิน</p>
            <h2>ตะกร้าของคุณ</h2>
          </div>
          <button className="receipt__close" onClick={onClose} aria-label="ปิดตะกร้า">✕</button>
        </div>

        <div className="receipt__dashes" aria-hidden="true" />

        {items.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__emoji" aria-hidden="true">☕</p>
            <p>ตะกร้ายังว่างอยู่ เลือกเมนูโปรดของคุณได้เลย</p>
          </div>
        ) : (
          <>
            <ul className="receipt__list">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onRemove={onRemove}
                />
              ))}
            </ul>

            <div className="receipt__dashes" aria-hidden="true" />

            <div className="receipt__summary">
              <div className="receipt__row">
                <span>จำนวนชิ้นทั้งหมด</span>
                <span className="mono">{count}</span>
              </div>
              <div className="receipt__row receipt__row--total">
                <span>ยอดรวมสุทธิ</span>
                <span className="mono">฿{total}</span>
              </div>
            </div>

            <div className="receipt__actions">
              <button className="receipt__checkout">ยืนยันสั่งซื้อ</button>
              <button className="receipt__clear" onClick={onClear}>ล้างตะกร้า</button>
            </div>
          </>
        )}

        <p className="receipt__tear" aria-hidden="true">✂ - - - - - - - - - - - - - - - - - - - - - - - -</p>
      </aside>
    </>
  )
}

export default Cart
