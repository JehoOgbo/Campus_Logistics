import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../Contexts/UserContext";

export default function SearchBar({results, setResults}) {
  const [suggestions, setSuggestions] = useState([]); // This is where we'll store the retrieved suggestions
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const [result, setResult] = useState(null);
  const { token, user } = useContext(UserContext);
  const findResult = (title) => {
    setResult(suggestions.find((suggestion) => suggestion.title === title));
  };

  useEffect(() => {
    async function handleLocations() {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/v1/locations",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuggestions(response.data);
      } catch (err) {
        console.error("Failed to fetch states:", err);
      }
    }
    handleLocations();
  }, []);
    const filteredItems = suggestions.filter(item =>
    item.name.toLowerCase().includes(results.toLowerCase())
  );


  return (
    <>
      {/* From */}
      <div className="flex flex-col">
        {" "}
        <div className="flex flex-row ">
          <label htmlFor="from" className="block w-65">
            From:
          </label>

          <div className="relative ">
            <div className="absolute inset-y-0  flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
           
            <input
              onFocus={() => setHideSuggestions(false)}
              onBlur={async () => {
                setTimeout(() => {
                  setHideSuggestions(true);
                }, 200);
              }}
              type="text"
              id="simple-search"
              className="px-3 py-2.5 bg-gray-300 rounded  rounded-base ps-9 text-heading text-sm focus:ring-brand focus:border-brand block w-auto placeholder:text-body"
              placeholder="Search Campus name..."
              required
              onChange={e=> setResults(e.target.value)}
              value={results || ""}
            />
               {!hideSuggestions && (
          <div className="absolute top-11 z-10 border-0.5 border-primary shadow-xl rounded-md   w-full bg-gray-300 text-sm  font-light text-gray-700">
             <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => <li key={index}  className="px-2 flex py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setResults(item.name);
                    findResult(item.title);
                    setHideSuggestions(true);
                  }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 ">
  <path fillRule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
</svg><span className='px-1'>
 {item.name}</span>
</li>)
        ) : (
          <li>No matches found</li>
        )}
      </ul>

          </div>
          
        )}
          </div>
        
        </div>
        </div>
       
      
    </>
  );
}
