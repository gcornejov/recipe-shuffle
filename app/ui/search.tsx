'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(input_value: string, trigger_key: string) {
    if (trigger_key === "Enter") {
      const params = new URLSearchParams(searchParams)

      if (input_value) {
        params.set("ingredients", input_value);
      } else {
        params.delete("ingredients");
      }

      replace(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <>
      <label htmlFor="search">Enter ingredient: </label>
      <input
        onKeyUp={(e) => {
          handleSearch(e.currentTarget.value, e.key)
        }}
        defaultValue={searchParams.get('ingredients')?.toString()}
      />
    </>
  )
}
