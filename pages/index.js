import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import CreateModal from "@/components/CreateModal";
import Pagination from "@/components/Pagination";
import { IoMdAdd } from "react-icons/io";

export async function getServerSideProps() {
  const apiUrl = process.env.API_URL;
  const res = await fetch(`${apiUrl}/api/items`);
  const items = await res.json();

  return {
    props: { items },
  };
}

export default function Home({ items }) {
  const itemsPerPage = 5;
  const [itemList, setItemList] = useState(items);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const deleteItem = async (id) => {
    await fetch(`/api/items?id=${id}`, {
      method: "DELETE",
    });
    setItemList(itemList.filter((item) => item.id !== id));
  };

  const addItemToList = (newItem) => {
    setItemList((prevList) => [...prevList, newItem]);
  };

  const updateItemInList = (updatedItem) => {
    setItemList(
      itemList.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
    setOpen(true);
  };

  const handleCreate = () => {
    setCurrentItem(null);
    setIsEditing(false);
    setOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(itemList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-800 lg:px-20 lg:py-10 px-4 py-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl text-white font-mono font-bold">
            Student Management
          </h1>

          <div className="w-full flex justify-end mb-4 mt-5">
            <button
              className="text-white bg-green-600 hover:bg-green-800 flex items-center gap-2 font-medium rounded-lg text-sm px-4 py-2"
              onClick={handleCreate}
            >
              <IoMdAdd /> Create New Student
            </button>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="min-w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {[
                    "ID",
                    "First Name",
                    "Last Name",
                    "DOB",
                    "Gender",
                    "Address",
                    "Email",
                    "Phone Number",
                    "Actions",
                  ].map((heading) => (
                    <th key={heading} className="px-6 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b text-white dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white"
                      >
                        {item.id}
                      </th>
                      <td className="px-6 py-4">{item.firstName}</td>
                      <td className="px-6 py-4">{item.lastName}</td>
                      <td className="px-6 py-4">{item.dob}</td>
                      <td className="px-6 py-4">{item.gender}</td>
                      <td className="px-6 py-4">{item.address}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.phoneNumber}</td>
                      <td className="px-6 py-4 flex items-center gap-3 justify-center">
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 flex items-center gap-2 font-medium rounded-lg text-sm px-3 py-1"
                          onClick={() => handleEdit(item)}
                        >
                          <MdEdit /> Edit
                        </button>
                        <button
                          type="button"
                          className="text-white bg-rose-700 hover:bg-rose-800 flex items-center gap-2 font-medium rounded-lg text-sm px-3 py-1"
                          onClick={() => deleteItem(item.id)}
                        >
                          <MdDelete /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-6 py-4 text-center text-white"
                    >
                      No students available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {itemList.length > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      <CreateModal
        open={open}
        setOpen={setOpen}
        onItemCreated={addItemToList}
        onItemUpdated={updateItemInList}
        item={currentItem}
        isEditing={isEditing}
      />
    </>
  );
}
