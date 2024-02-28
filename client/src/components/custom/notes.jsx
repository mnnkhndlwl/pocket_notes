import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { AxiosInstance } from "@/API";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

const Notes = () => {
  const { currentGroup } = useSelector((state) => state.group);
  const nameArr = currentGroup?.name?.split(" ");
  const initials =
    nameArr?.length >= 2
      ? nameArr[0].charAt(0) + nameArr[1].charAt(0)
      : nameArr[0].charAt(0);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  // logic to fetch group notes
  async function fetchNotes() {
    try {
      setLoading(true);
      const response = await AxiosInstance.get(`/note/${currentGroup?._id}`);
      setNotes(response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [currentGroup]);

  // logic to add new note
  const [newNote, setNewNote] = useState("");
  async function addNew() {
    try {
      setLoading(true);
      await AxiosInstance.post("/note", {
        content: newNote,
        groupId: currentGroup?._id,
      });
      window.location.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading......</div>;
  }

  return (
    <>
      {/* content of particular group */}
      <main className="flex-1 overflow-hidden bg-blue-100 flex flex-col">
        {/* Fixed header */}
        <div className="p-4 bg-blue-800 flex items-center">
          <Avatar>
            <AvatarImage alt="MP" src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback
              style={{
                color: "white",
                background: currentGroup?.color,
              }}
            >
              {" "}
              {initials}{" "}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold ml-2 bg-blue-800 text-white">
            {currentGroup?.name}
          </h1>
        </div>
        {/* chat area */}
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Progress value={90} />
          </div>
        ) : (
          <>
            <div className="overflow-auto flex-1 max-h-screen">
              {notes?.length > 0 ? (
                <div className="max-w-4xl p-2 mx-auto">
                  {notes?.map((note, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-white my-2 p-4 rounded-md shadow w-full"
                      >
                        <p className="mt-2 text-gray-700">{note?.content}</p>
                        <div className="flex justify-end">
                          <span className="text-sm text-black">
                            {note?.createdAt}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        )}

        {/* input area */}
        <div
          style={{
            width: "",
          }}
          className="relative bottom-0 overflow-hidden z-10 h-52 bg-blue-800 justify-center items-center"
        >
          <div>
            <input
              className="h-40 mt-5 mb-5 ml-10 mr-10 w-11/12 text-start p-2 rounded-md"
              placeholder="Here's the sample text for sample work"
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button
              className={`cursor-pointer absolute bottom-5 right-12 mr-5 mb-3 p-2 rounded-full bg-green-500 text-white ${
                newNote === "" ? "disabled:opacity-50" : ""
              }`}
              disabled={newNote === ""}
              onClick={addNew}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 transform rotate-90" // Add class to rotate the icon
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Notes;
