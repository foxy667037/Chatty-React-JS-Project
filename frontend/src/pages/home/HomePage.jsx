import Navbar from "../../components/Navbar.jsx";
import { SideBar } from "../../components/SideBar.jsx";
import { MessageCircleMore, UserX } from "lucide-react";

const contacts = [
  {
    id: 1,
    name: "John Doe",
    image: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 4,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 5,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 6,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 7,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 8,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 9,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 10,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 11,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 12,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/40?img=2",
  },
  // You can set this to an empty array to test "no contacts"
];

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex">
        <SideBar />
        <div className="w-full py-6 px-6 rounded-tl-2xl -ml-8 bg-gradient-to-br from-gray-100 to-blue-50 flex">
          <div className="w-96 h-auto pr-4 border-r border-gray-300">
            <p className="text-xl font-semibold p-3">Contacts</p>
            <div className="max-h-[calc(100vh-100px)] overflow-y-auto pr-2">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-3 bg-gray-100 transition-all cursor-pointer hover:bg-gray-300"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={contact.image}
                        alt={contact.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        {contact.name}
                      </span>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full flex items-center text-sm">
                      <MessageCircleMore className="w-4 h-4 mr-1" />
                      Msg
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-10 space-y-2">
                  <UserX className="w-12 h-12 text-gray-400" />
                  <p className="text-lg font-medium">No contacts found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
