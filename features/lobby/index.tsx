import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Layout from "@/components/layout";
import Input from "@/components/ui/input";
import { Navigation, SearchRoom } from "@/features/lobby/components";
import { ListRoom } from "@/features/lobby/sections/ListRoom";
import { useStoreRoom } from "@/services/room.service";
import Seo from "@/components/seo";

const Lobby: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddRoom, setIsAddRoom] = useState(false);

  const { mutate: storeNewRoom } = useStoreRoom();

  return (
    <Layout withTopBar topBarElement={<Navigation />}>
      <div className="flex-1 w-full px-[27px]">
        <Seo
          title="Lobby"
          description="This Page Showing all available room in this app"
        />

        <SearchRoom
          setIsAddRoom={setIsAddRoom}
          setSearchQuery={setSearchQuery}
        />
        <ListRoom searchQuery={searchQuery} />

        {isAddRoom && (
          <div className="fixed inset-0 z-10 flex justify-center bg-black bg-opacity-40  w-full min-h-screen  transition-all duration-300">
            <div className="bg-white rounded-t-2xl z-20 h-fit fixed bottom-0 max-w-lg w-full mx-[27px] p-6 transition-all duration-300">
              <div className="flex justify-between items-center">
                <h1 className="text-brand-xl font-bold">Create New Room</h1>
                <div
                  className="cursor-pointer hover:bg-brand-gray-400 rounded-full p-2"
                  onClick={() => setIsAddRoom(false)}
                >
                  <Image
                    src="/assets/icons/close.svg"
                    alt="close icon"
                    width={28}
                    height={28}
                  />
                </div>
              </div>
              <div className="mt-5">
                <Formik
                  initialValues={{
                    room_name: "",
                  }}
                  validationSchema={Yup.object({
                    room_name: Yup.string()
                      .min(5)
                      .required("Room name is required"),
                  })}
                  onSubmit={({ room_name }, { resetForm }) => {
                    storeNewRoom(room_name);
                    resetForm();
                    setIsAddRoom(false);
                  }}
                >
                  {({ errors }) => (
                    <Form>
                      <Input
                        label="Room Name"
                        type="text"
                        placeholder="Enter Room Name"
                        error={errors.room_name}
                      />
                      <button
                        type="button"
                        className="bg-brand-blue-500 w-full rounded-[10px] font-semibold text-brand-xl text-white py-3"
                      >
                        Create
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Lobby;
