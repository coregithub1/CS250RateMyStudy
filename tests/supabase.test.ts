import { describe, it, expect, afterEach, vi } from "vitest";
afterEach(() => {
  vi.unstubAllEnvs();
})
// New Vitest tests from Nov 18th
describe("Mock a broken supabase", () => {
  it("Fails when the enviornment variables are gone", async () => {
    const { getSupabase } = await import("../lib/supabase");
    expect (() => getSupabase()).toThrow();
  })
})