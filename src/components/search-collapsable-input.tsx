"use client";

import { searchCollapsableInputStore } from "@/store/search-collapsable-input-store";
import { Input } from "./next-ui-exports";

export interface SearchCollapsableInputProps {}

export default function SearchCollapsableInput({}: SearchCollapsableInputProps) {
  const {} = searchCollapsableInputStore();
  return <Input placeholder="Pesquisar" className="w-full" />;
}
