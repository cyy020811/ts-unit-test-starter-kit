import { describe, it, expect, beforeEach } from "vitest"
import {
	addProduct,
	addToCart,
	applyShippingDiscount,
	calculateTotal,
	clearCart,
	removeFromCart,
	updateCart,
} from "../src/ecommerce"

let cart = {}
describe("E-commerce System", () => {
	beforeEach(() => {
		addProduct("Soap", 100, 10)
		addProduct("Shampoo", 200, 5)
		clearCart()
	})

	it("should calculate price of all products", () => {
		addToCart("Soap", 2)
		addToCart("Shampoo", 2)
		const sum = calculateTotal()
		expect(sum).toBe(600)
	})

	it("should add items to cart", () => {
		let cart = {}

		cart = addToCart("Soap", 2)
		expect(cart["Soap"]).toBe(2)
	})

	it("should apply shipping discount", () => {
		addToCart("Soap", 2)
		addToCart("Shampoo", 2)
		const sum = calculateTotal()
		const discountedTotal = applyShippingDiscount(sum)
		expect(discountedTotal).toBe(590)
	})

	it("should not apply shipping discount", () => {
		addToCart("Soap", 2)
		const sum = calculateTotal()
		const discountedTotal = applyShippingDiscount(sum)
		expect(discountedTotal).toBe(200)
	})

	it("should remove the item from the cart", () => {
		let cart = {}
		addToCart("Soap", 1)
		cart = updateCart("Soap", -3)
		expect(cart["Soap"]).toBeUndefined()
	})

	it("should show insufficient stock error message", () => {
		expect(() => addToCart("Soap", 100)).toThrowError("Insufficient stock")
	})

	it("should remove an item from the cart", () => {
		let cart = {}
		addToCart("Soap", 2)
		cart = removeFromCart("Soap", 1)
		expect(cart["Soap"]).toBe(1)
	})

	it("should show cannot remove item from cart error message", () => {
		let cart = {}
		addToCart("Soap", 2)
		expect(() => removeFromCart("Soap", 3)).toThrowError(
			"Cannot remove item from cart"
		)
	})
})
