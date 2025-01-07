import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, FormEvent } from "react";
import { searchAtom } from "@/Atoms";
import { useRecoilState } from "recoil";

const SearchBar = () => {
  const [searchBar, setSearchBar] = useState("");  
  const [searchTerm, setSearchTerm] = useRecoilState(searchAtom);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(searchBar)
    console.log("Searching for:", searchTerm);
    // Here you can add API call or search logic
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mb-4">
      <Input
        type="text"
        value={searchBar}
        onChange={(e) => setSearchBar(e.target.value)}
        placeholder="Search location..."
        className="pl-10 bg-background text-foreground"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    </form>
  );
};

export default SearchBar;