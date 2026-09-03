"use client";


import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";

const PropertySearch = () => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString());
  const pathname = usePathname()
console.log("line 15", pathname)  
  const router = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    if(term){
      params.set("searchTerm", term)
    }else{
      params.delete("searchTerm")
    }
    router.replace(`${pathname}?searchTerm=${term}`)
  
  },500);

  return (
    <div className="mx-auto flex w-full max-w-2xl gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="text"
          placeholder="Search properties..."
          // value={}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={(searchParams.get("searchTerm")) as string}
          className="pl-10"
        />
      </div>

      {/* <Button onClick={handleSearch}>
        Search
      </Button> */}
    </div>
  );
};

export default PropertySearch;