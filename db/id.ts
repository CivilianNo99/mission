export type Id = string

// "randomUUID" must be called as a method on "crypto",
// otherwise, an exception is thrown.
export const Id = () => crypto.randomUUID()