import { Characters } from "@/models/interfaces";

export function removeDuplicates(a: Characters[]) {
  const pass = [] as string[];

  return a.filter((item) => {
    if (pass.includes(item.name)) {
      return;
    }
    pass.push(item.name);
    return item;
  });
}
