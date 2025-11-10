export default function Loader(){
return (
  <button
    type="button"
    className="bg-secondary text-white font-semibold px-4 py-2 rounded flex items-center justify-center top-2 left-2"
    disabled
  >
    <svg
      className="animate-spin h-5 w-5 mr-3 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    Loading…
  </button>
);


}