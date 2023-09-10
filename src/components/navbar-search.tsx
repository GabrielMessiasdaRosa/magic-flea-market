import useDebounce from "@/hooks/use-debounce";
import { getUsers } from "@/services/user/get-users";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Avatar, Button } from "./next-ui-exports";
export interface NavbarSearchProps {}

const mockDataUserNames = [
  {
    name: "Rafael",
    nickname: "Rafael#1234",
    imageUrl: "https://avatars.githubusercontent.com/u/19603004?v=4",
    email: "rafa@email.com",
  },
];

export default function NavbarSearch({}: NavbarSearchProps) {
  const {} = useForm();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const [filterValue, setFilterValue] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState<any[]>([]);
  const [fetchingUsers, setFetchingUsers] = React.useState(false);
  const [fetchingCards, setFetchingCards] = React.useState(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
  };
  console.log("Is open", isOpen);
  useDebounce({
    value: filterValue,
    delay: 1000,
    onDebounce: async (value) => {
      if (value.length > 0) {
        setFetchingUsers(true);

        const users: any = await getUsers({
          page: 1,
          limit: 10,
          async onSuccess(data) {
            console.log("Data", data);
          },
        });
        console.log(users);
        setFetchingUsers(false);
        toast.success("Usuários carregados com sucesso");
        /* setFilteredUsers(users); */
        return;
      }
    },
  });
  React.useEffect(() => {}, [filterValue]);
  console.log(isOpen);
  return (
    <div className="relative w-full px-0 lg:mx-20">
      <div className="relative flex">
        <motion.input
          ref={inputRef}
          onFocus={(e) => {
            setIsInputFocused(true);
            setIsOpen(true);
          }}
          onChange={handleSearch}
          onBlur={() => {
            if (filterValue.length > 0) {
              return;
            }
            setIsOpen(false);
            setIsInputFocused(false);
          }}
          className={`
            peer
            h-10
            w-full
            rounded-full 
            
            border-2
            border-primary-700
            px-4
            transition-all
            duration-500
            ease-in-out
            focus:border-primary-600
            focus:outline-none
            focus:ring-2

            focus:ring-primary-500/50
            dark:border-default-500
            dark:focus:border-default-600
            
            dark:focus:ring-default-500/50
            

      `}
          placeholder="Pesquise por carta ou usuário"
        />
        <Button
          color="primary"
          className={`
            absolute
            right-0
            h-10
            rounded-full
            border-primary-700
            bg-primary-700
            px-4
            transition-all
            duration-500
            ease-in-out
            focus:border-primary-600
            focus:outline-none
            focus:ring-2
            focus:ring-primary-500/50
            ${
              isInputFocused
                ? "peer-focus:border-primary-700 peer-focus:ring-0"
                : ""
            }
            `}
        >
          Pesquisar
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              overflowY: "hidden",
            }}
            animate={{
              opacity: 1,
              height: "auto",
              overflowY: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
              overflowY: "hidden",
            }}
            className={`
            scrollbar-thin scrollbar-thumb-primary-700 scrollbar-track-primary-950 scrollbar-thumb-rounded-full
            scrollbar-track-rounded-full
            scrollbar-thumb-shadow-lg
            scrollbar-track-shadow-lg
            dark:bg-default-950
            dark:scrollbar-thumb-default-700
            dark:scrollbar-track-default-950
            dark:scrollbar-thumb-shadow-lg
            dark:scrollbar-track-shadow-lg 
            absolute
            left-0
            top-11
            z-10
            flex
            h-0
            max-h-[calc(100vh-4rem)]
            w-full
            items-center
            justify-start
            rounded-3xl
            border-2

            border-primary-700
            bg-white
            px-4
            shadow-lg
            scrollbar-hide


        `}
          >
            <div className="flex flex-1 flex-col items-center justify-center pb-8 lg:pb-0 lg:pt-4">
              {filterValue.length > 0 ? (
                <>
                  <div className="w-full pb-4">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => {
                        return (
                          <>
                            <p className="text-sm text-gray-500">
                              Resultados de usuários:
                            </p>
                            <div
                              key={user.name}
                              className="debug flex items-center justify-between"
                            >
                              <div className="flex items-center justify-center gap-2">
                                <Avatar
                                  alt={user.name}
                                  className="flex-shrink-0"
                                  size="sm"
                                  src={user.imageUrl}
                                />
                                <div className="flex flex-col">
                                  <span className="text-gray-700">
                                    {user.name}
                                  </span>
                                  <span className="text-tiny text-gray-500">
                                    ({user.email})
                                  </span>
                                </div>
                              </div>
                              <div className="flex">
                                <Button className="max-w-8">
                                  <ChatBubbleOvalLeftEllipsisIcon className="h-12 w-12 text-primary-800" />
                                </Button>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-500">
                          Resultados de usuários:
                        </p>
                        <p className="text-xs text-gray-500">
                          Nenhum usuário encontrado.
                        </p>
                      </div>
                    )}
                  </div>{" "}
                  <div className="w-full pb-4">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => {
                        return (
                          <>
                            <p className="text-sm text-gray-500">
                              Resultados de usuários:
                            </p>
                            <div
                              key={user.name}
                              className="debug flex items-center justify-between"
                            >
                              <div className="flex items-center justify-center gap-2">
                                <Avatar
                                  alt={user.name}
                                  className="flex-shrink-0"
                                  size="sm"
                                  src={user.imageUrl}
                                />
                                <div className="flex flex-col">
                                  <span className="text-gray-700">
                                    {user.name}
                                  </span>
                                  <span className="text-tiny text-gray-500">
                                    ({user.email})
                                  </span>
                                </div>
                              </div>
                              <div className="flex">
                                <Button className="max-w-8">
                                  <ChatBubbleOvalLeftEllipsisIcon className="h-12 w-12 text-primary-800" />
                                </Button>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-500">
                          Resultados de usuários:
                        </p>
                        <p className="text-xs text-gray-500">
                          Nenhum usuário encontrado.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-center lg:flex-row">
                  <div className="">
                    <span className="font-fantasy text-[7rem] text-primary-950">
                      w
                    </span>
                  </div>
                  <div className="-mt-10 text-sm lg:-mt-5">
                    <p className="">Pesquise por cartas ou usuários.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
