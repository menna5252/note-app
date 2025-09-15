import Image from "next/image";
import Notes from "./components/Notes";
import AddNote from "./components/AddNote";

export default function Home() {
 
  return (
    <div className="flex flex-col items-center">
      <Notes/>
      <AddNote/>

    </div>
  );
}
