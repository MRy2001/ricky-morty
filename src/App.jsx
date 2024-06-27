import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { useEffect, useState } from "react";
import Navbar, {SearchResult} from "./components/Navbar";
import Loader from "./components/Loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Search } from "./components/Navbar";
import { Favourites } from "./components/Navbar";
import { ClockIcon } from "@heroicons/react/24/outline";
import Modal from "./components/Modal";
import useCharacters from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

function App(){

  const [query,setQuery] = useState("");
  const [count,setCount]= useState();

  const {isLoading, characters}= useCharacters(query);
const [selectedId,setSelectedId]=useState(null);
const [favourites,setFavourites]= useLocalStorage("FAVOURITES", []);

// const[favourites,setFavourites]=useState(
//   ()=> JSON.parse(localStorage.getItem("FAVOURITES")) || []
//   );

// useEffect(()=> {
// localStorage.setItem("FAVOURITES",JSON.stringify(favourites))
// },[favourites])

//console.log(JSON.parse(localStorage.getItem("FAVOURITES")));

  //fetch API, timer, access to DOM, ...
  // effect : 1. event handler function, 2. useEffect

// dependency array : role ? => when to run effect function

// 1. useEffect(()=>{}) => on every renders
// 2. useEffect(()=>{},[]) => on mount
// 3. useEffect(()=>{},[state,props]) => dep. array changes => run effect function

// when this useEffect runs. ?!

// state => changes => re-render => browser paint
// state => changes => run effect function

const handleSelectCharacter = (id) =>{
  setSelectedId(prevId=> prevId === id ? null : id)
} 

const handleAddFavourite=((char)=>{
{favList.includes(char.id) ? "" :setFavourites((preFav)=> [...preFav,char])}


})
const favList=favourites.map((fav)=> fav.id)

const handleDeleteFavourite = (id)=>{
  console.log(id);
setFavourites((preFav)=>preFav.filter(fav=> fav.id !== id))
}

  return (
    <div className="app">
      <div style={{color:"#fff"}}>{count}</div>

      <Toaster />
{/*<Modal title="modal test" open={true}>this is children</Modal>*/}    
<Navbar>
             <Search query={query} setQuery={setQuery} />
             <SearchResult numOfResult={characters.length}/>
             <Favourites favourites={favourites} onDeleteFavourite={handleDeleteFavourite}/>
      </Navbar>

   <Main>
 <CharacterList 
 selectedId={selectedId}
 characters={characters} 
 isLoading={isLoading} 
 onSelectCharacter={handleSelectCharacter}
  /> 
    <CharacterDetail selectedId={selectedId} 
    onAddFavourite={handleAddFavourite} favList={favList}/>
   </Main>
    </div>
  )
}
export default App;
function Main({children}){
  return (
    <div className="main">
{children}
          </div>
  )
}

// characters => App => Main => CharacterList 

// CUSTUM HOOKS :
// 1. useFetch, useLocalStroge, useCart , ...
// 2. at least one hooks should be used => useState, useEffect



// useEffect(()=>{
//   const interval=setInterval(()=>setCount((c)=>c+1),1000);
// return ()=>{
//   clearInterval(interval)
// };
//},[count]);