import { describe, it, expect, afterEach, vi } from "vitest";
// Copy and pasted from the page file
function isAValidReview(rating: Number, comment: string): boolean {
    const score = Number(rating);
    // THIS IS ADDED FOR THE AFTER TEST. BEFORE NO R EGEX
    const regex = /[\u3164\u200B\u200C\u200D\u2060]/g
    const text = comment
    .replace(regex, '')
    .trim();
    if (!Number.isInteger(score) || score < 1 || score > 5 || !text || text.length > 1000) {
      return false;
    }
    return true
}

describe("Testing reviews", () => {
    it("Returns false when empty character UTFs are pasted inside", () => {
        const comment = '\u3164'
        expect(isAValidReview(1, comment)).toBe(false)
    })
})
