import { canEditPost, hasPermission } from "./canBlockPosts";

describe('can', () => {
    it('hasPermission return true for user with this permission', () => {
	    expect(hasPermission({permissions: ['BLOCK_POST'], id: 'x'}, 'BLOCK_POST')).toBe(true)
	})
	it('hasPermission return false for user with this permission', () => {
		expect(hasPermission({permissions: [], id: 'x'}, 'BLOCK_POST')).toBe(false)
	})
	it('hasPermission return true for user with ALL permission', () => {
		expect(hasPermission({permissions: ['ALL'], id: 'BLOCK_POST'}, 'BLOCK_POST')).toBe(true)
	})
	it('obly author can edit his idea', () => {
		expect(canEditPost({permissions: [], id: 'x'}, {authorId: 'x'})).toBe(true)
		expect(canEditPost({permissions: [], id: 'hacker'}, {authorId: 'x'})).toBe(false)
	})
})