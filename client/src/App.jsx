import "./App.css";
import { Badge } from "@/components/ui/badge";
import back from "./assets/back.png";
import Notes from "@/components/custom/notes";
import GroupCard from "@/components/custom/groupCard";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "./API";
import { Progress } from "./components/ui/progress";
import { colors } from "./assets/colors";
import GroupColorButton from "@/components/custom/groupColorButton";
import { useSelector } from "react-redux";

function App() {

  const [loading,setLoading] = useState(false);
  const { currentGroup } = useSelector((state) => state.group);


  // Logic to handle add new group
  const [showNewGroupCard, setShowNewGroupCard] = React.useState(false);
  const newGroupRef = React.useRef(null);
  const [groupColor,setGroupColor] = useState(null);
  const [groupName,setGroupName] = useState(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (newGroupRef.current && !newGroupRef.current.contains(event.target)) {
        setShowNewGroupCard(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function addGroup() {
    try {
      setLoading(true);
      const response = await AxiosInstance.post('/group',{
        name: groupName,
        color: groupColor
      });
      getAllGroups();
      setShowNewGroupCard(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  // Logic to show all groups from server
  const [groups,setGroups] = useState([]);

  useEffect(()=>{
    getAllGroups();
  },[])

  async function getAllGroups() {
    try {
      setLoading(true);
      const response = await AxiosInstance.get("/group");
      setGroups(response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <>
      <>
        {/* Create a new group card */}
        {showNewGroupCard && (
          <div
            ref={newGroupRef}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            className="bg-white p-4 rounded-lg shadow-md w-[350px] z-20"
          >
            <div className="text-lg font-semibold mb-4">Create New group</div>
            <form>
              <div className="flex flex-row items-center justify-between space-y-3 mb-4">
                <label className="font-medium" htmlFor="group-name">
                  Group Name
                </label>
                <input
                  className="border rounded-md p-2"
                  id="group-name"
                  placeholder="Enter group name"
                  type="text"
                  onChange={(e)=> setGroupName(e.target.value)}
                />
              </div>
              <div className="flex flex-row items-center justify-between space-y-1 mb-4">
                <span className="font-medium">Choose colour</span>
                <div className="flex space-x-2">
                  {
                    colors.map((color,index)=>{
                      return <GroupColorButton key={index} color={color.color} setGroupColor={setGroupColor} />
                    })
                  }
                </div>
              </div>
              {
              loading ? <> <Progress value={95} />  </> : 
              <button
                className="bg-blue-800 text-white px-4 py-2 rounded-md w-full"
                type="submit"
                onClick={addGroup}
              >
                Create
              </button>
              }
            </form>
          </div>
        )}

        {/* Our main container */}
        <div
          style={{
            opacity: showNewGroupCard ? "40%" : "100%",
          }}
          className="flex h-screen"
        >
          <div className="w-64 px-4 py-8 bg-white overflow-y-auto">
            <div className="mb-20 w-56 p-4 fixed bg-white z-10 top-0">
              <h2 className="text-2xl mt-10 font-bold">Pocket Notes</h2>
            </div>
            <nav className="space-y-2 mt-20">
              {/* Render your GroupCard component(s) here */}
              {
                groups?.map((group,index)=> {
                  return <GroupCard key={index} group={group} />
                })
              }
            </nav>
            <button
              style={{
                position: "fixed",
                bottom: "1rem",
                right: "78rem",
              }}
              className="z-10 flex items-center rounded-full bg-blue-800 p-4 text-white"
              onClick={() => setShowNewGroupCard(true)}
            >
              <PlusIcon className="h-6 w-6 font-bold" />
            </button>
          </div>
          {!currentGroup ? (
            <>
              <main className="flex flex-col flex-1 px-8 py-12 bg-blue-100">
                <section className="flex flex-1 items-center justify-center">
                  <div className="text-center">
                    <img
                      alt="Collaboration"
                      className="mx-auto mb-8"
                      height="200"
                      src={back}
                      style={{
                        aspectRatio: "400/200",
                        objectFit: "cover",
                      }}
                      width="400"
                    />
                    <h2 className="text-3xl font-bold mb-4">Pocket Notes</h2>
                    <p className="mb-4">
                      Send and receive messages without keeping your phone
                      online.
                      <br />
                      Use Pocket Notes on up to 4 linked devices and 1 mobile
                      phone
                    </p>
                    <Badge variant="secondary">end-to-end encrypted</Badge>
                  </div>
                </section>
              </main>
            </>
          ) : (
            <Notes />
          )}
        </div>
      </>
      );
    </>
  );
}

export default App;

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
