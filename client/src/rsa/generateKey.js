import { p, q } from "./key"

export const getPublicKey = () => {
  const n = p * q;
  const phi = (p-1) * (q-1);

  // choose 1 < e < phi such that e is coprime to phi
  // as of now choose 13
  const e = 13;

  return [e,n];
}

export const getPrivateKey = () => {
  const n = p * q;
  const phi = (p-1) * (q-1);

  // choose 1 < e < phi such that e is coprime to phi
  // as of now choose 13
  const e = 13;

  // find d = e^-1 mod phi
  // as of now hardcode as 26
  const d = 937;

  return [d,n];
}