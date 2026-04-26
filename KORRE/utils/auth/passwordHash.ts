import * as Crypto from 'expo-crypto';

const HASH_PREFIX = 'sha256i';
const HASH_ITERATIONS = 25000;

export const hashPassword = async (password: string) => {
  const salt = Crypto.randomUUID();
  const hash = await deriveHash(password, salt, HASH_ITERATIONS);
  return `${HASH_PREFIX}$${HASH_ITERATIONS}$${salt}$${hash}`;
};

export const verifyPassword = async (
  password: string,
  storedHash?: string | null,
) => {
  if (!storedHash) return false;

  const parts = storedHash.split('$');
  if (parts.length === 4 && parts[0] === HASH_PREFIX) {
    const iterations = Number(parts[1]);
    const salt = parts[2];
    const expectedHash = parts[3];
    const actualHash = await deriveHash(
      password,
      salt,
      iterations,
    );
    return timingSafeEqual(actualHash, expectedHash);
  }

  const legacyHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password,
  );
  return timingSafeEqual(legacyHash, storedHash);
};

const deriveHash = async (
  password: string,
  salt: string,
  iterations: number,
) => {
  let hash = `${salt}:${password}`;

  for (let index = 0; index < iterations; index += 1) {
    hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${salt}:${index}:${hash}`,
    );
  }

  return hash;
};

const timingSafeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;

  let diff = 0;
  for (let index = 0; index < a.length; index += 1) {
    diff |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return diff === 0;
};
