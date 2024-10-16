"use client";

import { useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CreateModal({
  open,
  setOpen,
  onItemCreated,
  onItemUpdated,
  item,
  isEditing,
}) {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    dob: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number is not valid")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      address: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (isEditing && item) {
        await updateItem(values);
      } else {
        await createItem(values);
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (isEditing && item) {
      formik.setValues({
        firstName: item.firstName || "",
        lastName: item.lastName || "",
        dob: item.dob || "",
        gender: item.gender || "",
        address: item.address || "",
        email: item.email || "",
        phoneNumber: item.phoneNumber || "",
      });
    } else {
      formik.resetForm();
    }
  }, [isEditing, item]);

  const createItem = async (values) => {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const newItem = await res.json();
    setOpen(false);

    if (onItemCreated) {
      onItemCreated(newItem);
    }
  };

  const updateItem = async (values) => {
    try {
      const res = await fetch("/api/items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: item.id, ...values }),
      });

      if (res.ok) {
        const updatedItem = await res.json();
        setOpen(false);
        if (onItemUpdated) {
          onItemUpdated(updatedItem);
        }
      } else {
        console.error("Failed to update the item");
      }
    } catch (error) {
      console.error("An error occurred while updating the item:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <form onSubmit={formik.handleSubmit}>
              <div className="bg-white px-4 pb-2 pt-2 sm:p-6 sm:pb-4">
                <div>
                  <h1 className="text-xl text-center font-bold mb-4">
                    {isEditing ? "Edit Student" : "Create New Student"}
                  </h1>

                  <input
                    type="text"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    placeholder="First Name"
                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-red-600 text-xs float-right">
                      {formik.errors.firstName}
                    </div>
                  ) : null}

                  <input
                    type="text"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    placeholder="Last Name"
                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-red-600 text-xs float-right">
                      {formik.errors.lastName}
                    </div>
                  ) : null}

                  <input
                    type="date"
                    name="dob"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    placeholder="Date of Birth"
                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {formik.touched.dob && formik.errors.dob ? (
                    <div className="text-red-600 text-xs float-right">
                      {formik.errors.dob}
                    </div>
                  ) : null}

                  <select
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="text-red-600 text-xs float-right">
                      {formik.errors.gender}
                    </div>
                  ) : null}

                  <input
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    placeholder="Address"
                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-red-600 text-xs float-right">
                      {formik.errors.address}
                    </div>
                  ) : null}

                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Email"
                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600 text-xs float-right">
                      {formik.errors.email}
                    </div>
                  ) : null}

                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    placeholder="Phone Number"
                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className="text-red-600 text-xs float-right">
                      {formik.errors.phoneNumber}
                    </div>
                  ) : null}
                </div>

                <div className="bg-gray-50 px-2 py-3 mt-5 flex gap-5">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    {isEditing ? "Update Student" : "Add Student"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
