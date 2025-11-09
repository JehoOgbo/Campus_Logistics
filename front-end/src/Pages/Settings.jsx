import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"

export default function History(){
    const {user} = useContext(UserContext)
       const [file, setFile] = useState(null);

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return <>
    <div className="flex min-h-screen bg-gray-100 animate-fade-in-up duration-300 flex-col">
         <div className="rounded-full ml-5 bg-primary font-semibold  w-37 h-37 flex items-center justify-center  mt-2 border-r-4 shadow-xl/30">
            <h1 className="p-2 text-5xl ">{ user.split(" ").map(word=>word[0]).join(".").toUpperCase()}</h1>
            

        </div><span className="text-gray-700 font-medium text-lg pt-3">Edit your photo </span>
         <input type="file" onChange={handleChange} />
            {file && <img src={file} alt="Uploaded preview" />}
    </div>
    </>
}