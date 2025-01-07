import { useRecoilState } from "recoil";

export function currentTime() {

  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();

  const currentTime = `${hours}:${minutes}`;

  return currentTime;
}
